import { NextResponse, type NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Get both possible cookie names
  const token =
    req.cookies.get("next-auth.session-token")?.value ||
    req.cookies.get("__Secure-next-auth.session-token")?.value;

  const isPublicPath = path === "/login";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/blog/create"],
};






// import { getToken } from "next-auth/jwt";
// import {type NextRequest, NextResponse } from "next/server";
// export async function middleware(req :NextRequest) {
//   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

//   if (!token) {
//     return NextResponse.redirect(new URL("/login"));
//   }
// }

// export const config = {
//   matcher: ["/", "/login"],
// };

// import { getToken } from 'next-auth/jwt';
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export async function middleware(req: NextRequest) {
//    const token = await getToken({ req , secret: process.env.NEXTAUTH_SECRET });

//   const isAuth = !!token;
//   const isLoginPage = req.nextUrl.pathname === '/login';

//   if (!isAuth && !isLoginPage) {
//     return NextResponse.redirect(new URL('/login', req.url));
//   }

//   if (isAuth && isLoginPage) {
//     return NextResponse.redirect(new URL('/', req.url));
//   }

//   return NextResponse.next();
// }

// // Match all routes
// export const config = {
//   matcher: ['/', '/dashboard/:path*', '/login'],
// };



// import { NextRequest, NextResponse } from 'next/server';

//         export async function middleware(req: NextRequest ) {

//             const isAuthenticated =  req.cookies.get("next-auth.session-token");
//             console.log(isAuthenticated)

//             if (!isAuthenticated && req.nextUrl.pathname.startsWith('/')) {
//                 return NextResponse.redirect(new URL('/login', req.url));
//             }

//             return NextResponse.next();
//         }

//         export const config = {
//             matcher: ['/', "/login"], // Protect all routes under /protected
//         };