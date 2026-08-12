'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { signIn, signUp, signOut, getCurrentUser } from '@/lib/auth'
import type { User } from '@/types'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Verificar usuario al montar
  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)
      } catch (err) {
        console.error('Error checking user:', err)
      } finally {
        setLoading(false)
      }
    }

    checkUser()

    // Subscribirse a cambios de autenticación
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_, session) => {
      if (session?.user) {
        const currentUser = await getCurrentUser()
        setUser(currentUser)
      } else {
        setUser(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      const result = await signIn(email, password)
      if (!result.success) {
        setError(typeof result.error === 'string' ? result.error : 'Error al iniciar sesión')
        return false
      }
      const currentUser = await getCurrentUser()
      setUser(currentUser)
      router.push('/dashboard')
      return true
    } catch (err) {
      setError('Error al iniciar sesión')
      return false
    } finally {
      setLoading(false)
    }
  }

  const register = async (email: string, password: string, name: string) => {
    setLoading(true)
    setError(null)
    try {
      const result = await signUp(email, password, name)
      if (!result.success) {
        setError(typeof result.error === 'string' ? result.error : 'Error al crear cuenta')
        return false
      }
      setError('Revisa tu email para confirmar tu cuenta')
      return true
    } catch (err) {
      setError('Error al crear cuenta')
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    try {
      await signOut()
      setUser(null)
      router.push('/')
    } catch (err) {
      setError('Error al cerrar sesión')
    } finally {
      setLoading(false)
    }
  }

  const isAuthenticated = !!user
  const isTeacher = isAuthenticated

  return {
    user,
    loading,
    error,
    isAuthenticated,
    isTeacher,
    login,
    register,
    logout,
  }
}

// Hook para rutas protegidas
export function useProtectedRoute() {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/auth/login')
    }
  }, [isAuthenticated, loading, router])

  return { isAuthenticated, loading }
}
