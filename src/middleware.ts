import { NextResponse, type NextRequest } from 'next/server'

const protectedRoutes = ['/dashboard', '/quiz', '/students', '/rewards', '/ai-assistant', '/reports', '/settings']
const authRoutes = ['/auth/login', '/auth/signup']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check for Supabase session cookie
  const supabaseSession = request.cookies.get('sb-mjpaqdtuawygodyiblni-auth-token')?.value

  // Rutas protegidas
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!supabaseSession) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }

  // Rutas de auth - redirigir a dashboard si ya tiene sesión
  if (authRoutes.some(route => pathname.startsWith(route))) {
    if (supabaseSession) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api).*)',
  ],
}
