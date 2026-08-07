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
    if (coords && coords.length > 0) {
      map.fitBounds(coords, { padding: [50, 50] });
    }
  }, [coords, map]);
  return null;
}

export default function RouteMap({ route, startCoords, endCoords, height = "420px" }) {
  const startPoint = startCoords || [41.8781, -87.6298];

  const routeCoordinates = route?.coordinates || (startCoords && endCoords ? [startCoords, endCoords] : [
    [41.8781, -87.6298],
    [41.8815, -87.625],
    [41.8845, -87.618],
    [41.889, -87.614],
  ]);

  const endPoint = endCoords || routeCoordinates[routeCoordinates.length - 1];

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
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        <FitBounds coords={routeCoordinates} />

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