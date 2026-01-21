// inngest/functions.js
import {
  CHAPTER_NOTES_TABLE,
  STUDY_MATERIAL_TABLE,
  STUDY_TYPE_CONTENT_TABLE,
  USER_TABLE,
} from "@/configs/schema"; // <-- Import USER_TABLE
import { inngest } from "./client";
import {
  generateNotesAiModel,
  generateStudyTypeContentAiModel,
} from "@/configs/aiModel";
import { db } from "@/configs/db";
import { eq } from "drizzle-orm";

// NOTE: Add your actual import/definition for these items
// const db = {
//     select: () => ({ from: () => ({ where: () => ({ length: 0 }) }) }),
//     insert: () => ({ values: () => { } }),
// };
// const USER_TABLE = {};
// const eq = () => true;
const userResp = "user created";
// END NOTE

// 1. HelloWorld Function
export const HelloWorld = inngest.createFunction(
  { id: "hello-world-handler" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    console.log("🎉 helloWorld handler triggered:", event.id, event.data);
    return { message: "Hello, World" };
  }
);

// 2. createNewUser Function
export const createNewUser = inngest.createFunction(
  { id: "create-new-user" },
  { event: "user.create" },
  async ({ event, step }) => {
    const { user } = event.data;

    await step.run("Check user and create new if not in DB", async () => {
      const result = await db
        .select()
        .from(USER_TABLE)
        .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress));

      console.log(result);

      if (result.length === 0) {
        await db.insert(USER_TABLE).values({
          email: user?.primaryEmailAddress?.emailAddress,
          name: user?.fullName,
        });
        console.log("User created successfully");
      }
      return userResp;
    });
    return "success";
  }
);

//3. Generate notes function
export const GenerateNotes = inngest.createFunction(
  { id: "generate-course" },
  { event: "notes.generate" },
  async ({ event, step }) => {
    const { course } = event.data;

    //Generate notes for each chapter using AI
    const notesResult = await step.run("Generate chapter notes", async () => {
      // course.courseLayout may be a JSON string (stored in DB) or an object
      let chapters = course?.courseLayout;
      try {
        if (typeof chapters === "string") {
          chapters = JSON.parse(chapters);
        }
      } catch (err) {
        console.error("Failed to parse courseLayout:", err);
        chapters = null;
      }

      // If courseLayout is an object containing a `chapters` array, use it
      if (
        chapters &&
        !Array.isArray(chapters) &&
        typeof chapters === "object" &&
        Array.isArray(chapters.chapters)
      ) {
        chapters = chapters.chapters;
      }

      if (!chapters || !Array.isArray(chapters)) {
        console.warn(
          "No chapters found, nothing to generate. Resolved chapters:",
          chapters
        );
        return "No chapters";
      }

      let index = 0;
      for (const chapter of chapters) {
        try {
          const PROMPT =
            "Generate exam material detail content for each chapter, Make sure to includes all topic point in the content, make sure to giver content in HTML format (Do not Add HTMLK, Head, Body, title tag), The chapter: " +
            JSON.stringify(chapter);

          const result = await generateNotesAiModel.sendMessage(PROMPT);
          // Support both response.text() shapes
          const aiResp =
            (await (result.response?.text?.() || result.text?.())) || "";

          // Save aiResp to database
          const insertResult = await db.insert(CHAPTER_NOTES_TABLE).values({
            chapterId: String(index),
            courseId: course?.courseId,
            notes: aiResp,
          });
          console.log(
            "Saved notes for chapter",
            index,
            "insertResult:",
            insertResult
          );
        } catch (err) {
          console.error(
            "Error generating/saving notes for chapter",
            index,
            err
          );
        }
        index += 1;
      }

      return "Completed";
    });

    const updateCourseStatusResult = await step.run(
      "Update course status to read",
      async () => {
        try {
          const result = await db
            .update(STUDY_MATERIAL_TABLE)
            .set({
              status: "Ready",
            })
            .where(eq(STUDY_MATERIAL_TABLE.courseId, course?.courseId));
          return result;
        } catch (err) {
          console.error("Failed to update course status:", err);
          throw err;
        }
      }
    );
  }
);

