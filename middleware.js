import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { signToken, verifyToken } from "./app/lib/Auth";

const secret = new TextEncoder().encode("abcde");

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  if (!token) {
    if (!refreshToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    // Try to refresh
    const payload = await verifyToken(refreshToken);
    if (!payload) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    // Generate new token
    const newToken = await signToken({
      email: payload.email,
      role: payload.role,
    });
    const res = NextResponse.next();
    res.cookies.set("token", newToken, {
      httpOnly: true,
      maxAge: 60 * 60,
      path: "/",
    });
    return res;
  }

  try {
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch (err) {
    // Token expired, try refresh
    if (!refreshToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    const payload = await verifyToken(refreshToken);
    if (!payload) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    // Generate new token
    const newToken = await signToken({
      email: payload.email,
      role: payload.role,
    });
    const res = NextResponse.next();
    res.cookies.set("token", newToken, {
      httpOnly: true,
      maxAge: 60 * 60,
      path: "/",
    });
    return res;
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/products/:path*"],
};
