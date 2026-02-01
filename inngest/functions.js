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
// export const GenerateNotes = inngest.createFunction(
//   { id: "generate-course" },
//   { event: "notes.generate" },
//   async ({ event, step }) => {
//     const { course } = event.data;

//     //Generate notes for each chapter using AI
//     const notesResult = await step.run("Generate chapter notes", async () => {
//       // course.courseLayout may be a JSON string (stored in DB) or an object
//       let chapters = course?.courseLayout;
//       try {
//         if (typeof chapters === "string") {
//           chapters = JSON.parse(chapters);
//         }
//       } catch (err) {
//         console.error("Failed to parse courseLayout:", err);
//         chapters = null;
//       }

//       // If courseLayout is an object containing a `chapters` array, use it
//       if (
//         chapters &&
//         !Array.isArray(chapters) &&
//         typeof chapters === "object" &&
//         Array.isArray(chapters.chapters)
//       ) {
//         chapters = chapters.chapters;
//       }

//       if (!chapters || !Array.isArray(chapters)) {
//         console.warn(
//           "No chapters found, nothing to generate. Resolved chapters:",
//           chapters
//         );
//         return "No chapters";
//       }

//       let index = 0;
//       for (const chapter of chapters) {
//         try {
//           const PROMPT =
//             "Generate exam material detail content for each chapter, Make sure to includes all topic point in the content, make sure to giver content in HTML format (Do not Add HTMLK, Head, Body, title tag), The chapter: " +
//             JSON.stringify(chapter);

//           const result = await generateNotesAiModel.sendMessage(PROMPT);
//           // Support both response.text() shapes
//           const aiResp =
//             (await (result.response?.text?.() || result.text?.())) || "";

//           // Save aiResp to database
//           const insertResult = await db.insert(CHAPTER_NOTES_TABLE).values({
//             chapterId:index,
//             courseId: course?.courseId,
//             notes: aiResp,
//           });
//           console.log(
//             "Saved notes for chapter",
//             index,
//             "insertResult:",
//             insertResult
//           );
//         } catch (err) {
//           console.error(
//             "Error generating/saving notes for chapter",
//             index,
//             err
//           );
//         }
//         index += 1;
//       }

//       return "Completed";
//     });

//     const updateCourseStatusResult = await step.run(
//       "Update course status to read",
//       async () => {
//         try {
//           const result = await db
//             .update(STUDY_MATERIAL_TABLE)
//             .set({
//               status: "Ready",
//             })
//             .where(eq(STUDY_MATERIAL_TABLE.courseId, course?.courseId));
//           return result;
//         } catch (err) {
//           console.error("Failed to update course status:", err);
//           throw err;
//         }
//       }
//     );
//   }
// );

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

export const GenerateNotes = inngest.createFunction(
  { id: 'generate-notes' },
  { event: 'notes.generate' },
  async ({ event, step }) => {
    const { course } = event.data;

    // Generate Notes for each chapter
    const notesResult = await step.run('Generate Notes', async () => {
      const chapters = course?.courseLayout?.chapters;

      // Iterating through each chapter to generate content
      for (const [index, chapter] of chapters.entries()) {
        const PROMPT = "Generate exam material detail content for each chapter, Make sure to includes all topic point in the content, make sure to giver content in HTML format (Do not Add HTML, Head, Body, title tag) and maximum chapters :- 5, The chapters :" + JSON.stringify(chapter);

        // Call AI Model to generate content
        const result = await generateNotesAiModel.sendMessage(PROMPT);
        const aiNotesContent = result.response.text();

        // Save generated notes to database table
        await db.insert(CHAPTER_NOTES_TABLE).values({
          chapterId: index,
          courseId: course?.courseId,
          notes: aiNotesContent
        })
      }

      return 'Success';
    })

    // Update Status to 'Ready' after generating all notes
    const updateStatusResult = await step.run('Update Course Status', async () => {
      await db.update(STUDY_MATERIAL_TABLE)
        .set({
          status: 'Ready'
        })
        .where(eq(STUDY_MATERIAL_TABLE?.courseId, course?.courseId))

      return 'Success';
    });
  }
);

export const GenerateStudyTypeContent = inngest.createFunction(
    { id: 'Generate Study Type Content' },
    { event: 'study.type.content' },
    async ({ event, step }) => {
        const { studyType, courseId, recordId, chapters } = event.data;

        // Get User Membership status
        const course = await db.select().from(STUDY_MATERIAL_TABLE).where(eq(STUDY_MATERIAL_TABLE.courseId, courseId));
        if(!course || !course[0]) {
             console.error("Course not found in DB");
             return;
        }
        
        const user = await db.select().from(USER_TABLE).where(eq(USER_TABLE.email, course[0].createdBy));
        const isMember = user[0]?.isMember;

        const limitFlashcard = isMember ? 50 : 15;
        const limitQuiz = isMember ? 20 : 10;
        const limitQA = isMember ? 20 : 15;

        let PROMPT = null;
        if(studyType == 'Flashcards') {
            PROMPT = "Generate the flashcard on topic: " + chapters + " in JSON format with front back content, Maximum " + limitFlashcard;
        } else if(studyType == 'Quiz') {
            PROMPT = "Generate Quiz on topic: " + chapters + " in JSON format with question and options. Options must be an object with keys A, B, C, D. Correct answer should be the key (e.g. 'A'). Maximum " + limitQuiz;
        } else if(studyType == 'Question/Answers' || studyType == 'qa') {
            PROMPT = "Generate Questions and Answers on topic: " + chapters + " in JSON format with question and answer fields, Maximum " + limitQA;
        }

        // 1. Generate Content using AI
        const AiResult = await step.run('Generating Study Content using AI', async () => {
            const result = await generateStudyTypeContentAiModel.sendMessage(PROMPT);
            const text = result.response.text();
            // Clean JSON string if user model returns markdown code blocks
            const cleanedText = text.replace(/```json/g, '').replace(/```/g, '');
            const AI_RESPONSE = JSON.parse(cleanedText);
            return AI_RESPONSE;
        });

        // 2. Save result to DB
        await step.run('Save Content to DB', async () => {
            await db.update(STUDY_TYPE_CONTENT_TABLE)
                .set({
                    content: typeof AiResult === 'string' ? AiResult : JSON.stringify(AiResult),
                    status: 'Ready'
                })
                .where(eq(STUDY_TYPE_CONTENT_TABLE.id, recordId));
        });

        return 'Success';
    }
);

// 3. EXPORT the array of all functions
export const allFunctions = [
  HelloWorld,
  createNewUser,
  GenerateNotes,
  GenerateStudyTypeContent,
]; // <-- Keep this export!
