"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SearchSheet from "@/components/safe-route/sheets/SearchSheet";
import SafeRouteLayout from "@/components/safe-route/SafeRouteLayout";
import dynamic from "next/dynamic";
import FloatingHeader from "@/components/safe-route/overlays/FloatingHeader";
import FloatingActions from "@/components/safe-route/overlays/FloatingActions";
import RouteSelectionSheet from "@/components/safe-route/sheets/RouteSelectionSheet";
import NavigationSheet from "@/components/safe-route/sheets/NavigationSheet";
import ArrivalSheet from "@/components/safe-route/sheets/ArrivalSheet";
import ConfirmModal from "@/components/safe-route/overlays/ConfirmModal";
import { predictRisk } from "@/services/predictService";
import { geocode, getRoute } from "@/services/mapService";


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

function SafeRouteContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [origin, setOrigin] = useState("My Current Location");
  const [destination, setDestination] = useState(searchParams?.get("destination") || "");
  const [step, setStep] = useState(1);
  const [routes, setRoutes] = useState(mockRoutes);
  const [isPredicting, setIsPredicting] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [modalState, setModalState] = useState(null);

  const handleSearchContinue = async () => {
    setIsPredicting(true);
    try {
      // 1. Geocode Destination
      const destCoords = await geocode(destination || "Chicago");
      if (!destCoords) {
        throw new Error("Location not found");
      }
      
      // 2. Resolve Origin
      let startLat, startLon;
      
      if (origin === "My Current Location") {
        try {
          const pos = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 10000 });
          });
          startLat = pos.coords.latitude;
          startLon = pos.coords.longitude;
        } catch (err) {
          console.warn("Could not get current location, falling back to default.", err);
          startLat = -6.2088; // Default Jakarta
          startLon = 106.8456;
        }
      } else {
        const originCoords = await geocode(origin);
        if (originCoords) {
          startLat = originCoords.lat;
          startLon = originCoords.lon;
        } else {
          throw new Error("Origin location not found");
        }
      }
      
      // 3. Get Route
      const routeData = await getRoute(startLon, startLat, destCoords.lon, destCoords.lat);
      if (!routeData) {
        throw new Error("Route not found");
      }
      
      // 4. Predict Risk
      const requestData = {
        latitude: destCoords.lat,
        longitude: destCoords.lon,
        location: destCoords.displayName || destination,
        timestamp: new Date().toISOString()
      };

      const response = await predictRisk(requestData);
      
      if (response && response.status === "success") {
        // Update the Safest Route score with real ML prediction & coordinates
        const updatedRoutes = [...routes];
        updatedRoutes[0] = {
          ...updatedRoutes[0],
          safetyScore: response.data.risk_score,
          coordinates: routeData.coordinates,
          distance: `${(routeData.distance / 1000).toFixed(1)} km`,
          duration: `${Math.round(routeData.duration / 60)} min`
        };
        // Also update coordinates for other mock routes so they don't break the map
        updatedRoutes[1].coordinates = routeData.coordinates;
        updatedRoutes[2].coordinates = routeData.coordinates;
        updatedRoutes[3].coordinates = routeData.coordinates;
        
        setRoutes(updatedRoutes);
      }
    } catch (error) {
      console.warn("ML API prediction failed, falling back to mock data:", error);
      // Fallback: keep using the original mock routes without crashing
      setRoutes(mockRoutes);
    } finally {
      setIsPredicting(false);
      setStep(2);
    }
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
        <div className="flex flex-col w-full min-h-[calc(100vh-72px)] bg-white">
          <div className="w-full">
            <SearchSheet
              destination={destination}
              setDestination={setDestination}
              origin={origin}
              setOrigin={setOrigin}
              onContinue={handleSearchContinue}
              isSearching={isPredicting}
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
              recommendedRoutes={routes}
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

export default function SafeRoutePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>}>
      <SafeRouteContent />
    </Suspense>
  );
}