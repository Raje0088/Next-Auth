import { signToken } from "@/app/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { email, password } = await request.json();

    // Checks for specific hardcoded credentials
    if (email !== "abc@gmail.com" && password !== "abc123456") {
        return NextResponse.json({ error: "Invalid Credentials" }, { status: 401 });
    }

    const token = await signToken({ email, role: 'user' });
    const res = NextResponse.json({ message: 'Login Successful' });

    // Sets the JWT token in an httpOnly cookie for security
    res.cookies.set('token', token, {
        httpOnly: true,
        maxAge: 60 * 60, // 1 hour
        path: '/'
    });

    return res;
}