import Link from "next/link";
import FeatureCard from "@/components/ui/FeatureCard";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-3xl font-bold text-gray-900">
          Stay Safe Gurls
        </h2>

        <p className="mt-2 text-gray-500">
          Welcome to the Women Safety Platform. Choose a feature below to get started.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <Link href="/report" className="block w-full">
          <FeatureCard
            title="Anonymous Reporting"
            description="Report an incident anonymously without revealing your identity."
          />
        </Link>

        <FeatureCard
          title="Safe Route"
          description="Find a safer route for your journey."
          disabled
        />

        <FeatureCard
          title="Emergency SOS"
          description="Quickly notify your emergency contacts."
          disabled
        />

        <FeatureCard
          title="Smart Sharelock"
          description="Share your live location securely with trusted contacts."
          disabled
        />
      </section>
    </div>
  );
}