"use client";

import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function RouteMap({ route }) {
  const startPoint = [41.8781, -87.6298];

  const routeCoordinates = route?.coordinates || [
    [41.8781, -87.6298],
    [41.8815, -87.625],
    [41.8845, -87.618],
    [41.889, -87.614],
  ];

  const endPoint = routeCoordinates[routeCoordinates.length - 1];

  return (
    <div className="relative z-0 h-[420px] w-full overflow-hidden rounded-2xl">
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
            color: "#111827",
            weight: 5,
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
            color: "#111827",
            fillColor: "#111827",
            fillOpacity: 1,
            weight: 3,
          }}
        />
      </MapContainer>
    </div>
  );
}