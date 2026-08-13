'use client'

import { useState } from 'react'
import { Zap, Loader, Copy, CheckCircle } from 'lucide-react'

export default function AIAssistantPage() {
  const [subject, setSubject] = useState('')
  const [level, setLevel] = useState('intermediate')
  const [topic, setTopic] = useState('')
  const [numQuestions, setNumQuestions] = useState('5')
  const [loading, setLoading] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [copied, setCopied] = useState(false)

  const generateQuestions = async () => {
    setLoading(true)
    // Simulated API call
    setTimeout(() => {
      setLoading(false)
      setGenerated(true)
    }, 2000)
  }

  const copyToClipboard = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-8 h-8 text-amber-500" />
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Asistente IA</h1>
          </div>
          <p className="text-slate-600 dark:text-slate-400">Genera preguntas automáticamente con Claude</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-8">
          <div className="space-y-6">
            {/* Subject */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">Materia</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Ej: Matemática, Historia, Inglés"
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Level */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">Nivel</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="elementary">Básico</option>
                <option value="intermediate">Intermedio</option>
                <option value="advanced">Avanzado</option>
              </select>
            </div>

            {/* Topic */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">Tema</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Ej: Fracciones, Revolución Francesa, Present Perfect"
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Number of Questions */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">Número de preguntas</label>
              <input
                type="number"
                value={numQuestions}
                onChange={(e) => setNumQuestions(e.target.value)}
                min="1"
                max="20"
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={generateQuestions}
              disabled={loading || !subject || !topic || !numQuestions}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Generando preguntas...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  Generar Preguntas
                </>
              )}
            </button>
          </div>

          {/* Generated Preview */}
          {generated && (
            <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Preguntas Generadas</h2>
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 mb-4">
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                  Se han generado {numQuestions} preguntas sobre {topic} para nivel {level === 'elementary' ? 'básico' : level === 'intermediate' ? 'intermedio' : 'avanzado'}.
                </p>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      ¡Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      Copiar al portapapeles
                    </>
                  )}
                </button>
              </div>
              <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Agregar al Quiz
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
