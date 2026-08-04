import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold text-gray-900 hover:text-purple-600 transition-colors">
          Women Safety Platform
        </Link>

        <div className="text-sm text-gray-400">
          Status: Wireframe
        </div>
      </div>
    </header>
  );
}