import Link from "next/link";

export default function NotFound() {
  return (
    <section className="max-w-lg mx-auto bg-white p-10 rounded-xl shadow mt-10 text-center">
      <h1 className="text-6xl font-bold text-red-500 mb-3">404</h1>
      <p className="text-gray-600 mb-6">Page not found</p>
      <Link
        href="/"
        className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-bold transition"
      >
        Go Home
      </Link>
    </section>
  );
}
