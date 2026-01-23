import { db } from "@/configs/db";
import { STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { chapters, courseId, studyType } = await req.json();
  console.log("studyType", studyType);
  const PROMPT = `Generate the flashcard on topic: ${chapters} in JSON format with front back content, Maximum 15`;

  //insert record to DB , update status to generating

  const result = await db
    .insert(STUDY_TYPE_CONTENT_TABLE)
    .values({
      courseId: courseId,
      type: studyType,
    })
    .returning({ id: STUDY_TYPE_CONTENT_TABLE.id });

  // Trigger Inngest function and await result so caller can observe success/failure
  try {
    const inngestResult = await inngest.send({
      name: "study.type.content",
      data: {
        studyType: studyType,
        chapters: chapters,
        courseId: courseId,
        recordId: result[0].id,
      },
    });

    return NextResponse.json({ id: result[0].id, inngest: inngestResult });
  } catch (err) {
    console.error("Failed to trigger Inngest function", err);
    return NextResponse.json(
      { id: result[0].id, error: String(err) },
      { status: 500 }
    );
  }
}
