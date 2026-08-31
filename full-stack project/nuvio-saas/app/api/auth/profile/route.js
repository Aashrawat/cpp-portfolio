import { updateProfile } from "@/controllers/settingsController";
import { settingsError, settingsJson } from "@/lib/settingsResponse";

export async function PATCH(request) {
  try {
    const body = await request.json();
    const result = await updateProfile(body);
    return settingsJson(result);
  } catch (error) {
    return settingsError(error);
  }
}
