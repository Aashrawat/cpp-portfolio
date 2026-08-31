import { getAuthenticatedUser } from "@/controllers/settingsController";
import { settingsError } from "@/lib/settingsResponse";
import { NextResponse } from "next/server";
import { toPublicUser } from "@/lib/userUtils";

export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    return NextResponse.json({ user: toPublicUser(user) });
  } catch (error) {
    return settingsError(error);
  }
}
