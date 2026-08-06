"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, User, Shield, Lock, Bell, Settings as SettingsIcon, HelpCircle } from "lucide-react";
import MobileNav from "@/components/layout/MobileNav";
import {
  AccountSettings,
  SafetySettings,
  PrivacySettings,
  NotificationSettings,
  PreferencesSettings,
  SupportSettings
} from "./SettingsContent";

const categories = [
  { id: "Account", label: "Account", icon: User },
  { id: "Safety", label: "Safety", icon: Shield },
  { id: "Privacy", label: "Privacy", icon: Lock },
  { id: "Notification", label: "Notification", icon: Bell },
  { id: "Preferences", label: "Preferences", icon: SettingsIcon },
  { id: "Support", label: "Support", icon: HelpCircle },
];

const mobileMenuData = [
  {
    title: "Account",
    items: [
      { label: "Edit Profile", target: "Account" },
      { label: "Phone Number", target: "Account" },
      { label: "Email", target: "Account" },
      { label: "Change Password", target: "Account" },
    ]
  },
  {
    title: "Safety",
    items: [
      { label: "Trusted Contacts", badge: "5", target: "Safety" },
      { label: "Emergency Message", target: "Safety" },
      { label: "SOS Hold Duration", target: "Safety" },
      { label: "Auto Check-in Reminders", isToggle: true, defaultOn: true, target: "Safety" },
      { label: "Default Route", target: "Safety" },
    ]
  },
  {
    title: "Notification",
    items: [
      { label: "SOS Alerts", isToggle: true, defaultOn: true, target: "Notification" },
      { label: "Nearby Reports", isToggle: true, defaultOn: true, target: "Notification" },
      { label: "Safety Tips", isToggle: true, defaultOn: false, target: "Notification" },
      { label: "Sharing Requests", isToggle: true, defaultOn: true, target: "Notification" },
    ]
  },
  {
    title: "Privacy",
    items: [
      { label: "Report Anonymously by Default", isToggle: true, defaultOn: true, target: "Privacy" },
      { label: "Location Permissions", target: "Privacy" },
      { label: "Data & Privacy", target: "Privacy" },
    ]
  },
  {
    title: "Preferences",
    items: [
      { label: "Language", target: "Preferences" },
      { label: "Distance Unit", target: "Preferences" },
      { label: "Dark Mode", target: "Preferences" },
    ]
  },
  {
    title: "Support",
    items: [
      { label: "Help Center", target: "Support" },
      { label: "Contact Us", target: "Support" },
      { label: "Rate", target: "Support" },
      { label: "Terms & Privacy Policy", target: "Support" },
    ]
  }
];

