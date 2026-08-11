import { NextRequest, NextResponse } from 'next/server'
import { generateQuestions, GenerateQuestionsParams } from '@/lib/claude-api'

export async function POST(request: NextRequest) {
  try {
    const body: GenerateQuestionsParams = await request.json()

    // Validate input
    if (!body.subject || !body.level || !body.numberOfQuestions || !body.topic) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (body.numberOfQuestions > 20) {
      return NextResponse.json(
        { success: false, error: 'Maximum 20 questions per request' },
        { status: 400 }
      )
    }

    const questions = await generateQuestions(body)

    return NextResponse.json({ success: true, data: questions })
  } catch (error) {
    console.error('Error generating questions:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate questions' },
      { status: 500 }
    )
  }
}
