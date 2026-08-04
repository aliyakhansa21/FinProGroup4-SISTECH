"use client";

export default function ArrivalSheet({ duration, distance, onBackHome, onSafe }) {
  return (
    <section className="flex w-full max-h-[85vh] overflow-y-auto flex-col items-center rounded-t-[34px] bg-white px-6 pb-10 pt-4 shadow-[0_-12px_40px_rgba(0,0,0,0.12)]">
      <div className="mb-6 flex shrink-0 justify-center">
        <div className="h-1.5 w-12 rounded-full bg-gray-300" />
      </div>

      <div className="mb-4 flex h-24 w-24 items-center justify-center">
        <span className="text-7xl drop-shadow-md">☁️</span>
      </div>

      <h2 className="mb-1 text-xl font-bold text-gray-900">
        You've arrived safely <span className="text-2xl">🎉</span>
      </h2>
      <p className="mb-8 text-sm text-gray-400">
        {duration} · {distance}
      </p>

      <div className="flex w-full gap-4">
        <button
          onClick={onBackHome}
          className="flex-1 rounded-2xl border-2 border-pink-200 bg-white py-4 text-sm font-bold text-pink-400 transition hover:bg-pink-50"
        >
          Back Home
        </button>
        <button
          onClick={onSafe}
          className="flex-1 rounded-2xl bg-pink-400 py-4 text-sm font-bold text-white shadow-lg shadow-pink-200 transition hover:bg-pink-500"
        >
          I'm Safe →
        </button>
      </div>
    </section>
  );
}