//4. Generate studytype content like Flashcard , quiz and Q-A

// export const GenerateStudyTypeContent = inngest.createFunction(
//     { id: "Generate Study Type Content" },
//     { event: "studyType.content" },
//     async ({ event, step }) => {
//         const { studyType, prompt, courseId, recordId } = event.data;

//         const FlashCardAiResult = await step.run(
//             "Generating flashcard",
//             async () => {
//                 const result = await generateStudyTypeContentAiModel.sendMessage(prompt);
//                 const text = (await (result.response?.text?.() || result.text?.())) || "";
//                 try {
//                     return JSON.parse(text);
//                 } catch (err) {
//                     console.warn("Failed to parse AI response as JSON, returning raw text", err);
//                     return text;
//                 }
//             }
//         );

//         await step.run("Save data to Db", async () => {
//             return await db
//                 .update(STUDY_TYPE_CONTENT_TABLE)
//                 .set({
//                     content: typeof FlashCardAiResult === 'string' ? FlashCardAiResult : JSON.stringify(FlashCardAiResult),
//                 })
//                 .where(eq(STUDY_TYPE_CONTENT_TABLE.id, recordId));
//         });
//     }
// );

export const GenerateStudyTypeContent = inngest.createFunction(
  { id: "Generate Study Type Content" },
  { event: "studyType.content" },
  async ({ event, step }) => {
    logToFile("🚀 Inngest Function: Generate Study Type Content Started");
    const { studyType, prompt, recordId } = event.data;
    logToFile("Event Data:", event.data);

    const FlashCardAiResult = await step.run("Generating content", async () => {
      try {
        logToFile(
          "🤖 Sending prompt to AI Model (gemini-1.5-flash-001) [Stateless]..."
        );

        // Direct instantiation to avoid caching/state issues & side-effects
        const { GoogleGenerativeAI } = require("@google/generative-ai");
        const genAI = new GoogleGenerativeAI(
          process.env.NEXT_PUBLIC_GEMINI_API_KEY
        );
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash-001",
          generationConfig: {
            responseMimeType: "application/json",
          },
        });

        const result = await model.generateContent(prompt);
        let text = (await (result.response?.text?.() || result.text?.())) || "";
        logToFile("🤖 Raw AI Response:", text.substring(0, 100) + "...");

        text = text
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

        const parsed = JSON.parse(text);
        logToFile("✅ JSON Parsed Successfully");
        return parsed;
      } catch (err) {
        logToFile(
          "❌ Failed to generate or parse AI response:",
          err.toString()
        );
        return null;
      }
    });

    if (!FlashCardAiResult) {
      logToFile("⚠️ FlashCardAiResult is null, skipping DB update.");
      return;
    }

    await step.run("Save data to Db", async () => {
      logToFile("💾 Updating DB for recordId:", recordId);
      try {
        const updateResult = await db
          .update(STUDY_TYPE_CONTENT_TABLE)
          .set({
            content:
              typeof FlashCardAiResult === "string"
                ? FlashCardAiResult
                : JSON.stringify(FlashCardAiResult),
            // type: studyType // Removed to avoid potential schema check issues if column optional/missing in this specific snippet context but safe to add if needed. Content is the main fix.
          })
          .where(eq(STUDY_TYPE_CONTENT_TABLE.id, recordId))
          .returning();

        logToFile("✅ DB Update Result:", updateResult);
        return "Success";
      } catch (dbErr) {
        logToFile("❌ DB Update Failed:", dbErr.toString());
        throw dbErr;
      }
    });
  }
);

// 3. EXPORT the array of all functions
export const allFunctions = [
  HelloWorld,
  createNewUser,
  GenerateNotes,
  GenerateStudyTypeContent,
]; // <-- Keep this export!
