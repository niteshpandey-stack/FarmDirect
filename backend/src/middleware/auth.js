import jwt from "jsonwebtoken";
import User from "../models/User.js";
export async function protect(req,res,next){ try { const h=req.headers.authorization||""; if(!h.startsWith("Bearer ")) return res.status(401).json({message:"Authentication required"}); const decoded=jwt.verify(h.slice(7),process.env.JWT_SECRET||"dev-secret"); const user=await User.findById(decoded.id).select("-password"); if(!user) return res.status(401).json({message:"User not found"}); req.user=user; next(); } catch(e){ res.status(401).json({message:"Invalid or expired token"}); } }
export function roles(...allowed){ return (req,res,next)=> allowed.includes(req.user?.role) ? next() : res.status(403).json({message:"Access denied"}); }
