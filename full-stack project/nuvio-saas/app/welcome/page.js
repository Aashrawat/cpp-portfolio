import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import { getDisplayName } from "@/lib/userUtils";

export default async function WelcomePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const user = token ? await verifyToken(token) : null;

  if (!user) {
    redirect("/login");
  }

  const displayName = getDisplayName(user);

  return (
    <section className="max-w-lg mx-auto bg-white p-6 sm:p-10 rounded-xl shadow mt-6 sm:mt-10 text-center mx-[var(--page-pad)] sm:mx-auto">
      <h1 className="text-3xl font-bold mb-3">Welcome, {displayName}!</h1>
      <p className="text-gray-600 mb-6">
        You have successfully logged in to Nuvio.
      </p>
      <Link
        href="/"
        className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-bold transition"
      >
        Start Shopping
      </Link>
    </section>
  );
}
