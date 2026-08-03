"use client";

import { useEffect } from "react";

export default function SendingSheet({ onFinish }) {

  useEffect(() => {

    const timer = setTimeout(() => {
      onFinish();
    },3000);

    return () => clearTimeout(timer);

  }, [onFinish]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">

      <div className="space-y-6 rounded-3xl bg-white p-10 shadow">

        <h2 className="text-2xl font-bold">
          Sending Emergency Alert...
        </h2>

        <p>
          Please wait...
        </p>

      </div>

    </main>
  );
}