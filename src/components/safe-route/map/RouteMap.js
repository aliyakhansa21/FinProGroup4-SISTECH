"use client";

import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Polyline,
  useMap
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { useEffect } from "react";

function FitBounds({ coords }) {
  const map = useMap();
  useEffect(() => {
    // Add timeout to ensure DOM container has fully expanded before calculating size
    const timer = setTimeout(() => {
      map.invalidateSize();
      if (coords && coords.length > 0) {
        map.fitBounds(coords, { padding: [50, 50] });
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [coords, map]);
  return null;
}

export default function RouteMap({ route, startCoords, endCoords, height = "420px" }) {
  const startPoint = startCoords || [-6.2088, 106.8456]; // Default to Jakarta
  const routeCoordinates = route?.coordinates || null;
  const endPoint = endCoords || (routeCoordinates ? routeCoordinates[routeCoordinates.length - 1] : startPoint);

  const getRouteColor = (risk) => {
    if (!risk) return "#111827";
    if (risk.includes("Low")) return "#10B981"; // Emerald
    if (risk.includes("Medium")) return "#F59E0B"; // Amber
    return "#EF4444"; // Red
  };

  return (
    <div
      className="relative z-0 h-full w-full overflow-hidden bg-gray-200"
    >
      <MapContainer
        center={startPoint}
        zoom={14}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {routeCoordinates && (
          <>
            <FitBounds coords={routeCoordinates} />
            <Polyline
              positions={routeCoordinates}
              pathOptions={{
                color: getRouteColor(route?.risk),
                weight: 6,
                opacity: 0.9,
              }}
            />
          </>
        )}

        <CircleMarker
          center={startPoint}
          radius={9}
          pathOptions={{
            color: "#111827",
            fillColor: "#ffffff",
            fillOpacity: 1,
            weight: 3,
          }}
        />

        <CircleMarker
          center={endPoint}
          radius={9}
          pathOptions={{
            color: getRouteColor(route?.risk),
            fillColor: getRouteColor(route?.risk),
            fillOpacity: 1,
            weight: 3,
          }}
        />
      </MapContainer>
    </div>
  );
}