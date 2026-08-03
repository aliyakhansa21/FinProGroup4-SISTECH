"use client";

export default function EmergencySheet({ onSOS }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="space-y-8 rounded-3xl bg-white p-10 shadow">

        <h1 className="text-3xl font-bold">
          Emergency SOS
        </h1>

        <p>
          Press and hold SOS to request help.
        </p>

        <button
          onClick={onSOS}
          className="h-36 w-36 rounded-full bg-red-600 text-xl font-bold text-white"
        >
          SOS
        </button>

      </div>
    </main>
  );
}