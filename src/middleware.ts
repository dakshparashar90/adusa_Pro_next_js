console.log("MIDDLEWARE LOADED");
import NextAuth from "next-auth"
import { authConfig } from "../auth.config"  //  Edge safe

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  
  const isLoggedIn = !!req.auth
  
  const isProtected = req.nextUrl.pathname.startsWith("/dashboard")
  const isAuthPage = req.nextUrl.pathname.startsWith("/auth")

  if (isProtected && !isLoggedIn) {
    return Response.redirect(new URL("/auth/register", req.url))
  }
  if (isAuthPage && isLoggedIn) {
    return Response.redirect(new URL("/dashboard", req.url))
  }
})

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"]
}

