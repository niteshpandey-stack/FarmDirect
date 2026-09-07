import React, { useState } from "react";
import { MapPin, LocateFixed } from "lucide-react";
import Map from "./Map";

export default function LocationPicker() {
  const [location, setLocation] = useState("Lucknow, Uttar Pradesh");
  return (
    <section className="panel">
      <div className="panel-heading"><div><span className="eyebrow">5. LocationPicker</span><h2>Delivery location</h2></div></div>
      <label className="field-label">Select Delivery Location</label>
      <div className="location-input"><MapPin size={17}/><input value={location} onChange={e => setLocation(e.target.value)} /></div>
      <div className="range-row"><span>Delivery Radius</span><b>20 km</b></div>
      <input className="range" type="range" min="5" max="50" defaultValue="20" />
      <button className="outline-btn full" onClick={() => setLocation("Current location")}><LocateFixed size={16}/> Use Current Location</button>
      <button className="primary-btn full">Confirm Location</button>
      <Map height={170} />
    </section>
  );
}
