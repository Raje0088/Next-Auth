import { NextResponse } from "next/server";
import { verifyToken } from "./app/lib/auth";

export async function middleware(req) {
    const token = req.cookies.get('token')?.value; //
    const user = token ? await verifyToken(token) : null; //
    console.log(user); //

    if (!user) {
        return NextResponse.redirect(new URL("/login", req.url)); //
    }

    return NextResponse.next(); //
}

export const config = {
    matcher: ["/dashboard/:path*"], //
};