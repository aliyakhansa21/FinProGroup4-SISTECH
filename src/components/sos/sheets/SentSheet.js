"use client";

export default function SentSheet({ onImSafe }) {

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">

      <div className="space-y-6 rounded-3xl bg-white p-10 shadow">

        <h2 className="text-2xl font-bold">
          SOS Activated
        </h2>

        <p>
          Trusted contacts have been notified.
        </p>

        <button
          onClick={onImSafe}
          className="rounded-xl bg-green-600 px-6 py-3 text-white"
        >
          I'm Safe
        </button>

      </div>

    </main>
  );
}