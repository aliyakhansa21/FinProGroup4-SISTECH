import Link from "next/link";
import ReportFormPlaceholder from "@/components/report/ReportFormPlaceholder";
import MapPlaceholder from "@/components/report/MapPlaceholder";

export default function ReportPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black-800 transition-colors mb-4"
        >
          Back to Home
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">
          Anonymous Reporting
        </h1>

        <p className="mt-2 text-gray-500">
          Report an incident anonymously to help keep the community safe.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ReportFormPlaceholder />

        <MapPlaceholder />
      </div>
    </div>
  );
}