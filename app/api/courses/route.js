import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE, USER_TABLE } from "@/configs/schema";
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

  return NextResponse.json({ result: result, isMember: isMember });
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
