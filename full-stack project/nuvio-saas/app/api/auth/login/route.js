import { NextResponse } from "next/server";
import { loginUser } from "@/controllers/authController";

export async function POST(request) {
  try {
    const body = await request.json();
    const result = await loginUser(body);

    const response = NextResponse.json(
      { message: result.message, user: result.user },
      { status: result.status }
    );

    if (result.token) {
      response.cookies.set("token", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    return response;
  } catch (error) {
    console.error("Login error:", error);

    if (error.message?.includes("ECONNREFUSED") || error.message?.includes("querySrv")) {
      return NextResponse.json(
        { message: "Cannot connect to database. Check your MongoDB connection." },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}