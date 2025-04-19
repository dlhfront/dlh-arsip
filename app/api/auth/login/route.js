import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "../../../lib/prisma";
import { serialize } from "cookie";
import { sign } from "jsonwebtoken";

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    // Use findFirst instead of findUnique as fallback
    const user = await prisma.user.findFirst({
      where: {
        username: username.trim(),
      },
    });

    const authError = "Invalid username or password";
    if (!user) {
      return NextResponse.json({ error: authError }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password.trim(), user.password);
    if (!isValid) {
      return NextResponse.json({ error: authError }, { status: 401 });
    }

    const token = sign(
      {
        id: user.id,
        role: user.role,
        username: user.username
      },
      process.env.JWT_SECRET,
      { expiresIn: "4h" }
    );

    const cookie = serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 4 * 60 * 60,
    });

    const { password: _, ...safeUserData } = user;

    return NextResponse.json(safeUserData, {
      headers: { "Set-Cookie": cookie },
    });

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}