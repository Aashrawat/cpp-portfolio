import { NextResponse } from "next/server";

function applyAuthCookie(response, token) {
  if (!token) return response;
  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}

function clearAuthCookie(response) {
  response.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}

export function settingsJson(result) {
  const response = NextResponse.json(
    { message: result.message, user: result.user || null },
    { status: result.status }
  );

  if (result.clearCookie) {
    return clearAuthCookie(response);
  }

  if (result.token) {
    return applyAuthCookie(response, result.token);
  }

  return response;
}

export function settingsError(error) {
  console.error("Settings error:", error);

  if (
    error.message?.includes("ECONNREFUSED") ||
    error.message?.includes("querySrv")
  ) {
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
