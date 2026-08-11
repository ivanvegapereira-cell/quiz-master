'use client'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Brain, Loader, Check, AlertCircle } from 'lucide-react'
import { useState } from 'react'

interface Question {
  text: string
  type: 'multiple_choice' | 'true_false'
  options: { text: string; isCorrect: boolean }[]
  difficulty: 'easy' | 'medium' | 'hard'
  points: number
}

export default function AIAssistantPage() {
  const [formData, setFormData] = useState({
    subject: 'Matemática',
    level: 'Básico',
    numberOfQuestions: 5,
    topic: 'Geometría',
  })

  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleGenerate = async () => {
    setLoading(true)
    setError('')
    setQuestions([])

    try {
      const response = await fetch('/api/ai/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: formData.subject,
          level: formData.level,
          numberOfQuestions: parseInt(formData.numberOfQuestions),
          topic: formData.topic,
        }),
      })

      const data = await response.json()

      if (!data.success) {
        setError(data.error || 'Error al generar preguntas')
        return
      }

      setQuestions(data.data)
    } catch (err) {
      setError('Error al conectar con el asistente IA')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
          <Brain className="w-8 h-8 text-primary-600" />
          Asistente IA
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Genera preguntas automáticamente con inteligencia artificial
        </p>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Configurar Generador</h2>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Materia/Asignatura</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="input-field"
                placeholder="Ej: Matemática"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Nivel Académico</label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="input-field"
              >
                <option value="Básico">Básico (4to-6to grado)</option>
                <option value="Medio">Medio (7mo-8vo grado)</option>
                <option value="Avanzado">Avanzado (9no-12mo grado)</option>
                <option value="Superior">Superior/Universitario</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Tema Específico</label>
              <input
                type="text"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                className="input-field"
                placeholder="Ej: Geometría, Verbos, Revolución Francesa"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Número de Preguntas (1-20)
              </label>
              <input
                type="number"
                name="numberOfQuestions"
                value={formData.numberOfQuestions}
                onChange={handleChange}
                min="1"
                max="20"
                className="input-field"
              />
            </div>
          </div>

          {error && (
            <div className="p-4 bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800 rounded-lg flex gap-3">
              <AlertCircle className="w-5 h-5 text-danger-600 flex-shrink-0 mt-0.5" />
              <p className="text-danger-700 dark:text-danger-300">{error}</p>
            </div>
          )}

          <Button
            variant="primary"
            onClick={handleGenerate}
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Generando preguntas...
              </>
            ) : (
              <>
                <Brain className="w-4 h-4" />
                Generar Preguntas
              </>
            )}
          </Button>
        </CardBody>
      </Card>

      {/* Generated Questions */}
      {questions.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Check className="w-5 h-5 text-success-600" />
            <p className="text-sm font-medium text-success-600">
              {questions.length} preguntas generadas exitosamente
            </p>
          </div>

          {questions.map((question, idx) => (
            <Card key={idx}>
              <CardBody className="space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900 dark:text-white mb-2">
                      {idx + 1}. {question.text}
                    </p>
                    <div className="flex gap-2 mb-4">
                      <span className="badge badge-warning">
                        {question.type === 'multiple_choice'
                          ? 'Múltiple opción'
                          : 'Verdadero/Falso'}
                      </span>
                      <span
                        className={`badge ${
                          question.difficulty === 'easy'
                            ? 'badge-success'
                            : question.difficulty === 'medium'
                            ? 'badge-warning'
                            : 'badge-danger'
                        }`}
                      >
                        {question.difficulty === 'easy'
                          ? 'Fácil'
                          : question.difficulty === 'medium'
                          ? 'Medio'
                          : 'Difícil'}
                      </span>
                      <span className="badge bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
                        {question.points} pts
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Opciones:
                  </p>
                  <div className="space-y-2">
                    {question.options.map((option, optIdx) => (
                      <div
                        key={optIdx}
                        className={`p-3 rounded-lg border-2 ${
                          option.isCorrect
                            ? 'border-success-500 bg-success-50 dark:bg-success-900/20'
                            : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'
                        }`}
                      >
                        <p
                          className={`text-sm ${
                            option.isCorrect
                              ? 'text-success-700 dark:text-success-300 font-semibold'
                              : 'text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {String.fromCharCode(65 + optIdx)}) {option.text}
                          {option.isCorrect && ' ✓'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}

          <div className="flex gap-3 pt-4">
            <Button variant="primary" className="flex-1">
              Agregar todas al Quiz
            </Button>
            <Button variant="secondary" onClick={() => setQuestions([])}>
              Generar más
            </Button>
          </div>
        </div>
      )}

      {/* Tips */}
      <Card className="bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800">
        <CardBody>
          <h3 className="font-semibold text-primary-900 dark:text-primary-100 mb-3">
            💡 Consejos para Mejores Resultados
          </h3>
          <ul className="space-y-2 text-sm text-primary-800 dark:text-primary-200">
            <li>• Sé específico con el tema - "Revolución Francesa" es mejor que "Historia"</li>
            <li>• Elige el nivel correcto - afecta la complejidad de las preguntas</li>
            <li>• Puedes revisar y editar las preguntas antes de agregarlas</li>
            <li>• Mezcla dificultades para una experiencia más equilibrada</li>
          </ul>
        </CardBody>
      </Card>
    </div>
  )
}
