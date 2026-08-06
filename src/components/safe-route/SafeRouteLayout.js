"use client";

import { useState } from "react";

export default function SafeRouteLayout({
  map,
  header,
  floatingActions,
  children,
}) {
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);
  const [isMobileCollapsed, setIsMobileCollapsed] = useState(false);

  return (
    <div className="relative flex h-[calc(100vh-72px)] w-full flex-col overflow-hidden bg-gray-100 lg:flex-row">
      
      <div className="relative z-0 flex-1 overflow-hidden">
        <div className="absolute inset-0 h-full w-full">
          {map}
        </div>

        <div className="absolute left-0 right-0 top-4 z-10 px-4 transition-transform duration-300 lg:hidden">
          {header}
        </div>

        <div className="absolute bottom-6 right-6 z-10 hidden lg:block">
          {floatingActions}
        </div>

        <div 
          className={`absolute bottom-0 left-0 right-0 z-20 flex flex-col transition-transform duration-300 lg:hidden ${
            isMobileCollapsed ? "translate-y-[calc(100%-48px)]" : "translate-y-0"
          }`}
        >
          <div className="absolute bottom-full right-4 mb-4 flex pointer-events-none flex-col items-end [&>*]:pointer-events-auto">
            {floatingActions}
          </div>

          <div 
            onClick={() => setIsMobileCollapsed(!isMobileCollapsed)} 
            className="absolute left-0 right-0 top-0 z-50 h-12 cursor-pointer"
          />
          {children}
        </div>
      </div>

      <div 
        className={`absolute bottom-0 left-0 top-0 z-20 hidden w-[400px] flex-col border-r border-gray-200 bg-white shadow-xl transition-transform duration-300 lg:flex ${
          isDesktopCollapsed ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="border-b border-gray-100 p-6 pb-4 [&>div]:!border-transparent [&>div]:!bg-transparent [&>div]:!p-0 [&>div]:!shadow-none">
          {header}
        </div>
        
        <div className="relative flex-1 overflow-hidden [&>section]:!h-full [&>section]:!max-h-none [&>section]:!rounded-none [&>section]:!shadow-none [&>section>div:first-child]:!hidden">
          {children}
        </div>
      </div>

      <div 
        className={`absolute top-1/2 z-30 hidden -translate-y-1/2 transition-transform duration-300 lg:flex ${
          isDesktopCollapsed ? "translate-x-0" : "translate-x-[400px]"
        }`}
      >
        <button 
          onClick={() => setIsDesktopCollapsed(!isDesktopCollapsed)}
          className="flex h-16 w-6 items-center justify-center rounded-r-lg border border-l-0 border-gray-300 bg-white text-xl text-gray-400 shadow-md transition hover:bg-gray-50 hover:text-gray-900"
        >
          {isDesktopCollapsed ? "›" : "‹"}
        </button>
      </div>

    </div>
  );
}