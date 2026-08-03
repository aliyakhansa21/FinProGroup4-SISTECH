'use client';

import React from 'react';
import { Phone, UserCheck, Shield, CheckCircle2 } from 'lucide-react';

export default function ContactCard({
  name,
  relation,
  phone,
  status = 'Notified',
  avatarBg = 'bg-pink-100 text-pink-700',
  onCall,
  compact = false,
}) {
  return (
    <div className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl border border-gray-200 bg-white hover:border-gray-300 shadow-xs transition-all">
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div
          className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-bold text-sm sm:text-base shrink-0 ${avatarBg}`}
        >
          {name ? name.substring(0, 2).toUpperCase() : 'EC'}
        </div>

        {/* Info */}
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold text-gray-900 truncate">
              {name}
            </h4>
          </div>
          <p className="text-xs text-gray-500 truncate">{relation}</p>
          {!compact && (
            <p className="text-xs font-mono text-gray-400 mt-0.5">{phone}</p>
          )}
        </div>
      </div>

      {/* Right side: Status and Call button */}
      <div className="flex items-center gap-2 shrink-0">
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
          <CheckCircle2 className="w-3 h-3 text-green-600" />
          <span className="hidden xs:inline">{status}</span>
        </span>

        {phone && (
          <button
            type="button"
            onClick={() => onCall && onCall(phone)}
            className="p-2.5 rounded-full bg-pink-50 text-pink-600 hover:bg-pink-100 active:bg-pink-200 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-400"
            title={`Panggil ${name}`}
            aria-label={`Panggil ${name}`}
          >
            <Phone className="w-4 h-4 fill-pink-600/20" />
          </button>
        )}
      </div>
    </div>
  );
}
