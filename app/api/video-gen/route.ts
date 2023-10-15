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

    // use video gen api from Replicate
    const videoOutput = await replicateConfig.run(
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      {
        input: {
          prompt,
        },
      }
    );

    // if there is still free trial -> increase trial count
    await increaseApiLimit();

    // return chat response
    return NextResponse.json(videoOutput);
  } catch (error) {
    console.log("[MUSICGEN_ERROR]:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
