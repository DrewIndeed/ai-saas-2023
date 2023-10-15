import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";
import { checkValidApiLimit, increaseApiLimit } from "@/lib/api-limits";

const replicateConfig = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  try {
    // handle auth and request
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;

    // handle errors
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    if (!prompt)
      return new NextResponse("Messages are required", { status: 400 });
    // check is free trial is over
    const freeTrial = await checkValidApiLimit();
    if (!freeTrial)
      return new NextResponse("Free trial has expired", { status: 403 });

    // use music gen api from Replicate
    const musicOutput = await replicateConfig.run(
      "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
      {
        input: {
          prompt_a: prompt,
        },
      }
    );

    // if there is still free trial -> increase trial count
    await increaseApiLimit();

    // return chat response
    return NextResponse.json(musicOutput);
  } catch (error) {
    console.log("[MUSICGEN_ERROR]:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
