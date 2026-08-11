import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    // TODO: Implement auth check
    // const userId = await getUserIdFromRequest(request)

    // For now, return placeholder data
    const quizzes = [
      {
        id: '1',
        title: 'Geometría Básica',
        description: 'Test de geometría para 7mo grado',
        subject: 'Matemática',
        questions_count: 10,
        created_at: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Literatura Clásica',
        description: 'Preguntas sobre obras clásicas',
        subject: 'Lenguaje',
        questions_count: 15,
        created_at: new Date().toISOString(),
      },
    ]

    return NextResponse.json({ success: true, data: quizzes })
  } catch (error) {
    console.error('Error fetching quizzes:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch quizzes' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    // TODO: Implement quiz creation with Supabase
    // const quiz = await supabase
    //   .from('quizzes')
    //   .insert([{ ...body, teacher_id: userId }])

    return NextResponse.json(
      {
        success: true,
        data: { id: '1', ...body },
        message: 'Quiz created successfully',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating quiz:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create quiz' },
      { status: 500 }
    )
  }
}
