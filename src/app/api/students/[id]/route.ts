import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    const { name, group_id } = body

    // Verificar que el estudiante pertenece al usuario
    const { data: student, error: checkError } = await supabase
      .from('students')
      .select('*')
      .eq('id', params.id)
      .eq('teacher_id', session.user.id)
      .single()

    if (checkError || !student) {
      return NextResponse.json(
        { success: false, error: 'Student not found' },
        { status: 404 }
      )
    }

    const { data, error } = await supabase
      .from('students')
      .update({
        name: name || student.name,
        group_id: group_id !== undefined ? group_id : student.group_id,
      })
      .eq('id', params.id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error updating student:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update student' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Verificar que el estudiante pertenece al usuario
    const { data: student, error: checkError } = await supabase
      .from('students')
      .select('*')
      .eq('id', params.id)
      .eq('teacher_id', session.user.id)
      .single()

    if (checkError || !student) {
      return NextResponse.json(
        { success: false, error: 'Student not found' },
        { status: 404 }
      )
    }

    const { error } = await supabase
      .from('students')
      .delete()
      .eq('id', params.id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting student:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete student' },
      { status: 500 }
    )
  }
}
