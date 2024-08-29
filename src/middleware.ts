import type { NextRequest } from "next/server";
import { decodeToken } from "./services/jwt-decode/decode";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("sina:x-token")?.value;

  if (currentUser) {
    const decoded = decodeToken(currentUser);
    if(request.nextUrl.pathname.startsWith("/login")){
      if(decoded?.role.startsWith("INTERNAL")){
        return Response.redirect(new URL("/admin", request.url));
      }else{
        return Response.redirect(new URL("/user", request.url));
      }
    }
    if (
      !decoded?.role.startsWith("INTERNAL") &&
      request.nextUrl.pathname.startsWith("/admin")
    ) {
      return Response.redirect(new URL("/user", request.url));
    }

    
  }

  if (
    !currentUser &&
    (request.nextUrl.pathname.startsWith("/admin") ||
      request.nextUrl.pathname.startsWith("/user"))
  ) {
    return Response.redirect(new URL("/login", request.url));
  }

  
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
