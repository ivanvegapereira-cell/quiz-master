'use client'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Trophy, Plus, Edit, Trash2 } from 'lucide-react'
import { useState } from 'react'

interface Reward {
  id: string
  name: string
  description: string
  points: number
  redeemed: number
}

export default function RewardsPage() {
  const [rewards, setRewards] = useState<Reward[]>([
    { id: '1', name: '5 minutos de descanso', description: 'Pausa sin actividades', points: 50, redeemed: 12 },
    { id: '2', name: 'Anotación positiva', description: 'Nota en el libro de clase', points: 30, redeemed: 8 },
    { id: '3', name: 'Elegir canción para clase', description: 'Elige qué canción suena', points: 40, redeemed: 5 },
    { id: '4', name: 'Día sin tarea', description: 'Exención de tareas por un día', points: 100, redeemed: 3 },
  ])

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: '', description: '', points: 50 })

  const handleAdd = () => {
    if (formData.name.trim()) {
      if (editingId) {
        setRewards(rewards.map(r => r.id === editingId ? { ...r, ...formData } : r))
        setEditingId(null)
      } else {
        setRewards([...rewards, { id: Date.now().toString(), ...formData, redeemed: 0 }])
      }
      setFormData({ name: '', description: '', points: 50 })
      setShowForm(false)
    }
  }

  const handleEdit = (reward: Reward) => {
    setFormData({ name: reward.name, description: reward.description, points: reward.points })
    setEditingId(reward.id)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    setRewards(rewards.filter(r => r.id !== id))
  }

  const totalRedeemed = rewards.reduce((acc, r) => acc + r.redeemed, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
            <Trophy className="w-8 h-8 text-yellow-500" />
            Premios
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Gestiona los premios canjeables por puntos
          </p>
        </div>
        <Button variant="primary" onClick={() => { setShowForm(true); setEditingId(null); setFormData({ name: '', description: '', points: 50 }); }}>
          <Plus className="w-4 h-4" />
          Crear Premio
        </Button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardBody className="space-y-2">
            <p className="text-sm text-slate-600 dark:text-slate-400">Premios Disponibles</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">{rewards.length}</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="space-y-2">
            <p className="text-sm text-slate-600 dark:text-slate-400">Total Canjeados</p>
            <p className="text-3xl font-bold text-success-600 dark:text-success-400">{totalRedeemed}</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="space-y-2">
            <p className="text-sm text-slate-600 dark:text-slate-400">Puntos Invertidos</p>
            <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
              {rewards.reduce((acc, r) => acc + (r.points * r.redeemed), 0)}
            </p>
          </CardBody>
        </Card>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold">
              {editingId ? 'Editar Premio' : 'Crear Nuevo Premio'}
            </h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nombre del Premio</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input-field"
                placeholder="Ej: 5 minutos de descanso"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Descripción</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="input-field"
                placeholder="Describe qué es este premio"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Puntos Requeridos</label>
              <input
                type="number"
                value={formData.points}
                onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) })}
                className="input-field"
                min="10"
                step="10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="primary" onClick={handleAdd}>
                {editingId ? 'Actualizar' : 'Crear'}
              </Button>
              <Button variant="secondary" onClick={() => { setShowForm(false); setEditingId(null); }}>
                Cancelar
              </Button>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Rewards Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {rewards.map((reward) => (
          <Card key={reward.id} className="hover:shadow-md transition-shadow">
            <CardBody className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {reward.name}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {reward.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(reward)}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
                  >
                    <Edit className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  </button>
                  <button
                    onClick={() => handleDelete(reward.id)}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-danger-600 dark:text-danger-400" />
                  </button>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Costo</p>
                <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {reward.points} pts
                </p>
              </div>

              <div className="bg-success-50 dark:bg-success-900/20 p-3 rounded-lg">
                <p className="text-sm text-success-700 dark:text-success-300">
                  Canjeado {reward.redeemed} vece{reward.redeemed !== 1 ? 's' : ''}
                </p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Tips */}
      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <CardBody>
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
            💡 Consejos para Premios Efectivos
          </h3>
          <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
            <li>• Mezcla premios pequeños y grandes para diferentes estudiantes</li>
            <li>• Premios simples pero significativos funcionan mejor</li>
            <li>• Considera puntos de "inflación" si muchos canjean premios</li>
            <li>• Actualiza premios según feedback de estudiantes</li>
          </ul>
        </CardBody>
      </Card>
    </div>
  )
}
