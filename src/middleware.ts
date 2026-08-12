import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(_: NextRequest) {
  // Middleware temporarily disabled for debugging
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api).*)',
  ],
}
