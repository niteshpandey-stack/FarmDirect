import React from "react";
import { Check } from "lucide-react";

const steps = ["Order Placed", "Farmer Accepted", "Product Packed", "Out for Delivery", "Delivered"];

export default function OrderTracker({ current = 3 }) {
  return (
    <section className="panel">
      <span className="eyebrow">7. OrderTracker</span>
      <h2>Order #FD-1028</h2>
      <div className="tracker">
        {steps.map((step, i) => (
          <div className={`track-step ${i <= current ? "done" : ""}`} key={step}>
            <div className="track-dot">{i < current ? <Check size={12}/> : i === current ? "•" : ""}</div>
            <div><b>{step}</b><span>{i <= current ? "01 Jun 2026, 10:30 AM" : "Pending"}</span></div>
          </div>
        ))}
      </div>
    </section>
  );
}
