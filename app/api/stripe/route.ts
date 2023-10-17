import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prisma.db";
import { stripe } from "@/lib/stripe";
import { absUrl } from "@/lib/utils";

// attach settings to current domain
const settingsUrl = absUrl("/settings");

export async function GET() {
  try {
    const { userId } = auth();
    const user = await currentUser();

    // if not logged in or no user
    if (!userId || !user)
      return new NextResponse("Unauthorized", { status: 401 });

    // find the entity in prisma db using userId
    const userSubscription = await prismadb.userSubscription.findUnique({
      where: {
        userId,
      },
    });

    // the target user subscription exists already
    // we dont want users to go to the CHECKOUT page
    // we want redirect users to BILLING page
    if (userSubscription && userSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingsUrl,
      });
      // redirect to /settings on our application when done
      return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    }

    // otherwise, go to CHECKOUT page first
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingsUrl, // same for this app only
      cancel_url: settingsUrl, // same for this app only
      payment_method_types: ["card"], // card = credit card
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user.emailAddresses[0].emailAddress,
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: "Maximus API Pro",
              description: "Unlimited AI Generations",
            },
            unit_amount: 2000, // 2000 here = 20 USD
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      /**
       * THIS METADATA IS VERY IMPORTANT
       * because this method is not creating anything yet
       * this just opens the checkout page
       * and ONLY when users have succesfully purchased the monthly subscription,
       * we gonna create a webhook to catch that
       * THEN it gonna read the METADATA -> Find the userId.
       * 
       * Meaning: o this checkout just completed successfully BELONGS to this USER ID
       * Otherwise, users will be able to checkout and subscribe but you dont know who did
       */
      metadata: {
        userId,
      },
    });

    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (error) {
    console.log("[STRIPE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
