import Link from 'next/link'
import { Zap } from 'lucide-react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 dark:from-slate-900 dark:to-slate-800 flex flex-col">
      <div className="absolute top-0 left-0 right-0 p-4">
        <Link href="/" className="inline-flex items-center gap-2">
          <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl text-slate-900 dark:text-white">QuizMaster</span>
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-4">
        {children}
      </div>

      <footer className="text-center text-sm text-slate-600 dark:text-slate-400 py-6">
        <p>&copy; 2024 QuizMaster. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}
