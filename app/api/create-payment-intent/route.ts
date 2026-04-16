import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai"; // or your model client

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required." },
        { status: 400 }
      );
    }

    // Call your model
    const response = await client.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024",
    });

    // Safely extract data
    const imageData = response.data?.[0]?.b64_json;
    const revisedPrompt = response.data?.[0]?.revised_prompt;

    if (!imageData) {
      return NextResponse.json(
        { error: "No image data returned from the model." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      image: imageData,
      revisedPrompt: revisedPrompt ?? null,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
