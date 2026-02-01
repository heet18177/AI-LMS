import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE, USER_TABLE, CHAPTER_NOTES_TABLE, STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { createdBy } = await req.json();
  console.log("Fetching courses for:", createdBy);

  const result = await db
    .select()
    .from(STUDY_MATERIAL_TABLE)
    .where(eq(STUDY_MATERIAL_TABLE.createdBy, createdBy));

  const user = await db
    .select()
    .from(USER_TABLE)
    .where(eq(USER_TABLE.email, createdBy));
  
  const isMember = user[0]?.isMember;

  // Enrich each course with counts and progress
  const enriched = await Promise.all(result.map(async (course) => {
    const courseLayout = course?.courseLayout || {};
    const chapters = Array.isArray(courseLayout?.chapters) ? courseLayout.chapters : [];
    const chapterCount = chapters.length;

    const notesRows = await db
      .select()
      .from(CHAPTER_NOTES_TABLE)
      .where(eq(CHAPTER_NOTES_TABLE.courseId, course.courseId));
    const notesCount = notesRows.length;

    const contentList = await db
      .select()
      .from(STUDY_TYPE_CONTENT_TABLE)
      .where(eq(STUDY_TYPE_CONTENT_TABLE.courseId, course.courseId));

    let flashcardCount = 0;
    let quizCount = 0;
    let qaCount = 0;

    for (const item of contentList) {
      if (!item?.content) continue;
      let parsed = item.content;
      try {
        if (typeof parsed === 'string') parsed = JSON.parse(parsed);
      } catch (err) {
        console.warn('Failed to parse content for course', course.courseId, err);
      }

      let count = 0;
      if (Array.isArray(parsed)) count = parsed.length;
      else if (parsed && typeof parsed === 'object') count = Object.keys(parsed).length;

      const t = (item.type || '').toLowerCase();
      if (t.includes('flash')) flashcardCount = count;
      if (t.includes('quiz')) quizCount = count;
      if (t.includes('qa') || t.includes('question')) qaCount = count;
    }

    const studyTypesGenerated = [flashcardCount > 0, quizCount > 0, qaCount > 0].filter(Boolean).length;

    const chaptersPercent = chapterCount > 0 ? (notesCount / chapterCount) : 0;
    const studyTypesPercent = 3 > 0 ? studyTypesGenerated / 3 : 0;

    // Weight chapters more heavily
    const progressValue = Math.round((chaptersPercent * 0.7 + studyTypesPercent * 0.3) * 100);

    return {
      ...course,
      chapterCount,
      notesCount,
      flashcardCount,
      quizCount,
      qaCount,
      progressValue
    };
  }));

  return NextResponse.json({ result: enriched, isMember: isMember });
}

export async function GET(req) {
  try {
    const reqUrl = req.url;
    const { searchParams } = new URL(reqUrl);
    const courseId = searchParams?.get("courseId");

    console.log("GET /api/courses - Received courseId:", courseId);

    if (!courseId) {
      return NextResponse.json(
        { error: "courseId is required" },
        { status: 400 }
      );
    }

    const course = await db
      .select()
      .from(STUDY_MATERIAL_TABLE)
      .where(eq(STUDY_MATERIAL_TABLE.courseId, courseId));

    console.log("Query result:", course);

    return NextResponse.json({ result: course[0] || null });
  } catch (error) {
    console.error("GET /api/courses error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { courseId, createdBy } = await req.json();

    if (!courseId || !createdBy) {
      return NextResponse.json({ error: "courseId and createdBy are required" }, { status: 400 });
    }

    // Only delete if courseId matches and createdBy matches the current user
    await db.delete(STUDY_MATERIAL_TABLE).where(
      eq(STUDY_MATERIAL_TABLE.courseId, courseId),
      eq(STUDY_MATERIAL_TABLE.createdBy, createdBy)
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/courses error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
