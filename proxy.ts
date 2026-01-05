import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // استثناء الصور وملفات static
  if (
    pathname.startsWith("/uploads") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/")
  ) {
    return NextResponse.next();
  }

  const token =
    request.cookies.get("token")?.value ||
    request.cookies.get("accessToken")?.value;

  // إذا كان المستخدم مسجل دخول ويحاول الوصول لصفحات register أو verify، اسمح له
  // (لأنه قد يكون في منتصف عملية التسجيل)
  if (pathname === "/register" || pathname === "/verify") {
    return NextResponse.next();
  }

  // إذا كان المستخدم مسجل دخول ويحاول الوصول لصفحة login، أعد توجيهه للdashboard
  if (pathname === "/login") {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // حماية صفحة dashboard - تحتاج authentication
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
