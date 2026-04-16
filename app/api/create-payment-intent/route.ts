import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // remove apiVersion entirely
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

})

export async function POST(req: NextRequest) {
  try {
    const { amount, orderId, customerEmail } = await req.json()

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe uses cents
      currency: 'usd',
      metadata: { orderId },
      receipt_email: customerEmail,
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
