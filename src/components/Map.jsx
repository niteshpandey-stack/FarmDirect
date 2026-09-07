import React from "react";
import { MapPin, Navigation } from "lucide-react";

const markers = [
  { left: "20%", top: "33%", type: "farmer" },
  { left: "42%", top: "24%", type: "farmer" },
  { left: "62%", top: "45%", type: "farmer" },
  { left: "78%", top: "28%", type: "buyer" },
  { left: "70%", top: "70%", type: "buyer" },
  { left: "35%", top: "70%", type: "you" }
];

export default function Map({ height = 300 }) {
  return (
    <div className="map" style={{height}}>
      <div className="map-roads road-a" />
      <div className="map-roads road-b" />
      <div className="map-roads road-c" />
      <div className="map-grid" />
      {markers.map((m, i) => (
        <span key={i} className={`map-marker ${m.type}`} style={{left:m.left, top:m.top}}>
          {m.type === "you" ? <Navigation size={14}/> : <MapPin size={15}/>}
        </span>
      ))}
      <div className="map-legend">
        <span><i className="dot farmer-dot"/> Farmers</span>
        <span><i className="dot buyer-dot"/> Buyers</span>
      </div>
      <div className="map-attribution">OpenStreetMap-style preview</div>
    </div>
  );
}
