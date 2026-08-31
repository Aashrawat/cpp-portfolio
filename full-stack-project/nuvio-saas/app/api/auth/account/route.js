import { deleteAccount } from "@/controllers/settingsController";
import { settingsError, settingsJson } from "@/lib/settingsResponse";

export async function DELETE(request) {
  try {
    const body = await request.json();
    const result = await deleteAccount(body);
    return settingsJson(result);
  } catch (error) {
    return settingsError(error);
  }
}
