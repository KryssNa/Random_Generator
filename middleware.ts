import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /verify, /verify/qrcode)
  const path = request.nextUrl.pathname;

  // Allow the following paths
  if (
    path === '/' || // Home page
    path.startsWith('/verify/qrcode') || // Verification page
    path.startsWith('/api/') || // API routes
    path.startsWith('/_next/') || // Next.js assets
    path.startsWith('/static/') || // Static files
    path.includes('.') // Files with extensions (e.g. favicon.ico)
  ) {
    return NextResponse.next();
  }

  // Redirect all other paths to home page
  return NextResponse.redirect(new URL('/', request.url));
}