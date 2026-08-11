import { supabase } from './supabase'
import type { User } from '@/types'

export async function signUp(email: string, password: string, name: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    })

    if (error) throw error

    // Crear usuario en tabla public.users
    if (data.user) {
      const { error: userError } = await supabase.from('users').insert([
        {
          id: data.user.id,
          email: data.user.email,
          name: name,
          created_at: new Date().toISOString(),
        },
      ])

      if (userError) throw userError
    }

    return { success: true, data }
  } catch (error) {
    return { success: false, error }
  }
}

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    return { success: false, error }
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session?.user) return null

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', session.user.id)
      .single()

    if (error) return null

    return data
  } catch (error) {
    return null
  }
}

export async function updateUserProfile(userId: string, updates: Partial<User>) {
  try {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    return { success: false, error }
  }
}

export async function resetPassword(email: string) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`,
    })

    if (error) throw error

    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}
