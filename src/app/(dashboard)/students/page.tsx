'use client'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Plus, Edit, Trash2, Users } from 'lucide-react'
import { useState } from 'react'

interface Student {
  id: string
  name: string
  group?: string
  totalPoints: number
  redeemed: number
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([
    { id: '1', name: 'Juan Pérez', group: 'Grupo A', totalPoints: 250, redeemed: 50 },
    { id: '2', name: 'María García', group: 'Grupo A', totalPoints: 320, redeemed: 100 },
    { id: '3', name: 'Carlos López', group: 'Grupo B', totalPoints: 180, redeemed: 0 },
  ])

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: '', group: '' })

  const handleAdd = () => {
    if (formData.name.trim()) {
      if (editingId) {
        setStudents(students.map(s => s.id === editingId ? { ...s, ...formData } : s))
        setEditingId(null)
      } else {
        setStudents([...students, { id: Date.now().toString(), ...formData, totalPoints: 0, redeemed: 0 }])
      }
      setFormData({ name: '', group: '' })
      setShowForm(false)
    }
  }

  const handleEdit = (student: Student) => {
    setFormData({ name: student.name, group: student.group || '' })
    setEditingId(student.id)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    setStudents(students.filter(s => s.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Estudiantes
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Gestiona tus estudiantes y grupos
          </p>
        </div>
        <Button variant="primary" onClick={() => { setShowForm(true); setEditingId(null); setFormData({ name: '', group: '' }); }}>
          <Plus className="w-4 h-4" />
          Agregar Estudiante
        </Button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardBody className="space-y-2">
            <p className="text-sm text-slate-600 dark:text-slate-400">Total de Estudiantes</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">{students.length}</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="space-y-2">
            <p className="text-sm text-slate-600 dark:text-slate-400">Puntos Totales</p>
            <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
              {students.reduce((acc, s) => acc + s.totalPoints, 0)}
            </p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="space-y-2">
            <p className="text-sm text-slate-600 dark:text-slate-400">Premios Canjeados</p>
            <p className="text-3xl font-bold text-success-600 dark:text-success-400">
              {students.reduce((acc, s) => acc + s.redeemed, 0)}
            </p>
          </CardBody>
        </Card>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold">
              {editingId ? 'Editar Estudiante' : 'Agregar Nuevo Estudiante'}
            </h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nombre</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input-field"
                placeholder="Nombre completo"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Grupo (Opcional)</label>
              <input
                type="text"
                value={formData.group}
                onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                className="input-field"
                placeholder="Ej: Grupo A"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="primary" onClick={handleAdd}>
                {editingId ? 'Actualizar' : 'Agregar'}
              </Button>
              <Button variant="secondary" onClick={() => { setShowForm(false); setEditingId(null); }}>
                Cancelar
              </Button>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Students Table */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Users className="w-5 h-5" />
            Lista de Estudiantes
          </h2>
        </CardHeader>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th className="text-left py-3 px-4 font-semibold">Nombre</th>
                  <th className="text-left py-3 px-4 font-semibold">Grupo</th>
                  <th className="text-right py-3 px-4 font-semibold">Puntos</th>
                  <th className="text-right py-3 px-4 font-semibold">Canjeados</th>
                  <th className="text-center py-3 px-4 font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="py-3 px-4">{student.name}</td>
                    <td className="py-3 px-4">
                      <span className="badge badge-success">{student.group || 'Individual'}</span>
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-primary-600 dark:text-primary-400">
                      {student.totalPoints}
                    </td>
                    <td className="py-3 px-4 text-right text-success-600 dark:text-success-400">
                      {student.redeemed}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(student)}
                          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
                        >
                          <Edit className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                        </button>
                        <button
                          onClick={() => handleDelete(student.id)}
                          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-danger-600 dark:text-danger-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
