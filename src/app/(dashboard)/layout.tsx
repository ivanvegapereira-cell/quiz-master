import { Navbar } from '@/components/layout/Navbar'
import { Sidebar } from '@/components/layout/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // TODO: Implement protected route & get user info from Supabase
  const userName = 'Docente' // Placeholder

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar userName={userName} />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
