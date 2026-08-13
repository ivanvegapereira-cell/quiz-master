'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BarChart3, Users, BookOpen, Trophy, Zap } from 'lucide-react'

export default function DashboardPage() {
  const [stats, setStats] = useState({
    students: 0,
    quizzes: 0,
    sessions: 0,
    rewards: 0,
  })

  useEffect(() => {
    // Fetch stats from API
    setStats({
      students: 24,
      quizzes: 8,
      sessions: 12,
      rewards: 45,
    })
  }, [])

  const quickActions = [
    {
      icon: Users,
      label: 'Gestionar Estudiantes',
      href: '/dashboard/students',
      color: 'from-blue-600 to-blue-700',
      description: 'Organiza tus estudiantes y grupos',
    },
    {
      icon: BookOpen,
      label: 'Crear Quiz',
      href: '/dashboard/quizzes/new',
      color: 'from-purple-600 to-purple-700',
      description: 'Diseña nuevas actividades',
    },
    {
      icon: Zap,
      label: 'Asistente IA',
      href: '/dashboard/ai-assistant',
      color: 'from-amber-600 to-amber-700',
      description: 'Genera preguntas automáticamente',
    },
    {
      icon: Trophy,
      label: 'Premios',
      href: '/dashboard/rewards',
      color: 'from-green-600 to-green-700',
      description: 'Gestiona incentivos',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400">Bienvenido a QuizMaster</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Users, label: 'Estudiantes', value: stats.students, color: 'blue' },
            { icon: BookOpen, label: 'Quizzes', value: stats.quizzes, color: 'purple' },
            { icon: BarChart3, label: 'Sesiones', value: stats.sessions, color: 'amber' },
            { icon: Trophy, label: 'Premios', value: stats.rewards, color: 'green' },
          ].map((stat, i) => {
            const Icon = stat.icon
            const colorMap = {
              blue: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 text-blue-600 dark:text-blue-400',
              purple: 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/10 text-purple-600 dark:text-purple-400',
              amber: 'from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-900/10 text-amber-600 dark:text-amber-400',
              green: 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/10 text-green-600 dark:text-green-400',
            }
            return (
              <div key={i} className={`bg-gradient-to-br ${colorMap[stat.color as keyof typeof colorMap]} rounded-lg p-6 border border-slate-200 dark:border-slate-800`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{stat.label}</p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <Icon className="w-12 h-12 opacity-20" />
                </div>
              </div>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Acciones Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, i) => {
              const Icon = action.icon
              return (
                <Link key={i} href={action.href}>
                  <div className="group relative h-full bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 hover:shadow-lg transition-all cursor-pointer overflow-hidden">
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity`} />

                    {/* Content */}
                    <div className="relative z-10">
                      <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${action.color} text-white mb-4`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{action.label}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{action.description}</p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Actividad Reciente</h2>
          <div className="space-y-4">
            {[
              { action: 'Creaste un nuevo quiz', time: 'Hace 2 horas' },
              { action: 'Iniciaste una sesión en vivo', time: 'Hace 5 horas' },
              { action: 'Agregaste 3 nuevos estudiantes', time: 'Ayer' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 last:border-b-0">
                <p className="text-slate-900 dark:text-white">{item.action}</p>
                <span className="text-sm text-slate-600 dark:text-slate-400">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
