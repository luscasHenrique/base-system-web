import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { accessControl } from './lib/accessControl';
import { UserRole } from './types/models/User';

const PUBLIC_ROUTES = ['/login', '/register', '/public-page'];

function getUserRoleFromCookies(request: NextRequest): UserRole | null {
  const role = request.cookies.get('userRole')?.value;
  if (!role) return null;
  if (Object.values(UserRole).includes(role as UserRole)) {
    return role as UserRole;
  }
  return null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_ROUTES.includes(pathname)) {
    const token = request.cookies.get('token')?.value;
    if (token && pathname === '/login') {
      const url = request.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  const token = request.cookies.get('token')?.value;
  const role = getUserRoleFromCookies(request);

  if (!token || !role) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  const allowedRoles = accessControl[pathname];
  if (allowedRoles && !allowedRoles.includes(role)) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|images|api).*)'],
};
