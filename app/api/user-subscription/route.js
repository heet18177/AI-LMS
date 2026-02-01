import { NextResponse } from 'next/server';
import { db } from '@/configs/db';
import { USER_TABLE } from '@/configs/schema';
import { eq } from 'drizzle-orm';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
        return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    try {
        const result = await db.select().from(USER_TABLE).where(eq(USER_TABLE.email, email));
        return NextResponse.json(result[0] || {});
    } catch (error) {
        console.error('Error fetching user subscription:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
