"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Bell, ChevronRight, BadgeCheck } from "lucide-react";
import MobileNav from "@/components/layout/MobileNav";

function MenuItem({ title, href }) {
  const content = (
    <div className="flex items-center justify-between py-[18px] cursor-pointer hover:opacity-70 transition-opacity">
      <span className="text-[15px] font-semibold text-[#52525b]">{title}</span>
      <ChevronRight className="w-[18px] h-[18px] text-[#a1a1aa] stroke-[2.5]" />
    </div>
  );
  
  if (href) {
    return <Link href={href} className="block">{content}</Link>;
  }
  
  return content;
}

function MenuSection({ title, items }) {
  return (
    <div className="mb-8">
      <h2 className="text-[20px] font-bold text-[#3f3f46] mb-4">{title}</h2>
      <div className="bg-white rounded-[20px] shadow-[0_1px_3px_rgba(0,0,0,0.08)] px-5">
        {items.map((item, index) => (
          <div key={index}>
            <MenuItem title={item.title || item} href={item.href} />
            {index < items.length - 1 && (
              <div className="w-full h-[1px] border-t border-dashed border-[#e4e4e7]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#fffbfb] pb-32 font-['Plus_Jakarta_Sans']">
      {/* Header */}
      <div className="w-full max-w-[1200px] mx-auto px-5 pt-14 pb-4 flex items-center justify-between sticky top-0 bg-[#fffbfb]/90 backdrop-blur-md z-50">
        <div className="flex items-center gap-4">
          <Link href="/" className="w-10 h-10 rounded-[14px] bg-[#fde9f1] flex items-center justify-center cursor-pointer hover:bg-[#fbd0df] transition-colors">
            <ChevronLeft className="w-6 h-6 text-[#27272a]" />
          </Link>
          <h1 className="text-[20px] font-bold text-[#27272a]">Profile</h1>
        </div>
        <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Bell className="w-[26px] h-[26px] text-[#27272a] fill-transparent stroke-[1.5]" />
          <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#ee537f] rounded-full ring-[2.5px] ring-[#fffbfb]" />
        </button>
      </div>

      <div className="max-w-[1200px] mx-auto px-5 mt-6">
        <div className="flex flex-col md:flex-row md:items-start gap-8 lg:gap-20">
          
          {/* Left Column: Profile Info */}
          <div className="w-full md:w-[320px] lg:w-[350px] shrink-0 flex flex-col items-center">
            {/* Avatar */}
            <div className="relative w-[148px] h-[148px] rounded-full bg-[#9a7ed9] shadow-[0_2px_16px_rgba(0,0,0,0.07)] mb-5">
              <Image 
                src="https://api.dicebear.com/7.x/notionists/svg?seed=FinPro&backgroundColor=9a7ed9" 
                alt="Profile Avatar" 
                fill 
                className="object-cover rounded-full" 
                sizes="148px"
              />
            </div>

            {/* User Details */}
            <div className="flex flex-col items-center text-center mb-8">
              <h2 className="text-[22px] font-bold text-[#27272a] mb-1.5">Username</h2>
              <div className="flex items-center gap-1.5 text-[#008235] mb-2">
                <BadgeCheck className="w-[18px] h-[18px]" />
                <span className="text-[13px] font-semibold tracking-wide">Verified Member</span>
              </div>
              <p className="text-[14px] text-[#71717a] font-medium">Member Since 2026</p>
            </div>

            {/* Stats */}
            <div className="w-full flex items-center justify-center gap-10 border-t border-gray-200 pt-8 md:border-none md:pt-0">
              <div className="flex flex-col items-center gap-1">
                <span className="text-[20px] font-bold text-[#27272a]">12</span>
                <span className="text-[14px] font-bold text-[#71717a]">Reports</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-[20px] font-bold text-[#27272a]">48</span>
                <span className="text-[14px] font-bold text-[#71717a]">Safe trips</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-[20px] font-bold text-[#27272a]">5</span>
                <span className="text-[14px] font-bold text-[#71717a]">Contacts</span>
              </div>
            </div>
          </div>

          {/* Right Column: Menus */}
          <div className="flex-1 w-full mt-4 md:mt-0">
            <MenuSection 
              title="Safety" 
              items={[
                "Personal Information",
                "Emergency Medical Info",
                "Trusted Contacts",
                "My Reports"
              ]} 
            />
            
            <MenuSection 
              title="More" 
              items={[
                { title: "Settings", href: "/settings" },
                "Notifications",
                "Help & Support",
                "About"
              ]} 
            />
          </div>

        </div>
      </div>

      <MobileNav />
    </div>
  );
}
