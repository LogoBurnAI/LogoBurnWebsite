import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const { prompt, productType, size } = await req.json()

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    // Enhance the prompt for print-quality design generation
    const enhancedPrompt = `
      Create a professional print-ready graphic design for a ${productType}.
      Design request: ${prompt}.
      Style: Bold, high-contrast, vibrant colors suitable for large format printing.
      Format: Clean, professional, commercial print design.
      The design should work well at ${size} dimensions.
      No text unless specifically requested. High resolution, sharp edges.
    `.trim()

    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: enhancedPrompt,
      n: 1,
      size: '1024x1024',
      quality: 'hd',
      style: 'vivid',
      response_format: 'b64_json',
    })

    const imageData = response.data[0].b64_json
    const revisedPrompt = response.data[0].revised_prompt

    return NextResponse.json({
      imageDataUrl: `data:image/png;base64,${imageData}`,
      revisedPrompt,
    })
  } catch (error: any) {
    console.error('OpenAI error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate design' },
      { status: 500 }
    )
  }
}
