import { signToken, verifyToken } from "@/app/lib/Auth";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { refreshToken } = await request.json();

    if (!refreshToken) {
        return NextResponse.json({ error: "No refresh token" }, { status: 401 });
    }

    const payload = await verifyToken(refreshToken);
    if (!payload) {
        return NextResponse.json({ error: "Invalid refresh token" }, { status: 401 });
    }

    // Issue new access token
    const newToken = await signToken({ email: payload.email, role: payload.role });
    const res = NextResponse.json({ message: 'Token refreshed' });

    res.cookies.set('token', newToken, {
        httpOnly: true,
        maxAge: 60 * 60, // 1 hour
        path: '/'
    });

    return res;
}