'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Moon, Sun, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'

interface NavbarProps {
  userName?: string
  onLogout?: () => void
}

export function Navbar({ userName, onLogout }: NavbarProps) {
  const { theme, setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl text-slate-900 dark:text-white">
            <div className="w-8 h-8 bg-primary-600 rounded-lg" />
            <span className="hidden sm:inline">QuizMaster</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {userName && (
              <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-700">
                <span className="text-sm text-slate-600 dark:text-slate-400">{userName}</span>
                <button
                  onClick={onLogout}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                  aria-label="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <button
              onClick={toggleTheme}
              className="w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-2"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              {theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}
            </button>
            {userName && (
              <button
                onClick={onLogout}
                className="w-full text-left px-4 py-2 hover:bg-danger-50 dark:hover:bg-danger-900/20 text-danger-600 dark:text-danger-400 rounded-lg transition-colors flex items-center gap-2"
              >
                <LogOut className="w-5 h-5" />
                Cerrar Sesión
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
