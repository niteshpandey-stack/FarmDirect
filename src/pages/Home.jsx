import React, { useEffect, useState } from "react";
import {
  ArrowRight, CheckCircle2, Truck, ShieldCheck, Users, Leaf, MapPin,
  ShoppingCart, Search, Sprout, Heart, PackageCheck, ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Map from "../components/Map";
import { api } from "../services/api";

const categories = [
  ["Vegetables", "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=85"],
  ["Fruits", "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=500&q=85"],
  ["Grains & Cereals", "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=85"],
  ["Dairy", "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=500&q=85"],
  ["Spices", "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=500&q=85"],
  ["Pulses & Legumes", "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=500&q=85"],
  ["Organic Products", "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=500&q=85"],
];

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.getProducts().then(setProducts).catch(() => {});
  }, []);

  return (
    <div className="home home-redesign">
      <section className="fd-hero">
        <div className="fd-hero-overlay" />
        <div className="fd-hero-content">
          <div className="fd-badge"><Leaf size={14} /> Fresh &nbsp;•&nbsp; Local &nbsp;•&nbsp; Direct</div>
          <h1>Fresh Produce<br /><span>Direct from Farmers</span></h1>
          <p>Skip the middlemen. Get farm-fresh products at fair prices while supporting local farmers.</p>

          <div className="fd-hero-search">
            <Search size={18} />
            <input placeholder="Search for products, farmers or your location..." />
            <Link to="/buyer" className="fd-search-btn">Search</Link>
          </div>

          <div className="fd-hero-actions">
            <Link className="fd-primary" to="/buyer">Shop Fresh Produce <ArrowRight size={17} /></Link>
            <Link className="fd-secondary" to="/register">Join as Farmer</Link>
          </div>
        </div>
        <div className="fd-hero-message">
          <span>Real Farmers</span><span>Real Food</span><strong>Better Prices</strong>
        </div>
      </section>

      <section className="fd-trust">
        {[
          [Leaf, "100% Farm Fresh", "No middlemen, no compromise"],
          [ShieldCheck, "Fair Prices", "Better earnings for farmers"],
          [MapPin, "Local & Seasonal", "Fresh produce from your region"],
          [Truck, "Fast Delivery", "Direct from farm to your doorstep"],
          [CheckCircle2, "Traceable & Transparent", "Know your farmer, know your food"],
        ].map(([Icon, title, text]) => (
          <div className="fd-trust-item" key={title}>
            <div className="fd-icon-circle"><Icon size={19} /></div>
            <div><b>{title}</b><span>{text}</span></div>
          </div>
        ))}
      </section>

      <section className="fd-section fd-category-section">
        <div className="fd-section-intro">
          <span className="fd-eyebrow">EXPLORE CATEGORIES</span>
          <h2>Shop by Category</h2>
          <p>Find fresh produce, dairy, grains and more — all from trusted local farmers.</p>
        </div>
        <div className="fd-category-grid">
          {categories.map(([name, image]) => (
            <Link to="/buyer" className="fd-category" key={name}>
              <img src={image} alt={name} />
              <div><b>{name}</b><ArrowRight size={15} /></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="fd-section">
        <div className="fd-heading-row">
          <div>
            <span className="fd-eyebrow">FEATURED PRODUCTS</span>
            <h2>Fresh Picks for You</h2>
            <p>Handpicked and delivered straight from our trusted farmers.</p>
          </div>
          <Link to="/buyer" className="fd-view-link">View All Products <ArrowRight size={16} /></Link>
        </div>
        {products.length ? (
          <div className="fd-product-grid">
            {products.slice(0, 5).map(p => <ProductCard key={p._id || p.id} product={p} />)}
          </div>
        ) : (
          <div className="fd-empty">Fresh products from local farmers will appear here.</div>
        )}
      </section>

      <section className="fd-feature-grid fd-section">
        <div className="fd-why-card">
          <div className="fd-why-photo">
            <img src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=85" alt="Farmer in field" />
          </div>
          <div className="fd-why-copy">
            <span className="fd-eyebrow">WHY CHOOSE US</span>
            <h2>Why Choose<br />FarmDirect?</h2>
            <p>A better way to buy and sell farm produce.</p>
            {[
              [Users, "Direct from Farmers", "Get the best prices, straight from the source."],
              [ShieldCheck, "Transparent Pricing", "Know what you pay, no hidden costs."],
              [Leaf, "Quality Assured", "Fresh, seasonal and naturally grown."],
              [Heart, "Support Local", "Help farmers grow and communities thrive."],
            ].map(([Icon, title, text]) => (
              <div className="fd-reason" key={title}>
                <span><Icon size={17} /></span><div><b>{title}</b><small>{text}</small></div>
              </div>
            ))}
            <Link to="/buyer" className="fd-text-link">Learn More <ArrowRight size={14} /></Link>
          </div>
        </div>

        <div className="fd-price-card">
          <span className="fd-eyebrow">TRANSPARENT PRICING</span>
          <h3>Price Breakdown</h3>
          <p>See how your money is spent.</p>
          <div className="fd-price-image">
            <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=500&q=85" alt="Fresh vegetables" />
          </div>
          <div className="fd-price-lines">
            <div><span>♧ Farmer Price</span><b>₹40</b></div>
            <div><span>♧ Transport + Handling</span><b>₹5</b></div>
            <div><span>♧ Platform Fee</span><b>₹3</b></div>
            <div className="total"><span>Total Price</span><b>₹48</b></div>
          </div>
          <div className="fd-farmer-share"><CheckCircle2 size={16} /> Farmer gets 83% of the final price</div>
          <Link to="/buyer" className="fd-outline">Learn More <ArrowRight size={14} /></Link>
        </div>

        <div className="fd-track-card">
          <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=85" alt="Track order" />
          <div className="fd-track-overlay">
            <span className="fd-eyebrow">LIVE UPDATES</span>
            <h3>Track Your Order</h3>
            <p>Get real-time updates from farm to your home.</p>
            <div className="fd-track-form"><input placeholder="Enter Order ID" /><Link to="/orders">Track Now <ArrowRight size={14} /></Link></div>
          </div>
        </div>
      </section>

      <section className="fd-how fd-section">
        <div>
          <span className="fd-eyebrow">SIMPLE & TRANSPARENT</span>
          <h2>How FarmDirect Works?</h2>
          <p>Simple steps to get fresh produce.</p>
        </div>
        <div className="fd-steps">
          {[
            [Sprout, "1. Browse", "Explore fresh produce from local farmers"],
            [ShoppingCart, "2. Order", "Place your order directly"],
            [PackageCheck, "3. Track", "Get real-time updates"],
            [CheckCircle2, "4. Enjoy", "Fresh produce at your doorstep"],
          ].map(([Icon, title, text], i) => (
            <React.Fragment key={title}>
              <div className="fd-step"><span><Icon size={20} /></span><b>{title}</b><small>{text}</small></div>
              {i < 3 && <ChevronRight className="fd-step-arrow" size={20} />}
            </React.Fragment>
          ))}
        </div>
      </section>

      <section className="fd-section fd-impact">
        <div>
          <span className="fd-eyebrow">OUR IMPACT</span>
          <h2>Better for Farmers. Better for You.</h2>
        </div>
        <div className="fd-stats">
          <div><b>10,000+</b><span>Happy Customers</span></div>
          <div><b>2,500+</b><span>Registered Farmers</span></div>
          <div><b>500+</b><span>Tons of Produce Sold</span></div>
          <div><b>15+</b><span>Districts Covered</span></div>
        </div>
      </section>

      <section className="fd-testimonials fd-section">
        <div className="fd-heading-row">
          <div><span className="fd-eyebrow">REAL STORIES</span><h2>What Farmers & Buyers Say</h2></div>
          <span className="fd-view-link">Trusted by our community <ArrowRight size={16} /></span>
        </div>
        <div className="fd-testimonial-grid">
          {[
            ["https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80", "FarmDirect has helped me get better prices for my produce. No more middlemen!", "Ramesh Kumar", "Farmer, Lucknow"],
            ["https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80", "The quality is excellent and the delivery is always on time. I love buying directly from farmers.", "Priya Sharma", "Buyer, Kanpur"],
            ["https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80", "This platform is a great initiative. It gives us farmers a fair chance.", "Mohan Lal", "Farmer, Barabanki"],
          ].map(([image, quote, name, role]) => (
            <div className="fd-testimonial" key={name}>
              <img src={image} alt={name} />
              <div><p>“{quote}”</p><b>- {name}</b><small>{role}</small><div className="fd-stars">★★★★★</div></div>
            </div>
          ))}
        </div>
      </section>

      <section className="fd-cta fd-section">
        <div><Leaf size={27} /><div><h3>Join the FarmDirect Movement</h3><p>Support local farmers, get fresh produce, and be a part of a sustainable future.</p></div></div>
        <Link to="/buyer" className="fd-cta-btn">Start Shopping <ArrowRight size={16} /></Link>
      </section>
    </div>
  );
}
