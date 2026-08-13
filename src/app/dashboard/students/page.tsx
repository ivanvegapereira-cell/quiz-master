'use client'

import { useState } from 'react'
import { Users, Plus, Trash2, Edit2, Search } from 'lucide-react'

export default function StudentsPage() {
  const [students, setStudents] = useState([
    { id: 1, name: 'Juan Pérez', email: 'juan@school.cl', group: 'Grupo A', joined: '2026-08-01' },
    { id: 2, name: 'María González', email: 'maria@school.cl', group: 'Grupo B', joined: '2026-08-02' },
    { id: 3, name: 'Carlos López', email: 'carlos@school.cl', group: 'Grupo A', joined: '2026-08-03' },
  ])

  const [showForm, setShowForm] = useState(false)
  const [search, setSearch] = useState('')

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Estudiantes</h1>
              <p className="text-slate-600 dark:text-slate-400 mt-2">Gestiona tus estudiantes y grupos</p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Agregar Estudiante
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar estudiante..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Add Form */}
        {showForm && (
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">Nuevo Estudiante</h2>
            <form className="space-y-4">
              <input type="text" placeholder="Nombre" className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
              <input type="email" placeholder="Email" className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
              <select className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
                <option>Seleccionar Grupo</option>
                <option>Grupo A</option>
                <option>Grupo B</option>
              </select>
              <div className="flex gap-2">
                <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Agregar</button>
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg hover:bg-slate-300">Cancelar</button>
              </div>
            </form>
          </div>
        )}

        {/* Table */}
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">Nombre</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">Grupo</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">Unido</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 text-slate-900 dark:text-white">{student.name}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{student.email}</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded text-sm">{student.group}</span></td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400 text-sm">{student.joined}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"><Edit2 className="w-4 h-4" /></button>
                    <button className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
