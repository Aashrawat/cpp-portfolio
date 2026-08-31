import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/controllers/settingsController";
import { toPublicUser } from "@/lib/userUtils";

export async function GET() {
  try {
    const user = await getAuthenticatedUser();

    if (!user) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({ user: toPublicUser(user) });
  } catch {
    return NextResponse.json({ user: null });
  }
}
