import { db } from "@/configs/db";
import { CHAPTER_NOTES_TABLE, STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { courseId, studyType } = await req.json();
        console.log("POST /api/study-type", { courseId, studyType });

        // ALL → return object
        if (studyType === "ALL") {
            const notes = await db
                .select()
                .from(CHAPTER_NOTES_TABLE)
                .where(eq(CHAPTER_NOTES_TABLE?.courseId, courseId));

            const contentList = await db.select()
                .from(STUDY_TYPE_CONTENT_TABLE)
                .where(eq(STUDY_TYPE_CONTENT_TABLE?.courseId, courseId));

            return NextResponse.json({
                notes,
                flashcard: contentList?.find(item => item.type === 'Flashcards') || null,
                quiz: contentList?.find(item => item.type === 'Quiz') || null,
                qa: contentList?.find(item => item.type === 'qa' || item.type === 'Question/Answers') || null,
            });
        }

        // NOTES → return notes only
        if (studyType === "notes") {
            const notes = await db
                .select()
                .from(CHAPTER_NOTES_TABLE)
                .where(eq(CHAPTER_NOTES_TABLE.courseId, courseId));

            return NextResponse.json({ notes });
        }

        else{
            const result = await db
                .select()
                .from(STUDY_TYPE_CONTENT_TABLE)
                .where(and(eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId), eq(STUDY_TYPE_CONTENT_TABLE.type, studyType)));

            return NextResponse.json(result[0] || { content: null });
        }


        return NextResponse.json({ error: "Invalid studyType" }, { status: 400 });

    } catch (err) {
        console.error("Error in /api/study-type:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
