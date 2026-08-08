"use client";

import Header from "./Header";
import MobileNav from "./MobileNav";
import Footer from "./Footer";
import { usePathname } from "next/navigation";

export default function MainLayout({ children }) {
  const pathname = usePathname();
  const isSharePage = pathname?.startsWith("/share");

  if (isSharePage) {
    return <main className="min-h-screen w-full bg-[#fffbfb]">{children}</main>;
  }

  return (
    <div className="min-h-screen bg-[#fffbfb] relative pb-20 md:pb-0">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col bg-[#fffbfb]">
        <Header />

        <main className="flex-1 w-full flex flex-col">
          {children}
        </main>
        
        <Footer />
      </div>
      
      <MobileNav />
    </div>
  );
}