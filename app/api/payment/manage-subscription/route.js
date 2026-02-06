import { NextResponse } from "next/server";
import { db } from "@/configs/db";
import { USER_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    try {
        const { email } = await req.json();
        
        // Get user to find customerId
        const result = await db.select().from(USER_TABLE).where(eq(USER_TABLE.email, email));
        const user = result[0];

        if (!user || !user.customerId) {
            return NextResponse.json({ error: "User or Customer ID not found" }, { status: 404 });
        }

        const portalSession = await stripe.billingPortal.sessions.create({
            customer: user.customerId,
            return_url: `${process.env.NEXT_PUBLIC_HOST_URL}/dashboard/upgrade`,
        });

        return NextResponse.json({ url: portalSession.url });
    } catch (e) {
        console.error("Stripe Portal Error:", e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
