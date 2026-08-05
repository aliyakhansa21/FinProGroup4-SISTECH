"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SearchSheet from "@/components/safe-route/sheets/SearchSheet";
import SafeRouteLayout from "@/components/safe-route/SafeRouteLayout";
import dynamic from "next/dynamic";
import FloatingHeader from "@/components/safe-route/overlays/FloatingHeader";
import FloatingActions from "@/components/safe-route/overlays/FloatingActions";
import RouteSelectionSheet from "@/components/safe-route/sheets/RouteSelectionSheet";
import NavigationSheet from "@/components/safe-route/sheets/NavigationSheet";
import ArrivalSheet from "@/components/safe-route/sheets/ArrivalSheet";
import ConfirmModal from "@/components/safe-route/overlays/ConfirmModal";


const RouteMap = dynamic(
  () => import("@/components/safe-route/map/RouteMap"),
  { ssr: false }
);

const mockRoutes = [
  { id: 1, name: "Safest Route", duration: "18 min", distance: "1.4 km", safetyScore: 84, category: "Safest", tags: ["Well-lit", "Cameras nearby", "Popular path"] },
  { id: 2, name: "Alternative Safest", duration: "20 min", distance: "1.6 km", safetyScore: 80, category: "Safest", tags: ["Police station nearby", "Well-lit"] },
  { id: 3, name: "Fastest Route", duration: "12 min", distance: "1.2 km", safetyScore: 65, category: "Fastest", tags: ["Fastest time"] },
  { id: 4, name: "Scenic Route", duration: "25 min", distance: "2.0 km", safetyScore: 75, category: "Scenic", tags: ["Park path", "Quiet"] },
];

export default function SafeRoutePage() {
  const router = useRouter();
  const [origin, setOrigin] = useState("128 Oak Street");
  const [destination, setDestination] = useState("");
  const [step, setStep] = useState(1);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [modalState, setModalState] = useState(null);

  const handleSearchContinue = () => {
    setStep(2);
  };

  const handleStartNavigation = () => {
    setStep(3);
  };

  const handleEndNavigation = () => {
    setModalState(null);
    setStep(1);
    setDestination("");
    setSelectedRoute(null);
  };

  return (
    <>
      {step === 3 && (
        <button
          onClick={() => setStep(4)}
          className="fixed left-4 top-24 z-50 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-bold text-white shadow-lg transition hover:bg-indigo-700 lg:top-4"
        >
          Dev: Simulate Arrived
        </button>
      )}

      {step === 1 && (
        <div className="-mx-4 -mt-6 sm:-mx-6 sm:-mt-6 lg:-mx-8 lg:-mt-6 flex flex-col bg-gray-50 min-h-screen">
          <div className="w-full px-2 sm:px-6 lg:px-8">
            <SearchSheet
              destination={destination}
              setDestination={setDestination}
              onContinue={handleSearchContinue}
            />
          </div>
        </div>
      )}

      {step >= 2 && (
        <SafeRouteLayout
          map={<RouteMap route={selectedRoute} />}
          header={
            step === 4 ? (
              <FloatingHeader
                variant="arrived"
                destination={destination || "Home"}
              />
            ) : step === 3 ? (
              <FloatingHeader
                variant="direction"
                directionText="Head north on Rose Street"
                directionSubtext="220 m · well-lit"
              />
            ) : (
              <FloatingHeader
                variant="navigation"
                origin={origin}
                destination={destination}
                onBack={() => setStep(step - 1)}
                onSwap={() => {
                  setOrigin(destination || "Home");
                  setDestination(origin);
                }}
              />
            )
          }
          floatingActions={
            <FloatingActions
              showSOS={step === 3 || step === 4}
              onSOS={() => router.push("/sos")}
            />
          }
        >
          {step === 2 && (
            <RouteSelectionSheet
              recommendedRoutes={mockRoutes}
              selectedRoute={selectedRoute}
              onSelectRoute={setSelectedRoute}
              onBack={() => setStep(1)}
              onContinue={handleStartNavigation}
            />
          )}

          {step === 3 && (
            <NavigationSheet
              duration="18 min"
              distance="1.4 km"
              onShare={() => alert("Membuka Sharelock (WIP)")}
              onEnd={() => setModalState("end")}
            />
          )}

          {step === 4 && (
            <ArrivalSheet
              duration="18 min"
              distance="1.4 km"
              onBackHome={handleEndNavigation}
              onSafe={handleEndNavigation}
            />
          )}
        </SafeRouteLayout>
      )}

      <ConfirmModal
        isOpen={modalState === "end"}
        title="End Navigation?"
        message="Are you sure you want to end your current route navigation?"
        confirmText="Yes, End Route"
        cancelText="Cancel"
        onConfirm={handleEndNavigation}
        onCancel={() => setModalState(null)}
      />

      <ConfirmModal
        isOpen={modalState === "share"}
        title="Share Live Location?"
        message="This will share your current live route and location with your trusted contacts."
        confirmText="Share Location"
        cancelText="Cancel"
        onConfirm={() => {
          console.log("Location Shared!");
          setModalState(null);
        }}
        onCancel={() => setModalState(null)}
      />
    </>
  );
}