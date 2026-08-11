'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Mail, Lock, AlertCircle, Loader } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [localError, setLocalError] = useState('')
  const { login, loading, error } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError('')

    if (!email || !password) {
      setLocalError('Por favor completa todos los campos')
      return
    }

    await login(email, password)
  }

  const displayError = localError || error

  return (
    <div className="w-full max-w-md">
      <div className="card p-8">
        <h1 className="text-3xl font-bold mb-2">Bienvenido</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">Inicia sesión en tu cuenta QuizMaster</p>

        {displayError && (
          <div className="mb-6 p-4 bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800 rounded-lg flex gap-3">
            <AlertCircle className="w-5 h-5 text-danger-600 flex-shrink-0" />
            <p className="text-danger-700 dark:text-danger-300 text-sm">{displayError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Correo Electrónico
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
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            {loading && <Loader className="w-4 h-4 animate-spin" />}
            {loading ? 'Iniciando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/auth/forgot-password" className="text-primary-600 dark:text-primary-400 text-sm hover:underline">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 text-center">
          <p className="text-slate-600 dark:text-slate-400">
            ¿No tienes cuenta?{' '}
            <Link href="/auth/signup" className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
