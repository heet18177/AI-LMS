import { db } from "@/configs/db";
import { CHAPTER_NOTES_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";
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
                .where(eq(CHAPTER_NOTES_TABLE.courseId, courseId));

            return NextResponse.json({
                notes,
                flashcard: null,
                quiz: null,
                qa: null,
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

        return NextResponse.json({ error: "Invalid studyType" }, { status: 400 });

    } catch (err) {
        console.error("Error in /api/study-type:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
