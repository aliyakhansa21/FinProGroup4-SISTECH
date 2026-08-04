"use client";

export default function SafetyInsightCard({ label, value, icon }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 transition hover:border-gray-300">
      <div className="flex items-center gap-2">
        {icon && <span className="text-gray-400">{icon}</span>}
        <p className="text-xs font-medium text-gray-500">{label}</p>
      </div>
      <p className="mt-1.5 font-semibold text-gray-900">{value}</p>
    </div>
  );
}
