import { NextResponse, type NextRequest } from 'next/server'

const protectedRoutes = ['/dashboard', '/quiz', '/students', '/rewards', '/ai-assistant', '/reports', '/settings']
const authRoutes = ['/auth/login', '/auth/signup']

export async function middleware(request: NextRequest) {
  // Middleware temporarily disabled for debugging
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api).*)',
  ],
}
