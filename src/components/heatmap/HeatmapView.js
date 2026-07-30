"use client";

import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import mockData from "@/data/mockHeatmapData.json"; 

export default function HeatmapView() {
    const defaultCenter = [41.8781, -87.6298]; 

    const getRiskColor = (category) => {
        switch (category) {
            case "Low": return "#22c55e"; 
            case "Medium": return "#eab308"; 
            case "High": return "#f97316"; 
            case "Very High": return "#ef4444"; 
            default: return "#94a3b8"; 
        }
    };

    return (
        <div className="relative w-full h-full z-0">
            <MapContainer 
                center={defaultCenter} 
                zoom={14} 
                style={{ height: "100%", width: "100%" }}
                zoomControl={false}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />

                {/* Looping mock data untuk meletakkan titik api (CircleMarker) */}
                {mockData.map((data) => (
                    <CircleMarker
                        key={data.id}
                        center={[data.latitude, data.longitude]}
                        radius={data.risk_score / 2.5} 
                        pathOptions={{
                            fillColor: getRiskColor(data.risk_category),
                            fillOpacity: 0.5, 
                            color: getRiskColor(data.risk_category),
                            weight: 0 
                        }}
                    >
                        {/* Popup ini muncul saat titik diklik */}
                        <Popup>
                            <div className="p-1">
                                <h3 className="font-bold text-gray-800">{data.risk_category} Risk Zone</h3>
                                <p className="text-sm font-semibold text-gray-600 mt-1">Score: {data.risk_score}/100</p>
                                <p className="text-xs text-gray-500 mt-2">{data.description}</p>
                                <p className="text-[10px] text-gray-400 mt-2">{new Date(data.timestamp).toLocaleString()}</p>
                            </div>
                        </Popup>
                    </CircleMarker>
                ))}
            </MapContainer>

            {/* UI Komponen Legend melayang di atas peta */}
            <div className="absolute bottom-6 right-6 z-[400] bg-white p-4 rounded-2xl shadow-lg border border-gray-100">
                <h4 className="text-sm font-bold text-gray-900 mb-3">Risk Level</h4>
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-gray-600"><span className="w-3 h-3 rounded-full bg-red-500 opacity-60"></span> Very High</div>
                    <div className="flex items-center gap-2 text-xs text-gray-600"><span className="w-3 h-3 rounded-full bg-orange-500 opacity-60"></span> High</div>
                    <div className="flex items-center gap-2 text-xs text-gray-600"><span className="w-3 h-3 rounded-full bg-yellow-500 opacity-60"></span> Medium</div>
                    <div className="flex items-center gap-2 text-xs text-gray-600"><span className="w-3 h-3 rounded-full bg-green-500 opacity-60"></span> Low</div>
                </div>
            </div>
        </div>
    );
}