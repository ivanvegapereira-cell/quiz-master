import { NextResponse, type NextRequest } from 'next/server'

const protectedRoutes = ['/dashboard', '/quiz', '/students', '/rewards', '/ai-assistant', '/reports', '/settings']
const authRoutes = ['/auth/login', '/auth/signup', '/auth/forgot-password']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('auth-token')?.value

  // Rutas protegidas
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }

  // Rutas de auth - redirigir a dashboard si ya tiene token
  if (authRoutes.some(route => pathname.startsWith(route))) {
    if (token) {
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
