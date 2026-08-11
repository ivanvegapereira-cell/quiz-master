import Link from 'next/link'
import { ArrowRight, Zap, Users, Trophy, Brain } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 dark:from-slate-900 dark:to-slate-800">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl text-slate-900 dark:text-white">QuizMaster</span>
          </div>
          <div className="flex gap-4">
            <Link
              href="/auth/login"
              className="px-4 py-2 text-primary-600 dark:text-primary-400 font-medium hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
            >
              Ingresar
            </Link>
            <Link
              href="/auth/signup"
              className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Crear Cuenta
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 text-center">
        <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
          Gamificación Educativa
          <span className="block text-primary-600 dark:text-primary-400">Hecha Simple</span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
          Crea actividades competitivas en tiempo real, gestiona puntuaciones y premios, y motiva a tus estudiantes con un asistente de IA inteligente.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/auth/signup"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Comenzar Gratis
            <ArrowRight className="w-5 h-5" />
          </Link>
          <button className="px-6 py-3 border-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg font-semibold hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors">
            Ver Demo
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="card p-6 hover:shadow-md transition-shadow">
            <Zap className="w-12 h-12 text-primary-600 mb-4" />
            <h3 className="text-lg font-bold mb-2">Tiempo Real</h3>
            <p className="text-slate-600 dark:text-slate-400">Competencias en vivo con sincronización instantánea</p>
          </div>
          <div className="card p-6 hover:shadow-md transition-shadow">
            <Users className="w-12 h-12 text-primary-600 mb-4" />
            <h3 className="text-lg font-bold mb-2">Flexible</h3>
            <p className="text-slate-600 dark:text-slate-400">Individual o grupos, configurable según necesites</p>
          </div>
          <div className="card p-6 hover:shadow-md transition-shadow">
            <Trophy className="w-12 h-12 text-primary-600 mb-4" />
            <h3 className="text-lg font-bold mb-2">Premios</h3>
            <p className="text-slate-600 dark:text-slate-400">Sistema de puntos canjeables por recompensas</p>
          </div>
          <div className="card p-6 hover:shadow-md transition-shadow">
            <Brain className="w-12 h-12 text-primary-600 mb-4" />
            <h3 className="text-lg font-bold mb-2">IA Inteligente</h3>
            <p className="text-slate-600 dark:text-slate-400">Genera preguntas y guías personalizadas automáticamente</p>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="card p-12 bg-gradient-to-r from-primary-600 to-primary-700 border-0">
          <h2 className="text-3xl font-bold text-white mb-4">¿Listo para transformar tus clases?</h2>
          <p className="text-primary-100 mb-6">Únete a educadores que ya están gamificando el aprendizaje</p>
          <Link
            href="/auth/signup"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
          >
            Crear Cuenta Gratuita
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-600 dark:text-slate-400">
          <p>&copy; 2024 QuizMaster. Hecho para educadores por educadores.</p>
        </div>
      </footer>
    </main>
  )
}
