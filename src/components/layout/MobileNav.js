"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ShieldAlert } from "lucide-react";

function NavItem({ iconSrc, label, href, active }) {
  return (
    <Link href={href} className="flex flex-col items-center gap-1.5 px-2 relative h-full pt-3 pb-2 w-16">
      {active && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-[3px] bg-[#ED6690] rounded-b-md" />
      )}
      <div className={`transition-all duration-300 ${active ? "opacity-100" : "grayscale opacity-40 hover:opacity-70 hover:grayscale-0"}`}>
        <Image src={iconSrc} width={24} height={24} alt={label} className="w-6 h-6 object-contain" />
      </div>
      <span
        className={`text-[11px] font-medium transition-colors ${
          active ? "text-[#ED6690]" : "text-gray-400"
        }`}
      >
        {label}
      </span>
    </Link>
  );
}

export default function MobileNav() {
  const pathname = usePathname();

  // Hanya tampilkan Mobile Navbar di halaman beranda, report (halaman 1), settings, dan profile
  const allowedPaths = ["/", "/report", "/settings", "/profile"];
  const isAllowed = allowedPaths.includes(pathname);

  if (!isAllowed) return null;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 w-full h-[76px] bg-white flex items-center justify-between z-[999] shadow-[0_-4px_30px_rgba(0,0,0,0.08)] px-4 pb-2 rounded-t-[32px] border-t border-gray-100">
      <NavItem iconSrc="/navbar/home.svg" label="Home" href="/" active={pathname === "/"} />
      <NavItem
        iconSrc="/navbar/route.svg"
        label="Route"
        href="/safe_route"
        active={pathname === "/safe_route"}
      />

      <Link href="/sos" className="flex flex-col items-center -mt-8 relative z-10 shrink-0 px-2">
        <div className="w-[60px] h-[60px] rounded-full bg-gradient-to-br from-[#f87171] to-[#e41010] flex items-center justify-center shadow-[0_8px_20px_-4px_rgba(239,68,68,0.5)] ring-[6px] ring-white">
          <ShieldAlert className="w-7 h-7 text-white" strokeWidth={2.5} />
        </div>
        <span className="text-[11px] font-bold text-red-500 mt-1">SOS</span>
      </Link>

      <NavItem
        iconSrc="/navbar/report.svg"
        label="Report"
        href="/report"
        active={pathname === "/report"}
      />
      <NavItem
        iconSrc="/navbar/sharelock.svg"
        label="Shareloc"
        href="/share"
        active={pathname === "/share"}
      />
    </nav>
  );
}
