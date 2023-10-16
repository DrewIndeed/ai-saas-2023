import { auth } from "@clerk/nextjs";
import prismadb from "./prisma.db";
import { MAX_FREE_COUNT } from "@/constants";

// update user api limit in db
export const increaseApiLimit = async () => {
  const { userId } = auth();
  if (!userId) return;
  const userApiLimtRs = await prismadb.userApiLimit.findUnique({
    where: {
      userId,
    },
  });
  // if user limit exists -> update the existing limit
  if (userApiLimtRs) {
    await prismadb.userApiLimit.update({
      where: { userId },
      data: { count: userApiLimtRs.count + 1 },
    });
  } else {
    await prismadb.userApiLimit.create({
      data: { userId, count: 1 },
    });
  }
};

export const checkValidApiLimit = async () => {
  const { userId } = auth();
  if (!userId) return;
  const userApiLimtRs = await prismadb.userApiLimit.findUnique({
    where: {
      userId,
    },
  });
  // if user has not set a limit or the limit is still valid
  if (!userApiLimtRs || userApiLimtRs.count < MAX_FREE_COUNT) return true;
  return false;
};

export const getApiLimitCount = async () => {
  const { userId } = auth();
  if (!userId) return 0;
  const userApiLimtRs = await prismadb.userApiLimit.findUnique({
    where: {
      userId,
    },
  });
  if (!userApiLimtRs) return 0;
  return userApiLimtRs.count;
};
