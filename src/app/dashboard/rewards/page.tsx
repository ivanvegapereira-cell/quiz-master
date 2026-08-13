'use client'

import { useState } from 'react'
import { Plus, Trash2, Edit2, Coins } from 'lucide-react'

interface Reward {
  id: number
  name: string
  description: string
  cost: number
  icon: string
  redeemed: number
}

export default function RewardsPage() {
  const [rewards] = useState<Reward[]>([
    { id: 1, name: 'Descanso 5 min', description: 'Descanso sin tarea', cost: 50, icon: '☕', redeemed: 12 },
    { id: 2, name: 'Salida 10 min antes', description: 'Salida antes del timbre', cost: 100, icon: '🏃', redeemed: 8 },
    { id: 3, name: 'Anotación positiva', description: 'En el libro de clase', cost: 75, icon: '⭐', redeemed: 15 },
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Premios</h1>
              <p className="text-slate-600 dark:text-slate-400 mt-2">Gestiona los incentivos canjeables</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Plus className="w-5 h-5" />
              Nuevo Premio
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rewards.map((reward) => (
            <div key={reward.id} className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="text-4xl">{reward.icon}</div>
                <div className="flex gap-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"><Edit2 className="w-4 h-4" /></button>
                  <button className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{reward.name}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{reward.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-amber-500" />
                  <span className="font-bold text-slate-900 dark:text-white">{reward.cost} pts</span>
                </div>
                <span className="text-sm text-slate-600 dark:text-slate-400">Canjeado: {reward.redeemed}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
