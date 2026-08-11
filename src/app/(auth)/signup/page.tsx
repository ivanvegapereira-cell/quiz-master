'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Mail, Lock, User, AlertCircle, Loader, Check } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [localError, setLocalError] = useState('')
  const [success, setSuccess] = useState(false)
  const { register, loading, error } = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError('')

    if (!formData.name || !formData.email || !formData.password) {
      setLocalError('Por favor completa todos los campos')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setLocalError('Las contraseñas no coinciden')
      return
    }

    if (formData.password.length < 8) {
      setLocalError('La contraseña debe tener al menos 8 caracteres')
      return
    }

    const result = await register(formData.email, formData.password, formData.name)
    if (result) {
      setSuccess(true)
      setFormData({ name: '', email: '', password: '', confirmPassword: '' })
    }
  }

  const displayError = localError || error

  if (success) {
    return (
      <div className="w-full max-w-md">
        <div className="card p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center">
              <Check className="w-8 h-8 text-success-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-2">¡Cuenta Creada!</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Revisa tu email para confirmar tu cuenta antes de iniciar sesión.
          </p>
          <Link href="/auth/login">
            <button className="btn-primary w-full">Ir a Login</button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md">
      <div className="card p-8">
        <h1 className="text-3xl font-bold mb-2">Crear Cuenta</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">Únete a QuizMaster y comienza a crear actividades</p>

        {displayError && (
          <div className="mb-6 p-4 bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800 rounded-lg flex gap-3">
            <AlertCircle className="w-5 h-5 text-danger-600 flex-shrink-0" />
            <p className="text-danger-700 dark:text-danger-300 text-sm">{displayError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Nombre Completo
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="input-field pl-10"
                placeholder="Tu nombre"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Correo Electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
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
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="input-field pl-10"
                placeholder="••••••••"
                required
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">Mínimo 8 caracteres</p>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
              Confirmar Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
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
            {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 text-center">
          <p className="text-slate-600 dark:text-slate-400">
            ¿Ya tienes cuenta?{' '}
            <Link href="/auth/login" className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
