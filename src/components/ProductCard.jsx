import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Star, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
export default function ProductCard({ product }) {
 const { addToCart }=useCart(); const id=product._id||product.id; const farmer=product.farmer?.name||product.farmer||"Local farmer"; const location=product.location?.city ? `${product.location.city}, ${product.location.state||""}` : product.location||"Nearby";
 return <article className="product-card"><div className="product-image-wrap"><img src={product.image} alt={product.name}/>{product.organic&&<span className="organic">Organic</span>}</div><div className="product-body"><div className="product-title-row"><h3>{product.name}</h3><span className="rating"><Star size={13} fill="currentColor"/> {product.rating||0}</span></div><p className="muted">by {farmer}</p><div className="product-meta"><span><MapPin size={13}/> {location}</span><span>{product.stock} {product.unit}</span></div><div className="price-row"><strong>₹{product.price}</strong><span>/{product.unit}</span><button className="mini-cart" onClick={()=>addToCart(product)} title="Add to cart"><ShoppingCart size={16}/></button></div><Link to={`/products/${id}`} className="primary-btn full">View Details</Link></div></article>
}
