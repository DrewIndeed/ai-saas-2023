import { auth } from "@clerk/nextjs";

import prismadb from "./prisma.db";

const DURATION_A_DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  const { userId } = auth();
  if (!userId) return false;
  const userSubscription = await prismadb.userSubscription.findUnique({
    where: {
      userId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });

  // if user is not subscribed to Pro
  if (!userSubscription) return false;

  // if user is subscribed to Pro -> check if duration has been expired or not
  const isvalid =
    userSubscription.stripePriceId &&
    userSubscription.stripeCurrentPeriodEnd?.getTime()! + DURATION_A_DAY_IN_MS >
      Date.now();
  return !!isvalid;
};
