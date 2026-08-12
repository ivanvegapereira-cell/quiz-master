import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { data, error } = await supabase
      .from('quizzes')
      .select(`
        *,
        questions:questions(count)
      `)
      .eq('teacher_id', session.user.id)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ success: true, data })
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
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { title, description, subject, duration } = body

    if (!title || typeof title !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Title is required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('quizzes')
      .insert([
        {
          teacher_id: session.user.id,
          title: title.trim(),
          description: description || null,
          subject: subject || null,
          duration: duration || null,
          is_public: false,
        },
      ])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (error) {
    console.error('Error creating quiz:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create quiz' },
      { status: 500 }
    )
  }
}
