"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldAlert } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Route", href: "/safe_route" },
    { name: "Report", href: "/report" },
    { name: "Shareloc", href: "/share" },
  ];

  return (
    <header className="sticky top-0 z-[1000] border-b border-gray-100 bg-[#fffbfb]/90 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo / Brand */}
        <Link href="/" className="text-lg md:text-xl font-bold text-gray-900 hover:text-[#ED6690] transition-colors">
          Women Safety <span className="text-[#ED6690]">Platform</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm transition-colors ${
                  isActive
                    ? "text-[#ED6690] font-bold"
                    : "text-gray-500 font-medium hover:text-[#ED6690]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          
          <Link
            href="/sos"
            className="flex items-center gap-2 bg-gradient-to-br from-[#f87171] to-[#e41010] text-white px-5 py-2.5 rounded-full text-sm font-bold hover:shadow-lg hover:shadow-red-500/30 hover:-translate-y-0.5 transition-all"
          >
            <ShieldAlert className="w-4 h-4" /> SOS
          </Link>
        </div>

        {/* Mobile Status Text (hanya muncul di mobile jika perlu) */}
        <div className="md:hidden text-xs text-gray-400 font-medium bg-gray-100 px-2.5 py-1 rounded-full">
          Beta
        </div>
      </div>
    </header>
  );
}