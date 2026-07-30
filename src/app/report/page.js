import Link from "next/link";
import ReportForm from "@/components/report/ReportForm";

export default function ReportPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors mb-4"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">
          Anonymous Reporting
        </h1>

        <p className="mt-2 text-gray-500">
          Report an incident anonymously to help keep the community safe.
        </p>
      </div>

      <ReportForm />
    </div>
  );
}