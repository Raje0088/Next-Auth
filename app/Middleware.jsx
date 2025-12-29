// import { NextResponse } from "next/server";
// import { verifyToken } from "./app/lib/auth";

// export async function middleware(req) {
//     const token = req.cookies.get('token')?.value; //
//     const user = token ? await verifyToken(token) : null; //
//     console.log(user); //

//     if (!user) {
//         return NextResponse.redirect(new URL("/login", req.url)); //
//     }

//     return NextResponse.next(); //
// }

// export const config = {
//     matcher: ["/dashboard/:path*"], //
// };



import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode("abcde");   // SAME KEY AS signToken

export async function middleware( NextRequest) {
  const token = req.cookies.get("token")?.value;

  // If no token → redirect
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // Verify token (throws if invalid/expired)
    await jwtVerify(token, secret);

    // Token valid → continue
    return NextResponse.next();
  } catch (err) {
    // Invalid / expired → redirect
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",   // protect dashboard
    // OR replace with this if you want products instead:
    // "/products/:path*",
  ],
};
