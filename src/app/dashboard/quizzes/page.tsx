'use client'

import Link from 'next/link'
import { BookOpen, Plus, Eye, Edit2, Trash2 } from 'lucide-react'

export default function QuizzesPage() {
  const quizzes = [
    { id: 1, title: 'Matemática Básica', questions: 10, published: '2026-08-01', status: 'active' },
    { id: 2, title: 'Historia de Chile', questions: 15, published: '2026-08-02', status: 'active' },
    { id: 3, title: 'Inglés Intermedio', questions: 12, published: '2026-08-03', status: 'draft' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Quizzes</h1>
              <p className="text-slate-600 dark:text-slate-400 mt-2">Crea y gestiona tus actividades</p>
            </div>
            <Link href="/dashboard/quizzes/new">
              <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                <Plus className="w-5 h-5" />
                Crear Quiz
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                    <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">{quiz.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{quiz.questions} preguntas</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  quiz.status === 'active'
                    ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}>
                  {quiz.status === 'active' ? 'Publicado' : 'Borrador'}
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Creado: {quiz.published}</p>
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-200 dark:hover:bg-blue-900/30 text-sm"><Eye className="w-4 h-4" />Ver</button>
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-sm"><Edit2 className="w-4 h-4" />Editar</button>
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded hover:bg-red-200 dark:hover:bg-red-900/30 text-sm"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
