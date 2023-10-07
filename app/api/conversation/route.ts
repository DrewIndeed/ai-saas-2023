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
    const { messages } = body;

    // handle errors
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    if (!openaiConfig.apiKey)
      return new NextResponse("Open AI key not found", { status: 500 });
    if (!messages)
      return new NextResponse("Messages are required", { status: 400 });

    // use conversation api
    const chatCompletion = await openaiConfig.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    // return chat response
    return NextResponse.json(chatCompletion.choices[0]);
  } catch (error) {
    console.log("[CONVERSATION_ERROR]:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
