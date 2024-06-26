import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
   const path = request.nextUrl.pathname
//    console.log("path::", path)
   const isPublicPath = path === "/login" || path ==='/signup' || path === '/verifyemail'
   const token = request.cookies.get('token') ?.value || ""
//    console.log("token::", token)

   if(isPublicPath && token){
        return NextResponse.redirect(new URL("/", request.nextUrl))
   }
   if(!isPublicPath && !token){
    return NextResponse.redirect(new URL("/login", request.nextUrl))
   }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/profile',
    '/profile/:profile*',
    '/login',
    '/signup',
    '/verifyemail'
  ],
}