import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/configs/db";
import { PAYMENT_RECORD_TABLE, USER_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { priceId, userEmail, userName } = await req.json();

    // 1. Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId, // This is the API ID from your Stripe Dashboard
          quantity: 1,
        },
      ],
      // 2. Success and Cancel URLs
      success_url: `${process.env.NEXT_PUBLIC_HOST_URL}/dashboard/upgrade?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_HOST_URL}/dashboard/upgrade`,
      
      // 3. Metadata to identify the user in Webhooks later
      customer_email: userEmail,
      metadata: {
        userName: userName,
        userEmail: userEmail,
      },
    });

    return NextResponse.json(session);
  } catch (error) {
    console.error("Stripe Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
     const { searchParams } = new URL(req.url);
     const sessionId = searchParams.get('session_id');

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
      // Update User
      const userEmail = session.metadata.userEmail;
      
      // Update user membership
      const updateResult = await db.update(USER_TABLE)
        .set({ isMember: true })
        .where(eq(USER_TABLE.email, userEmail));

      // Create Payment Record
      const insertResult = await db.insert(PAYMENT_RECORD_TABLE).values({
        customerId: session.customer,
        sessionId: session.id,
      });

      return NextResponse.json({ success: true, updateResult, insertResult });
    } else {
      return NextResponse.json({ error: "Payment not paid" }, { status: 400 });
    }
  } catch (error) {
    console.error("Payment Verification Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}