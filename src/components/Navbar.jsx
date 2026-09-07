import React from "react";
import { Bell, ShoppingCart, Search, Leaf, UserCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { items } = useCart();
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <Link className="brand" to="/">
        <span className="brand-icon"><Leaf size={18} /></span>
        <span>FarmDirect</span>
      </Link>

      <div className="nav-search">
        <Search size={17} />
        <input placeholder="Search for products, farmers..." onKeyDown={e => e.key === "Enter" && navigate(`/buyer?search=${encodeURIComponent(e.target.value)}`)} />
      </div>

      <nav className="nav-actions">
        <button className="icon-btn" title="Notifications"><Bell size={18} /></button>
        <Link className="cart-btn" to="/cart"><ShoppingCart size={18} /><span>Cart</span>{items.length > 0 && <b>{items.length}</b>}</Link>
        {user ? <><Link className="user-menu" to={user.role === "farmer" ? "/farmer" : user.role === "admin" ? "/admin" : user.role === "delivery_partner" ? "/delivery" : "/buyer"}><UserCircle size={20} /><span>{user.name || "Account"}</span></Link><button className="outline-btn" onClick={logout}>Logout</button></> : <Link className="user-menu" to="/login"><UserCircle size={20} /><span>Sign in</span></Link>}
      </nav>
    </header>
  );
}
