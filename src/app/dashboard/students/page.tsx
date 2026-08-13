'use client'

import { useState } from 'react'
import { Users, Plus, Trash2, Edit2, Search, Upload, Download, Eye, EyeOff } from 'lucide-react'

interface Student {
  id: number
  name: string
  email: string
  password: string
  group: string
  joined: string
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: 'Juan Pérez', email: 'juan@school.cl', password: 'Pwd123456!', group: 'Grupo A', joined: '2026-08-01' },
    { id: 2, name: 'María González', email: 'maria@school.cl', password: 'Pwd234567!', group: 'Grupo B', joined: '2026-08-02' },
  ])

  const [showForm, setShowForm] = useState(false)
  const [showBulkImport, setShowBulkImport] = useState(false)
  const [search, setSearch] = useState('')
  const [bulkText, setBulkText] = useState('')
  const [showPasswords, setShowPasswords] = useState<number[]>([])
  const [csvTemplate, setCsvTemplate] = useState(false)

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  )

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$'
    let password = ''
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return password
  }

  const handleBulkImport = () => {
    const lines = bulkText.split('\n').filter(line => line.trim())
    const newStudents: Student[] = []

    lines.forEach((line, index) => {
      const [name, email] = line.split(',').map(s => s.trim())
      if (name && email) {
        newStudents.push({
          id: Math.max(...students.map(s => s.id), 0) + index + 1,
          name,
          email,
          password: generatePassword(),
          group: 'Grupo A',
          joined: new Date().toISOString().split('T')[0],
        })
      }
    })

    setStudents([...students, ...newStudents])
    setBulkText('')
    setShowBulkImport(false)
  }

  const downloadCredentials = () => {
    let csv = 'Nombre,Correo,Contraseña\n'
    students.forEach(student => {
      csv += `"${student.name}","${student.email}","${student.password}"\n`
    })

    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv))
    element.setAttribute('download', 'credenciales_estudiantes.csv')
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const downloadTemplate = () => {
    const template = `Nombre,Correo
Juan Pérez,juan@school.cl
María González,maria@school.cl
Carlos López,carlos@school.cl`

    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(template))
    element.setAttribute('download', 'plantilla_estudiantes.csv')
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Estudiantes</h1>
              <p className="text-slate-600 dark:text-slate-400 mt-2">Gestiona tus estudiantes y grupos</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowBulkImport(!showBulkImport)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Upload className="w-5 h-5" />
                Importar Masivo
              </button>
              <button
                onClick={() => setShowForm(!showForm)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Agregar
              </button>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 text-sm text-blue-700 dark:text-blue-300">
            💡 Total: <strong>{students.length}</strong> estudiantes registrados
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Bulk Import Form */}
        {showBulkImport && (
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">Importar Estudiantes Masivamente</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Formato: Nombre, Correo (uno por línea)</label>
                <textarea
                  value={bulkText}
                  onChange={(e) => setBulkText(e.target.value)}
                  placeholder="Juan Pérez, juan@school.cl&#10;María González, maria@school.cl"
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm h-40"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleBulkImport}
                  disabled={!bulkText.trim()}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Importar ({bulkText.split('\n').filter(l => l.trim()).length} estudiantes)
                </button>
                <button
                  onClick={downloadTemplate}
                  className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg hover:bg-slate-300"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowBulkImport(false)}
                  className="flex-1 px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg hover:bg-slate-300"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

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

        {/* Download Credentials */}
        {students.length > 0 && (
          <div className="mb-8">
            <button
              onClick={downloadCredentials}
              className="flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700"
            >
              <Download className="w-5 h-5" />
              Descargar Credenciales (CSV)
            </button>
          </div>
        )}

        {/* Table */}
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">Nombre</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">Correo</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">Contraseña</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">Grupo</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 text-slate-900 dark:text-white font-medium">{student.name}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400 text-sm">{student.email}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <code className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-sm rounded font-mono">
                        {showPasswords.includes(student.id) ? student.password : '••••••••'}
                      </code>
                      <button
                        onClick={() => {
                          if (showPasswords.includes(student.id)) {
                            setShowPasswords(showPasswords.filter(id => id !== student.id))
                          } else {
                            setShowPasswords([...showPasswords, student.id])
                          }
                        }}
                        className="p-1 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        {showPasswords.includes(student.id) ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4"><span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded text-sm">{student.group}</span></td>
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
