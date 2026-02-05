import { courseOutlineAIModel } from "@/configs/aiModel";
import { STUDY_MATERIAL_TABLE, USER_TABLE } from "@/configs/schema";
import { db } from "@/configs/db";
import { NextResponse } from "next/server";
import { inngest } from "@/inngest/client";
import { eq } from "drizzle-orm";

export async function POST(req) {
    try {
        const { courseId, courseType, topic, difficultyLevel, createdBy } = await req.json()

        console.log('Received params:', { courseId, courseType, topic, difficultyLevel, createdBy });

        const user = await db.select().from(USER_TABLE).where(eq(USER_TABLE.email, createdBy));
        const isMember = user[0]?.isMember;

        const PROMPT = `Generate a study material for ${topic} for ${courseType} and the level of difficulty will be ${difficultyLevel} with a summary of the course, a list of chapters along with a summary for each chapter, and a topic list in each chapter, including appropriate emoji in the content. All results should be in JSON format. ${!isMember ? 'Maximum 5 chapters' : ''}`

        console.log('Sending prompt to Gemini:', PROMPT);

        const aiResp = await courseOutlineAIModel.sendMessage(PROMPT)
        console.log('AI Response:', aiResp);

        const aiResultText = aiResp.response.text();
        console.log('AI Result Text:', aiResultText); // This line was already uncommented and is kept as is.
        // The instruction "Uncomment console.log" and the provided "Code Edit" snippet
        // `console.log(dbResult); Text:', aiResultText);`
        // appears to be a malformed line. Assuming the intent was to add a new console.log
        // for `dbResult` or to correct the existing one, but given the instruction
        // is to "uncomment", and the line was already uncommented, the most faithful
        // interpretation that maintains syntactical correctness is to keep the existing line.
        // If there was a specific commented line for `dbResult` that needed uncommenting,
        // it was not present in the original document.

        const aiResult = JSON.parse(aiResultText);
        console.log('Parsed AI Result:', aiResult);

        const dbResult = await db.insert(STUDY_MATERIAL_TABLE).values({
            courseId: courseId,
            courseType: courseType,
            topic: topic,
            difficultLevel: difficultyLevel,
            createdBy: createdBy,
            courseLayout: JSON.stringify(aiResult),
            createdAt: new Date().toISOString().split('T')[0]
        }).returning(STUDY_MATERIAL_TABLE);

        // Trigger te inngest function to generate notes

        const result = await inngest.send({
            name : 'notes.generate',
            data : {
                course : dbResult[0]
            }
        });
        console.log('Inngest Trigger Result:', result);

        console.log('DB Result: ', dbResult);

        return NextResponse.json({ success: true, data: dbResult[0] })
    } catch (error) {
        console.error('API Error:', error.message, error.stack);
        return NextResponse.json({ error: error.message, details: error.stack }, { status: 500 })
    }
}