import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export interface GenerateQuestionsParams {
  subject: string
  level: string
  numberOfQuestions: number
  topic: string
}

export interface GeneratedQuestion {
  text: string
  type: 'multiple_choice' | 'true_false'
  options: {
    text: string
    isCorrect: boolean
  }[]
  difficulty: 'easy' | 'medium' | 'hard'
  points: number
}

export async function generateQuestions(
  params: GenerateQuestionsParams
): Promise<GeneratedQuestion[]> {
  const prompt = `Generate ${params.numberOfQuestions} educational questions for the following:
Subject: ${params.subject}
Level: ${params.level}
Topic: ${params.topic}

Requirements:
- Each question should be in Spanish
- Vary between multiple choice and true/false questions
- Each multiple choice should have 4 options
- Include a mix of difficulty levels (easy, medium, hard)
- Assign points: easy=10, medium=20, hard=30
- Each question must have exactly one correct answer

Return the questions in this JSON format:
[
  {
    "text": "Question text here?",
    "type": "multiple_choice",
    "options": [
      {"text": "Option 1", "isCorrect": true},
      {"text": "Option 2", "isCorrect": false}
    ],
    "difficulty": "medium",
    "points": 20
  }
]`

  const message = await client.messages.create({
    model: 'claude-opus-4-1',
    max_tokens: 4096,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  const responseText =
    message.content[0].type === 'text' ? message.content[0].text : ''

  // Extract JSON from response
  const jsonMatch = responseText.match(/\[[\s\S]*\]/)
  if (!jsonMatch) {
    throw new Error('Could not parse generated questions')
  }

  return JSON.parse(jsonMatch[0])
}

export interface GenerateFeedbackParams {
  studentName: string
  topic: string
  missedQuestions: string[]
  score: number
  level: string
}

export async function generateRemedialGuide(
  params: GenerateFeedbackParams
): Promise<string> {
  const prompt = `Create a personalized learning guide for a student who struggled with a quiz:

Student Name: ${params.studentName}
Topic: ${params.topic}
Score: ${params.score}%
Level: ${params.level}
Topics they struggled with: ${params.missedQuestions.join(', ')}

Create a supportive, encouraging guide that:
1. Starts with positive feedback
2. Identifies the main areas of confusion
3. Explains key concepts in simple terms
4. Provides 2-3 practice tips
5. Suggests resources (YouTube videos, websites, etc.)
6. Ends with encouragement

Write the guide in Spanish and make it suitable for a student of ${params.level} level.
The response should be well-formatted and easy to read.`

  const message = await client.messages.create({
    model: 'claude-opus-4-1',
    max_tokens: 2048,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  return message.content[0].type === 'text' ? message.content[0].text : ''
}
