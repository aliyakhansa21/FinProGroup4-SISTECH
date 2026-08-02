"use client";

export default function RouteChip({ text, variant = "default", className = "" }) {
  const variants = {
    default: "bg-gray-100 text-gray-700 border-gray-200",
    low: "bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold",
    medium: "bg-amber-50 text-amber-700 border-amber-200 font-semibold",
    high: "bg-rose-50 text-rose-700 border-rose-200 font-semibold",
    safest: "bg-indigo-50 text-indigo-700 border-indigo-200 font-semibold",
  };

  const getVariant = () => {
    if (variant !== "default") return variants[variant] || variants.default;
    if (text?.toLowerCase().includes("low")) return variants.low;
    if (text?.toLowerCase().includes("medium")) return variants.medium;
    if (text?.toLowerCase().includes("high")) return variants.high;
    if (text?.toLowerCase().includes("safest")) return variants.safest;
    return variants.default;
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs transition ${getVariant()} ${className}`}
    >
      {text}
    </span>
  );
}
