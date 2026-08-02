"use client";

import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function RouteMap({ route, height = "420px" }) {
  const startPoint = [41.8781, -87.6298];

  const routeCoordinates = route?.coordinates || [
    [41.8781, -87.6298],
    [41.8815, -87.625],
    [41.8845, -87.618],
    [41.889, -87.614],
  ];

  const endPoint = routeCoordinates[routeCoordinates.length - 1];

  const getRouteColor = (risk) => {
    if (!risk) return "#111827";
    if (risk.includes("Low")) return "#10B981"; // Emerald
    if (risk.includes("Medium")) return "#F59E0B"; // Amber
    return "#EF4444"; // Red
  };

  return (
    <div
      // Hapus style height 420px, ganti jadi h-full w-full. Hapus juga rounded-2xl dan border
      className="relative z-0 h-full w-full overflow-hidden bg-gray-200"
    >
      <MapContainer
        center={startPoint}
        zoom={14}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        <Polyline
          positions={routeCoordinates}
          pathOptions={{
            color: getRouteColor(route?.risk),
            weight: 6,
            opacity: 0.9,
          }}
        />

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