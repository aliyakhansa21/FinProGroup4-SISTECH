// src/app/share/[token]/page.js
"use client";

import { use, useEffect, useState } from "react";
import { getSOSSession } from "@/services/sosService";

export default function PublicSharePage({ params }) {
  const { token } = use(params);
  const [session, setSession] = useState(null);

  useEffect(() => {
    if (token) {
      const data = getSOSSession(token);
      setSession(data);
    }
  }, [token]);

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-md border border-gray-100 flex flex-col gap-4">
        {/* Status Badge */}
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h1 className="text-lg font-bold text-gray-900">Pelacakan SOS Darurat</h1>
            <p className="text-xs text-gray-500">Token Sesi: {token}</p>
          </div>
          <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-600 animate-pulse">
            {session ? session.status : "SOS AKTIF"}
          </span>
        </div>

        {/* Info Pesan & Lokasi */}
        <div className="rounded-xl bg-red-50 p-4 border border-red-100 text-sm text-red-900">
          <p className="font-semibold">🚨 Pesan Darurat:</p>
          <p className="mt-1 text-xs">
            {session?.emergencyMessage || "Pengguna mengaktifkan tombol SOS darurat dan memerlukan bantuan."}
          </p>
        </div>

        {/* Route Map Placeholder */}
        <div className="h-64 w-full rounded-xl bg-gray-200 flex flex-col items-center justify-center border border-gray-300 relative overflow-hidden">
          <span className="text-2xl">📍</span>
          <p className="mt-2 text-xs font-semibold text-gray-600">Peta Lokasi Langsung Pengguna</p>
          <p className="text-xxs text-gray-400">{session?.location?.address || "Jl. Sudirman, Jakarta"}</p>
        </div>

        <p className="text-center text-xs text-gray-400">
          Halaman ini memperbarui lokasi secara otomatis.
        </p>
      </div>
    </main>
  );
}