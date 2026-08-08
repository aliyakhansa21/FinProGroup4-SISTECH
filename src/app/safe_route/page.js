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
import { predictRisk, getRouteRiskPrediction } from "@/services/predictService";
import { geocode, getRoutes } from "@/services/mapService";
import { useSharelockSession } from "@/hooks/useSharelockSession";


const RouteMap = dynamic(
  () => import("@/components/safe-route/map/RouteMap"),
  { ssr: false }
);



function SafeRouteContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [origin, setOrigin] = useState("My Current Location");
  const [destination, setDestination] = useState(searchParams?.get("destination") || "");
  const [step, setStep] = useState(1);
  const [routes, setRoutes] = useState([]);
  const [isPredicting, setIsPredicting] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [modalState, setModalState] = useState(null);

  const { session } = useSharelockSession();

  const handleShareLocation = async () => {
    const token = session?.token || "123456";
    const shareUrl = `${window.location.origin}/share/${token}`;
    
    // Trigger cross-tab sync to make public view active
    localStorage.setItem("sora_live_tracking", JSON.stringify({
      active: true,
      origin: origin || "Current Location",
      destination: destination || "Destination",
      startCoords: selectedRoute?.coordinates?.[0] || [-6.2088, 106.8456],
      endCoords: selectedRoute?.coordinates?.[selectedRoute?.coordinates?.length - 1] || [-6.2297, 106.8295],
      routeCoordinates: selectedRoute?.coordinates || null,
      timestamp: new Date().toISOString()
    }));

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Track my Safe Route",
          url: shareUrl
        });
        return;
      } catch (err) {
        console.warn("Share failed or canceled:", err);
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("Link pelacakan berhasil disalin!\n" + shareUrl);
    }
  };

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
      
      // 3. Get Routes (multiple alternatives)
      const routesData = await getRoutes(startLon, startLat, destCoords.lon, destCoords.lat);
      if (!routesData || routesData.length === 0) {
        throw new Error("Routes not found");
      }
      
      // --- Route Evaluation Logic ---
      const categories = [
        { name: "Safest Route", category: "Safest" },
        { name: "Fastest Route", category: "Fastest" },
        { name: "Scenic Route", category: "Scenic" }
      ];

      const evaluatedRoutes = await Promise.all(
        routesData.slice(0, 3).map(async (routeData, index) => {
          const cat = categories[index] || categories[0];
          const prediction = await getRouteRiskPrediction(routeData.coordinates);
          
          let variance = 0;
          if (cat.category === "Fastest") variance = -10;
          else if (cat.category === "Scenic") variance = -5;

          let finalScore = prediction.riskScore + variance;
          if (finalScore > 100) finalScore = 100;
          if (finalScore < 0) finalScore = 0;

          return {
            id: index + 1,
            name: cat.name,
            category: cat.category,
            safetyScore: Number(finalScore.toFixed(2)),
            tags: prediction.tags,
            coordinates: routeData.coordinates,
            distance: `${(routeData.distance / 1000).toFixed(1)} km`,
            duration: `${Math.round(routeData.duration / 60)} min`,
            rawDuration: routeData.duration,
            steps: routeData.steps
          };
        })
      );

      setRoutes(evaluatedRoutes);
      setSelectedRoute(evaluatedRoutes[0]);
    } catch (error) {
      console.warn("ML API prediction failed or route not found:", error);
      setRoutes([]);
      setSelectedRoute(null);
    } finally {
      setIsPredicting(false);
      setStep(2);
    }
  };

  const handleStartNavigation = () => {
    setStep(3);
  };

  const handleEndNavigation = () => {
    localStorage.removeItem("sora_live_tracking");
    
    setModalState(null);
    setStep(1);
    setDestination("");
    setSelectedRoute(null);
  };

  const getDirectionInfo = () => {
    if (!selectedRoute || !selectedRoute.steps || selectedRoute.steps.length === 0) {
      return { text: "Head towards destination", subtext: "Proceed carefully" };
    }
    
    // Step 0 is usually "depart", so we use step 1 for the first meaningful turn instruction
    const step = selectedRoute.steps.length > 1 ? selectedRoute.steps[1] : selectedRoute.steps[0];
    
    const modifier = step.maneuver?.modifier ? ` ${step.maneuver.modifier.replace(/-/g, ' ')}` : "";
    let type = step.maneuver?.type || "Head";
    if (type === "turn") type = "Turn";
    if (type === "new name") type = "Continue";
    
    const capType = type.charAt(0).toUpperCase() + type.slice(1);
    const road = step.name || "the road";
    
    return { 
      text: `${capType}${modifier} onto ${road}`, 
      subtext: `${Math.round(step.distance)} m` 
    };
  };

  return (
    <>
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
                directionText={getDirectionInfo().text}
                directionSubtext={getDirectionInfo().subtext}
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
              duration={selectedRoute?.duration || "18 min"}
              distance={selectedRoute?.distance || "1.4 km"}
              onShare={handleShareLocation}
              onEnd={() => setModalState("end")}
              onSimulateArrival={() => setStep(4)}
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