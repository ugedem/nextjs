import Link from "next/link";

export function NavBar() {
  return (
    <nav className="flex gap-4 mb-8">
      <Link href="/" className="px-3 py-1 rounded hover:bg-gray-200 focus:bg-gray-300 focus:outline-none">
        Home
      </Link>
      <Link href="/dashboard" className="px-3 py-1 rounded hover:bg-gray-200 focus:bg-gray-300 focus:outline-none">
        Dashboard
      </Link>
      <Link href="/about" className="px-3 py-1 rounded hover:bg-gray-200 focus:bg-gray-300 focus:outline-none">
        About
      </Link>
    </nav>
  );
}
