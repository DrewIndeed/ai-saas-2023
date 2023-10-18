import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import prismadb from "@/lib/prisma.db";
import { stripe } from "@/lib/stripe";

/*
So the hook will only look into 2 events:
+ The invoice payment suceeded
+ The checkout session completed
2 events because in our stripe route, we only do 2 things, either:
+ The billing portal (this one is either upgrade or cancel user subscription)
+ The checkout session (this is to create a subscription for the very first time)

Another thing is that, we cannot use Clerk in our webhook since
the hook will run indeepenently from our application. That's why
we use "session?.metadata?.userId" to get the user ID from meta
instead from Clerk. Also, because of this independence, we will have
to add the webhook to our PUBLIC ROUTE when we publish the app as well
*/
export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  // construct as Stripe webhook event
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.log("[WEBHOOK_ERROR]:", error);
    return new NextResponse("[WEBHOOK_ERROR]", { status: 400 });
  }

  // Get session event of Stripe
  const session = event.data.object as Stripe.Checkout.Session;

  // Event 1: check out session -> create a new subscription
  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );
    // if there is no user ID or not logged in somehow
    if (!session?.metadata?.userId)
      return new NextResponse(
        "[WEBHOOK_ERROR][Check Out Event]: User ID is required",
        { status: 400 }
      );
    // if user exists, create new subscription in db
    await prismadb.userSubscription?.create({
      data: {
        userId: session?.metadata?.userId, // match the currently logged in user
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    });
  }

  // Event 2: billing portal -> upgrade to the PRO one or or the existing one is expired
  if (event.type === "invoice.payment_succeeded") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );
    await prismadb.userSubscription.update({
      where: {
        stripeSubscriptionId: subscription.id,
      },
      data: {
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date( // update the subscription interval end date
          subscription.current_period_end * 1000
        ),
      },
    });
  }

  // have to do this even when we dont sending anything
  // it is just how webhook works
  return new NextResponse(null, { status: 200 });
}
