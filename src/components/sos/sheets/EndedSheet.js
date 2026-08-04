"use client";

import { useRouter } from "next/navigation";

export default function EndedSheet() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center max-w-lg mx-auto w-full gap-6 py-4">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-pink-100/70 text-5xl mb-4 animate-bounce">
          ☁️
        </div>
        <h2 className="text-xl md:text-2xl font-black text-gray-900">
          Glad you're safe! 💗
        </h2>
        <p className="text-xs md:text-sm text-gray-500 mt-2 max-w-xs leading-relaxed">
          Local siren has been turned off and emergency mode ended.
        </p>
      </div>

      <button
        type="button"
        onClick={() => router.push("/")}
        className="w-full rounded-2xl bg-pink-500 py-3.5 text-xs md:text-sm font-bold text-white transition hover:bg-pink-600 shadow-sm"
      >
        Back to Home
      </button>
    </div>
  );
}