"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Footprints,
  FileText,
  Share2,
  ShieldAlert,
} from "lucide-react";

function NavItem({ icon: Icon, label, href, active }) {
  return (
    <Link href={href} className="flex flex-col items-center gap-1 px-2">
      <Icon
        className={`w-5 h-5 ${active ? "text-[#ED6690]" : "text-gray-400"}`}
        strokeWidth={active ? 2.5 : 2}
      />
      <span
        className={`text-[11px] font-medium ${
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

  // Hide mobile nav on SOS flow because it has its own sticky bottom buttons
  if (pathname?.startsWith("/sos")) return null;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 w-full bg-white border-t border-gray-100 px-4 pt-2 pb-5 flex items-center justify-between z-[999] shadow-[0_-4px_20px_rgba(0,0,0,0.05)] rounded-t-3xl">
      <NavItem icon={Home} label="Home" href="/" active={pathname === "/"} />
      <NavItem
        icon={Footprints}
        label="Route"
        href="/safe_route"
        active={pathname?.startsWith("/safe_route")}
      />

      <Link href="/sos" className="flex flex-col items-center -mt-8 relative z-10">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#f87171] to-[#e41010] flex items-center justify-center shadow-[0_6px_16px_-4px_rgba(239,68,68,0.6)] ring-4 ring-white">
          <ShieldAlert className="w-6 h-6 text-white" />
        </div>
        <span className="text-[11px] font-bold text-red-500 mt-1">SOS</span>
      </Link>

      <NavItem
        icon={FileText}
        label="Report"
        href="/report"
        active={pathname?.startsWith("/report")}
      />
      <NavItem
        icon={Share2}
        label="Shareloc"
        href="/share"
        active={pathname?.startsWith("/share")}
      />
    </nav>
  );
}
