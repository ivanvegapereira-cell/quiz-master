'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Lock, User } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (password.length < 8) {
        setError('La contraseña debe tener al menos 8 caracteres')
        setLoading(false)
        return
      }

      const { data, error: signupError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      })

      if (signupError) {
        setError(signupError.message)
        setLoading(false)
        return
      }

      if (data.user) {
        await supabase.from('users').insert({
          id: data.user.id,
          email,
          name,
        })
      }

      setLoading(false)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Error al crear la cuenta')
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="card p-8">
        <h1 className="text-3xl font-bold mb-2">Crear Cuenta</h1>
        <p className="text-slate-400 mb-8">Únete a QuizMaster y comienza a gamificar</p>

        {error && (
          <div className="mb-6 p-3 bg-red-900/30 border border-red-700 rounded text-red-300 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Nombre
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field pl-10"
                placeholder="Tu nombre"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field pl-10"
                placeholder="tu@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field pl-10"
                placeholder="••••••••"
                required
              />
            </div>
            <p className="text-xs text-slate-400 mt-1">Mínimo 8 caracteres</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-700 text-center">
          <p className="text-slate-400 text-sm">
            ¿Ya tienes cuenta?{' '}
            <Link href="/auth/login" className="text-primary-400 font-semibold hover:text-primary-300">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
