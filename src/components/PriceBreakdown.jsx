import React from "react";

export default function PriceBreakdown({ quantity = 50, farmerPrice = 20 }) {
  const commodity = quantity * farmerPrice;
  const consumer = commodity + quantity * 5;
  return (
    <section className="panel">
      <span className="eyebrow">6. PriceTransparency</span>
      <h2>Price breakdown</h2>
      <div className="price-table">
        <div><span>Farmer Price</span><b>₹{farmerPrice}/kg</b></div>
        <div><span>Intermediary Costs</span><b>₹0/kg</b></div>
        <div><span>Consumer Price</span><b>₹{consumer / quantity}/kg</b></div>
        <div className="highlight"><span>Farmer Earnings</span><b>₹{farmerPrice}/kg</b></div>
      </div>
      <div className="save-banner">You save ₹{quantity * 10} · Farmer earns ₹{quantity * 5} more</div>
    </section>
  );
}
