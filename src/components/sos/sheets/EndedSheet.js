"use client";

import { useRouter } from "next/navigation";

export default function EndedSheet() {

  const router = useRouter();

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">

      <div className="space-y-6 rounded-3xl bg-white p-10 shadow">

        <h2 className="text-2xl font-bold">
          Emergency Ended
        </h2>

        <p>
          Glad you're safe.
        </p>

        <button
          onClick={() => router.push("/")}
          className="rounded-xl bg-black px-6 py-3 text-white"
        >
          Back Home
        </button>

      </div>

    </main>
  );
}