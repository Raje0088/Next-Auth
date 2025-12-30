"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header({ isLoggedIn }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/logout", {
      method: "POST",
    });
    router.refresh(); // Refresh the server components to update auth state
    router.push("/login");
  }

  return (
    <header className="flex justify-between items-center p-4 bg-gray-100 dark:bg-zinc-900">
      <div className="font-bold text-xl">
        <Link href="/">Products Store</Link>
      </div>
      <nav className="flex gap-4">
        <Link href="/products" className="hover:underline">
          Products
        </Link>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <Link
            href="/login"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}
