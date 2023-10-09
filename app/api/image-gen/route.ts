import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openaiConfig = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    // handle auth and request
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = "1", resolution: size = "512x512" } = body;

    // handle errors
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    if (!openaiConfig.apiKey)
      return new NextResponse("Open AI key not found", { status: 500 });
    if (!prompt) return new NextResponse("Prompt is required", { status: 400 });
    if (!amount) return new NextResponse("Amount is required", { status: 400 });
    if (!size) return new NextResponse("Size is required", { status: 400 });

    // use image api
    const imageGenResponse = await openaiConfig.images.generate({
      prompt,
      n: parseInt(amount, 10),
      size,
    });

    // return image response (array)
    return NextResponse.json(imageGenResponse.data);
  } catch (error) {
    console.log("[IMAGEGEN_ERROR]:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
