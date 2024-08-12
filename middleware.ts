import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import type { NextRequest } from 'next/server'
 
export default NextAuth(authConfig).auth;
 
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
 //matcher option from Middleware to specify that it should run on specific paths.
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

export function middleware(request: NextRequest) {
    const currentUser = request.cookies.get('currentUser')?.value
   
    if (currentUser && !request.nextUrl.pathname.startsWith('/todo')) {
      return Response.redirect(new URL('/todo', request.url))
    }
   
    if (!currentUser && !request.nextUrl.pathname.startsWith('/login')) {
      return Response.redirect(new URL('/login', request.url))
    }
  }
   
