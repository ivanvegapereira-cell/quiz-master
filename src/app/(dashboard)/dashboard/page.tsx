'use client'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { Users, Zap, Trophy, BarChart3, ArrowRight } from 'lucide-react'

export default function DashboardPage() {
  // TODO: Fetch real data from Supabase
  const stats = [
    {
      label: 'Estudiantes',
      value: '24',
      icon: Users,
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    },
    {
      label: 'Quizzes',
      value: '8',
      icon: Zap,
      color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
    },
    {
      label: 'Sesiones',
      value: '42',
      icon: BarChart3,
      color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
    },
    {
      label: 'Premios Canjeados',
      value: '15',
      icon: Trophy,
      color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Bienvenido a QuizMaster
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Gestiona tus actividades y estudiantes en un solo lugar
          </p>
        </div>
        <Link href="/quiz">
          <Button variant="primary" className="hidden sm:flex">
            Crear Quiz
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label}>
              <CardBody className="space-y-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
              </CardBody>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Acciones Rápidas
            </h2>
          </CardHeader>
          <CardBody className="space-y-3">
            <Link href="/quiz">
              <Button variant="ghost" className="w-full justify-start">
                <Zap className="w-5 h-5" />
                Crear nuevo Quiz
              </Button>
            </Link>
            <Link href="/students">
              <Button variant="ghost" className="w-full justify-start">
                <Users className="w-5 h-5" />
                Gestionar Estudiantes
              </Button>
            </Link>
            <Link href="/ai-assistant">
              <Button variant="ghost" className="w-full justify-start">
                <Zap className="w-5 h-5" />
                Generar Preguntas con IA
              </Button>
            </Link>
            <Link href="/rewards">
              <Button variant="ghost" className="w-full justify-start">
                <Trophy className="w-5 h-5" />
                Gestionar Premios
              </Button>
            </Link>
          </CardBody>
        </Card>

        {/* Recent Sessions */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Sesiones Recientes
            </h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              {[
                { name: 'Quiz Geometría', students: 24, points: 1250 },
                { name: 'Trivia Literatura', students: 22, points: 980 },
                { name: 'Test Historia', students: 24, points: 2140 },
              ].map((session, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">
                      {session.name}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {session.students} estudiantes
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary-600 dark:text-primary-400">
                      {session.points}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      puntos
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Getting Started */}
      <Card className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-900/10 border-primary-200 dark:border-primary-800">
        <CardBody className="py-6">
          <h3 className="text-lg font-bold text-primary-900 dark:text-primary-100 mb-2">
            ¿Primeros pasos?
          </h3>
          <p className="text-primary-800 dark:text-primary-200 mb-4">
            Crea tu primer quiz en minutos con nuestro asistente de IA. Solo necesitas elegir un tema y nivel.
          </p>
          <Link href="/ai-assistant">
            <Button variant="primary">
              Comenzar
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </CardBody>
      </Card>
    </div>
  )
}
