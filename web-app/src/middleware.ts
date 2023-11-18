import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(req: NextRequest) {
  const currentUser = req.cookies.get('currentUser')?.value;

  const isTokenExpired =
    currentUser && new Date() > new Date(JSON.parse(currentUser)?.expiredAt);
  console.log('isTokenExpired', isTokenExpired);

  if (!currentUser && req.nextUrl.pathname.startsWith('/connexion')) {
    return;
  }

  if (!currentUser || isTokenExpired) {
    return NextResponse.redirect(new URL('/connexion', req.url));
  }
}

// Supports both a single string value or an array of matchers
export const config = {
  matcher: ['/mon-compte', '/mon-compte', '/connexion'],
};
