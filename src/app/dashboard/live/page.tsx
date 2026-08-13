'use client'

import { useState, useEffect } from 'react'
import { Play, SkipForward, SkipBack, X, Copy, Check } from 'lucide-react'

interface StudentScore {
  id: number
  name: string
  score: number
  answered: boolean
}

export default function LiveSessionPage() {
  const [sessionActive, setSessionActive] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [sessionCode, setSessionCode] = useState('')
  const [copied, setCopied] = useState(false)
  const [students] = useState<StudentScore[]>([
    { id: 1, name: 'Juan Pérez', score: 50, answered: true },
    { id: 2, name: 'María González', score: 20, answered: true },
    { id: 3, name: 'Carlos López', score: 0, answered: false },
  ])

  const questions = [
    {
      id: 1,
      text: '¿Cuál es el resultado de 2 + 2?',
      options: ['3', '4', '5', '6'],
      correct: 1,
    },
    {
      id: 2,
      text: '¿Cuál es la capital de Chile?',
      options: ['Valparaíso', 'Santiago', 'Concepción', 'Valdivia'],
      correct: 1,
    },
    {
      id: 3,
      text: '¿En qué año terminó la Segunda Guerra Mundial?',
      options: ['1943', '1944', '1945', '1946'],
      correct: 2,
    },
  ]

  useEffect(() => {
    if (!sessionCode) {
      const code = Math.random().toString(36).substring(2, 8).toUpperCase()
      setSessionCode(code)
    }
  }, [])

  const copySessionCode = () => {
    navigator.clipboard.writeText(sessionCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleStartSession = () => {
    setSessionActive(true)
    setCurrentQuestion(0)
  }

  const handleEndSession = () => {
    setSessionActive(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {!sessionActive ? (
        // Pre-game Screen
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-8 space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Sesión en Vivo</h1>
              <p className="text-slate-600 dark:text-slate-400 mt-2">Comparte el código con tus estudiantes</p>
            </div>

            {/* Session Code */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-6 text-center">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Código de sesión</p>
              <p className="text-4xl font-bold text-slate-900 dark:text-white mb-4 font-mono">{sessionCode}</p>
              <button
                onClick={copySessionCode}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5" />
                    ¡Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copiar Código
                  </>
                )}
              </button>
            </div>

            {/* Waiting Students */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
              <p className="text-sm font-medium text-slate-900 dark:text-white mb-3">Estudiantes conectados: {students.length}</p>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {students.map(student => (
                  <div key={student.id} className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-700 rounded">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-slate-900 dark:text-white">{student.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Start Button */}
            <button
              onClick={handleStartSession}
              disabled={students.length === 0}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              <Play className="w-5 h-5" />
              Comenzar Sesión
            </button>
          </div>
        </div>
      ) : (
        // Live Game Screen
        <div className="flex flex-col min-h-screen">
          {/* Header */}
          <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Pregunta {currentQuestion + 1} de {questions.length}</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">Código: <span className="font-mono text-blue-600 dark:text-blue-400">{sessionCode}</span></p>
                </div>
                <button
                  onClick={handleEndSession}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                  Terminar
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Question Display */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-8">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                    {questions[currentQuestion].text}
                  </h2>

                  {/* Options */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {questions[currentQuestion].options.map((option, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          idx === questions[currentQuestion].correct
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                            : 'border-slate-300 dark:border-slate-700 hover:border-slate-400'
                        }`}
                      >
                        <p className="text-center font-medium text-slate-900 dark:text-white">{option}</p>
                      </div>
                    ))}
                  </div>

                  {/* Answer Count */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <p className="text-center">
                      <span className="font-bold text-blue-900 dark:text-blue-100">{students.filter(s => s.answered).length}</span>
                      <span className="text-blue-700 dark:text-blue-300"> de {students.length} estudiantes han respondido</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Leaderboard */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 sticky top-24">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Tabla de Puntajes</h3>
                  <div className="space-y-2">
                    {students.sort((a, b) => b.score - a.score).map((student, idx) => (
                      <div key={student.id} className="flex items-center justify-between px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-600 dark:text-slate-400 w-5 text-center">#{idx + 1}</span>
                          <span className="text-sm text-slate-900 dark:text-white">{student.name}</span>
                        </div>
                        <span className="font-bold text-slate-900 dark:text-white">{student.score}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 sticky bottom-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <SkipBack className="w-5 h-5" />
                  Anterior
                </button>

                <div className="flex-1 max-w-xs bg-slate-100 dark:bg-slate-800 rounded-lg p-2">
                  <div className="w-full bg-slate-300 dark:bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <button
                  onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
                  disabled={currentQuestion === questions.length - 1}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Siguiente
                  <SkipForward className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
