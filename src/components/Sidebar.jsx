import React from "react";
import {NavLink,useNavigate} from "react-router-dom";
import {LayoutDashboard,ShoppingBag,Package,MapPinned,Users,Settings,LogOut,Sprout,Store,Truck} from "lucide-react";
import {useAuth} from "../context/AuthContext";
export default function Sidebar(){
 const {user,logout}=useAuth(); const nav=useNavigate();
 const links=user?.role==="farmer"?[["/farmer","Dashboard",LayoutDashboard],["/farmer#products","My Products",Store],["/orders","Orders",Package],["/map-search","Map Search",MapPinned]]:user?.role==="admin"?[["/admin","Dashboard",LayoutDashboard],["/admin#farmers","Farmers",Users],["/orders","Orders",Package]]:user?.role==="delivery_partner"?[["/delivery","Assigned Orders",Truck]]:[["/buyer","Marketplace",ShoppingBag],["/orders","My Orders",Package],["/map-search","Find Farmers",MapPinned]];
 return <aside className="sidebar"><div className="side-profile"><div className="avatar">{user?.name?.slice(0,2).toUpperCase()||"FD"}</div><div><strong>{user?.name||"Guest"}</strong><span>{user?.role?`${user.role[0].toUpperCase()}${user.role.slice(1)} account`:"Account"}</span></div></div><div className="side-label">MENU</div><nav>{links.map(([to,label,Icon])=><NavLink key={to} to={to} className={({isActive})=>isActive?"side-link active":"side-link"}><Icon size={18}/>{label}</NavLink>)}</nav><div className="side-label">ACCOUNT</div><button className="side-link side-button" onClick={()=>nav("/")}><ShoppingBag size={18}/> Home</button><button className="side-link side-button" onClick={()=>{logout();nav("/")}}><LogOut size={18}/> Logout</button><div className="side-tip"><Sprout size={19}/><div><b>Grow together</b><span>Buy directly from local farmers.</span></div></div></aside>
}
