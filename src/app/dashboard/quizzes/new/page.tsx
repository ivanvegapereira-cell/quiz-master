'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BookOpen, Plus, Trash2, ChevronLeft } from 'lucide-react'

interface Question {
  id: number
  text: string
  type: 'multiple_choice' | 'true_false'
  options: { text: string; isCorrect: boolean }[]
  difficulty: 'easy' | 'medium' | 'hard'
  points: number
}

export default function NewQuizPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [subject, setSubject] = useState('')
  const [duration, setDuration] = useState('10')
  const [questions, setQuestions] = useState<Question[]>([])
  const [showQuestionForm, setShowQuestionForm] = useState(false)
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null)

  const [questionText, setQuestionText] = useState('')
  const [questionType, setQuestionType] = useState<'multiple_choice' | 'true_false'>('multiple_choice')
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium')
  const [options, setOptions] = useState([
    { text: '', isCorrect: true },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
  ])

  const points = { easy: 10, medium: 20, hard: 30 }

  const handleAddQuestion = () => {
    if (!questionText.trim() || options.some(o => !o.text.trim())) {
      alert('Por favor completa todos los campos')
      return
    }

    if (questionType === 'true_false') {
      const newQuestion: Question = {
        id: editingQuestion?.id || Date.now(),
        text: questionText,
        type: 'true_false',
        options: [
          { text: 'Verdadero', isCorrect: options[0].isCorrect },
          { text: 'Falso', isCorrect: options[1].isCorrect },
        ],
        difficulty,
        points: points[difficulty],
      }
      setQuestions(editingQuestion ? questions.map(q => q.id === newQuestion.id ? newQuestion : q) : [...questions, newQuestion])
    } else {
      const newQuestion: Question = {
        id: editingQuestion?.id || Date.now(),
        text: questionText,
        type: 'multiple_choice',
        options: options.slice(0, 4),
        difficulty,
        points: points[difficulty],
      }
      setQuestions(editingQuestion ? questions.map(q => q.id === newQuestion.id ? newQuestion : q) : [...questions, newQuestion])
    }

    resetForm()
  }

  const resetForm = () => {
    setQuestionText('')
    setQuestionType('multiple_choice')
    setDifficulty('medium')
    setOptions([
      { text: '', isCorrect: true },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
    ])
    setShowQuestionForm(false)
    setEditingQuestion(null)
  }

  const handleSaveQuiz = () => {
    if (!title.trim()) {
      alert('Por favor ingresa un título')
      return
    }
    if (questions.length === 0) {
      alert('Por favor agrega al menos una pregunta')
      return
    }
    // Save quiz to Supabase (to be implemented)
    alert(`Quiz "${title}" guardado exitosamente`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/dashboard/quizzes">
            <button className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-4">
              <ChevronLeft className="w-5 h-5" />
              Volver
            </button>
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Crear Nuevo Quiz</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quiz Details */}
            <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Detalles del Quiz</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Título</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ej: Matemática Básica - Fracciones"
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Descripción</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Breve descripción del contenido"
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Materia</label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Ej: Matemática"
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Duración (minutos)</label>
                    <input
                      type="number"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      min="1"
                      max="120"
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Questions */}
            <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Preguntas ({questions.length})</h2>
                <button
                  onClick={() => setShowQuestionForm(!showQuestionForm)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Agregar
                </button>
              </div>

              {/* Question Form */}
              {showQuestionForm && (
                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 mb-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Pregunta</label>
                    <textarea
                      value={questionText}
                      onChange={(e) => setQuestionText(e.target.value)}
                      placeholder="Escribe la pregunta..."
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 h-20"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Tipo</label>
                      <select
                        value={questionType}
                        onChange={(e) => setQuestionType(e.target.value as any)}
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="multiple_choice">Opción Múltiple</option>
                        <option value="true_false">Verdadero/Falso</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Dificultad</label>
                      <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value as any)}
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="easy">Fácil (10 pts)</option>
                        <option value="medium">Medio (20 pts)</option>
                        <option value="hard">Difícil (30 pts)</option>
                      </select>
                    </div>
                  </div>

                  {/* Options */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Opciones</label>
                    <div className="space-y-2">
                      {options.slice(0, questionType === 'true_false' ? 2 : 4).map((option, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={option.isCorrect}
                            onChange={(e) => {
                              const newOptions = [...options]
                              if (e.target.checked) {
                                newOptions.forEach(o => o.isCorrect = false)
                              }
                              newOptions[idx].isCorrect = e.target.checked
                              setOptions(newOptions)
                            }}
                            className="w-4 h-4"
                          />
                          <input
                            type="text"
                            value={option.text}
                            onChange={(e) => {
                              const newOptions = [...options]
                              newOptions[idx].text = e.target.value
                              setOptions(newOptions)
                            }}
                            placeholder={`Opción ${idx + 1}`}
                            className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handleAddQuestion}
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      {editingQuestion ? 'Actualizar' : 'Agregar'} Pregunta
                    </button>
                    <button
                      onClick={resetForm}
                      className="flex-1 px-4 py-2 bg-slate-300 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg hover:bg-slate-400 transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}

              {/* Questions List */}
              <div className="space-y-3">
                {questions.map((q, idx) => (
                  <div key={q.id} className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-slate-900 dark:text-white">{idx + 1}. {q.text}</p>
                      <div className="flex gap-2 mt-2 text-xs">
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded">
                          {q.type === 'multiple_choice' ? 'Opción múltiple' : 'V/F'}
                        </span>
                        <span className={`px-2 py-1 rounded ${
                          q.difficulty === 'easy' ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300' :
                          q.difficulty === 'medium' ? 'bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300' :
                          'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                        }`}>
                          {q.difficulty === 'easy' ? 'Fácil' : q.difficulty === 'medium' ? 'Medio' : 'Difícil'}
                        </span>
                        <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded">{q.points} pts</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingQuestion(q)
                          setQuestionText(q.text)
                          setQuestionType(q.type)
                          setDifficulty(q.difficulty)
                          setOptions(q.options.length === 2 ? [...q.options, { text: '', isCorrect: false }, { text: '', isCorrect: false }] : q.options)
                          setShowQuestionForm(true)
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => setQuestions(questions.filter(qq => qq.id !== q.id))}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 sticky top-24 space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <strong>Preguntas:</strong> {questions.length}
                </p>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <strong>Puntos totales:</strong> {questions.reduce((sum, q) => sum + q.points, 0)}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-slate-900 dark:text-white">Dificultad</h3>
                <div className="text-sm space-y-1">
                  <p>🟢 Fácil: {questions.filter(q => q.difficulty === 'easy').length}</p>
                  <p>🟡 Medio: {questions.filter(q => q.difficulty === 'medium').length}</p>
                  <p>🔴 Difícil: {questions.filter(q => q.difficulty === 'hard').length}</p>
                </div>
              </div>

              <button
                onClick={handleSaveQuiz}
                disabled={!title.trim() || questions.length === 0}
                className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                Guardar Quiz
              </button>

              <Link href="/dashboard/quizzes">
                <button className="w-full px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg hover:bg-slate-300 transition-colors">
                  Cancelar
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
