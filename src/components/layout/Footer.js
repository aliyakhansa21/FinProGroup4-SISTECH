import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-[#fffbfb] border-t border-gray-100 py-8 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Logo and Copyright */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <Image 
            src="/logo-sora-colour.svg" 
            alt="Sora Logo" 
            width={120} 
            height={36} 
            className="h-8 w-auto opacity-90"
          />
          <p className="text-xs text-gray-400 font-medium mt-1">
            &copy; {new Date().getFullYear()} Sora App. All rights reserved.
          </p>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm text-gray-500 font-medium">
          <Link href="/" className="hover:text-[#ED6690] transition-colors">Home</Link>
          <Link href="/safe_route" className="hover:text-[#ED6690] transition-colors">Route</Link>
          <Link href="/report" className="hover:text-[#ED6690] transition-colors">Report</Link>
          <Link href="/sharelock" className="hover:text-[#ED6690] transition-colors">Shareloc</Link>
        </div>
        
      </div>
      
      {/* Extra padding at the bottom on mobile to account for MobileNav */}
      <div className="h-16 md:hidden"></div>
    </footer>
  );
}
