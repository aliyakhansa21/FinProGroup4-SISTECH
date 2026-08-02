"use client";

export default function NavigationBanner({ instruction, distance }) {
  return (
    <div className="w-full rounded-2xl bg-gray-900 p-4 text-white shadow-lg">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gray-800 text-2xl font-bold">
          ⬆️
        </div>

        <div>
          <p className="text-xs font-medium text-emerald-400">
            {distance || "In 200m"}
          </p>

          <p className="text-sm font-semibold">
            {instruction || "Head north on Main St towards safe corridor"}
          </p>
        </div>
      </div>
    </div>
  );
}
