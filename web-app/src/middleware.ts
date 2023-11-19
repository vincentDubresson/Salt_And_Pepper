import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decodeCurrentUserCookie } from './app/_lib/_cookie/CookieActions';

export default async function middleware(req: NextRequest) {
  const currentUser = await decodeCurrentUserCookie();

  const isTokenExpired =
    currentUser && new Date() > new Date(currentUser.expiredAt as string);

  if (!currentUser && req.nextUrl.pathname.startsWith('/connexion')) {
    return;
  }

  if (!isTokenExpired && req.nextUrl.pathname.startsWith('/connexion')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (!currentUser || isTokenExpired) {
    return NextResponse.redirect(new URL('/connexion', req.url));
  }
}

// Supports both a single string value or an array of matchers
export const config = {
  matcher: ['/mon-compte', '/connexion'],
};
