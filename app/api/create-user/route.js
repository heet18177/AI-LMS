// app/api/create-user/route.js
import { NextResponse } from 'next/server';
import { db } from '../../../configs/db';        // server-only import OK here
import { USER_TABLE } from '../../../configs/schema';
import { eq } from 'drizzle-orm';
import { inngest } from '@/inngest/client';

export async function POST(req) {
    try {
        const body = await req.json();
        const user = body?.user;
        if (!user) {
            return NextResponse.json({ error: 'Missing user in request body' }, { status: 400 });
        }

        const email = user?.primaryEmailAddress?.emailAddress ?? null;
        const name = user?.fullName ?? null;
        if (!email) {
            return NextResponse.json({ error: 'User email not available' }, { status: 400 });
        }

        // check if exists
        const existing = await db.select().from(USER_TABLE).where(eq(USER_TABLE.email, email));
        if (Array.isArray(existing) && existing.length === 0) {
            // // insert user
            // await db.insert(USER_TABLE).values({
            //     email,
            //     name,
            //     // any other required fields...
            // });

            const userData = inngest.send({
                name: 'user.create',
                data: { user: user }
            })

            return NextResponse.json({ ok: true, message: 'User created', user: user });
        }

        return NextResponse.json({ ok: true, message: 'User exists' });
    } catch (err) {
        // log full error server-side
        console.error('/api/create-user error:', err);
        // return a helpful message for devs (avoid leaking stack in production)
        return NextResponse.json(
            { error: process.env.NODE_ENV === 'production' ? 'Internal server error' : String(err?.stack ?? err?.message ?? err) },
            { status: 500 }
        );
    }
}