export default function SettingsPage() {
  const [activeCategory, setActiveCategory] = useState("Account");
  const [mobileViewContent, setMobileViewContent] = useState(false);

  const handleSelectCategory = (categoryId) => {
    setActiveCategory(categoryId);
    setMobileViewContent(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (activeCategory) {
      case "Account": return <AccountSettings />;
      case "Safety": return <SafetySettings />;
      case "Privacy": return <PrivacySettings />;
      case "Notification": return <NotificationSettings />;
      case "Preferences": return <PreferencesSettings />;
      case "Support": return <SupportSettings />;
      default: return <AccountSettings />;
    }
  };

  return (
    <div className="min-h-screen bg-[#fffbfb] pb-32 font-['Plus_Jakarta_Sans']">
      
      {/* Top Header */}
      <div className="w-full max-w-5xl mx-auto px-5 pt-14 pb-4 flex items-center gap-4 sticky top-0 bg-[#fffbfb]/90 backdrop-blur-md z-50">
        <button 
          onClick={() => {
            if (mobileViewContent) {
              setMobileViewContent(false);
            } else {
              window.history.back();
            }
          }}
          className="w-10 h-10 rounded-[14px] bg-[#fde9f1] flex items-center justify-center cursor-pointer hover:bg-[#fbd0df] transition-colors md:hidden shrink-0"
        >
          <ChevronLeft className="w-6 h-6 text-[#27272a]" />
        </button>
        {/* Desktop Back Button (always goes to home/profile) */}
        <Link href="/" className="w-10 h-10 rounded-[14px] bg-[#fde9f1] hidden md:flex items-center justify-center cursor-pointer hover:bg-[#fbd0df] transition-colors">
          <ChevronLeft className="w-6 h-6 text-[#27272a]" />
        </Link>
        <h1 className="text-[22px] font-bold text-[#27272a] ml-1">
          {mobileViewContent ? activeCategory : "Settings"}
        </h1>
      </div>

      <div className={`md:hidden px-5 pb-4 ${mobileViewContent ? 'hidden' : 'block'}`}>
        <div className="relative w-full">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full bg-white border border-gray-200 rounded-[16px] py-3.5 pl-11 pr-4 text-[15px] outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100 transition-all placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 mt-4 md:mt-8">
        <div className="flex items-start gap-8 lg:gap-16">
          
          {/* LEFT SIDEBAR (Desktop Sidebar) */}
          <div className={`${mobileViewContent ? 'hidden md:block' : 'hidden md:block'} w-full md:w-[280px] shrink-0`}>
            <div className="bg-white rounded-[24px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden">
              {categories.map((cat, index) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <div key={cat.id}>
                    <div 
                      onClick={() => handleSelectCategory(cat.id)}
                      className={`flex items-center justify-between p-5 cursor-pointer transition-colors ${isActive ? 'bg-pink-50/50 md:bg-pink-50' : 'hover:bg-gray-50'}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-xl ${isActive ? 'bg-white shadow-sm text-[#ee537f]' : 'bg-gray-100 text-gray-500'}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className={`text-[16px] font-bold ${isActive ? 'text-[#ee537f]' : 'text-[#3f3f46]'}`}>
                          {cat.label}
                        </span>
                      </div>
                      <ChevronRight className={`w-5 h-5 transition-transform ${isActive ? 'text-[#ee537f] rotate-90 md:rotate-0' : 'text-gray-400'}`} />
                    </div>
                    {index < categories.length - 1 && (
                      <div className="w-[calc(100%-40px)] mx-auto h-[1px] border-t border-dashed border-gray-200" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* MOBILE LIST (Mobile only, Figma Style) */}
          <div className={`${mobileViewContent ? 'hidden' : 'block md:hidden'} w-full`}>
            <div className="flex flex-col gap-6">
              {mobileMenuData.map((section, sIdx) => (
                <div key={sIdx}>
                  <h2 className="text-[17px] font-bold text-[#27272a] mb-3 ml-1">{section.title}</h2>
                  <div className="bg-white rounded-[20px] shadow-[0_1px_3px_rgba(0,0,0,0.1)] px-4">
                    {section.items.map((item, iIdx) => (
                      <div key={iIdx}>
                        <div 
                          onClick={() => !item.isToggle && handleSelectCategory(item.target)}
                          className={`flex items-center justify-between py-4 ${!item.isToggle ? 'cursor-pointer hover:opacity-70 transition-opacity' : ''}`}
                        >
                          <span className="text-[15px] font-semibold text-[#52525b]">{item.label}</span>
                          <div className="flex items-center gap-3">
                            {item.badge && (
                              <div className="bg-[#fde9f1] text-[#b14c78] text-[12px] font-bold px-2 py-0.5 rounded-full">
                                {item.badge}
                              </div>
                            )}
                            {item.isToggle ? (
                              <button className={`relative inline-flex h-[22px] w-[38px] items-center rounded-full transition-colors ${item.defaultOn ? 'bg-[#ee537f]' : 'bg-gray-200'}`}>
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${item.defaultOn ? 'translate-x-5' : 'translate-x-0.5'}`} />
                              </button>
                            ) : (
                              <ChevronRight className="w-[18px] h-[18px] text-[#a1a1aa] stroke-[2.5]" />
                            )}
                          </div>
                        </div>
                        {iIdx < section.items.length - 1 && (
                          <div className="w-full h-[1px] border-t border-dashed border-[#e4e4e7]" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className={`${mobileViewContent ? 'block' : 'hidden md:block'} flex-1 w-full`}>
            {renderContent()}
          </div>

        </div>
      </div>

      <MobileNav />
    </div>
  );
}
