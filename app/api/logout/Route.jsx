import { NextResponse } from "next/server";

export function POST(request) {
    const res = NextResponse.json({ "message": "Logged out" });

    res.cookies.set('token', '', {
        maxAge: 0
    });

    return res;
}