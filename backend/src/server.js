import dotenv from "dotenv"; import { fileURLToPath } from "node:url"; import { dirname, join } from "node:path"; import express from "express"; import cors from "cors"; import mongoose from "mongoose";

// Always load the backend .env next to this server file, regardless of where npm is launched from.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Support both locations: project-root/.env and backend/.env.
// This preserves the environment setup from the original project.
dotenv.config({ path: join(__dirname, "../../.env") });
dotenv.config({ path: join(__dirname, "../.env"), override: true });
import dns from "node:dns"; import deliveryRoutes from "./routes/delivery.routes.js"; import authRoutes from "./routes/auth.routes.js"; import productRoutes from "./routes/product.routes.js"; import orderRoutes from "./routes/order.routes.js"; import farmerRoutes from "./routes/farmer.routes.js"; import adminRoutes from "./routes/admin.routes.js";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app=express();const PORT=process.env.PORT||5000;app.use(cors({origin:true}));app.use(express.json());app.get("/api/health",(req,res)=>res.json({ok:true,service:"FarmDirect API",time:new Date().toISOString()}));app.use("/api/auth",authRoutes);app.use("/api/products",productRoutes);app.use("/api/orders",orderRoutes);app.use("/api/farmers",farmerRoutes);app.use("/api/admin",adminRoutes);app.use("/api/delivery",deliveryRoutes);app.use((req,res)=>res.status(404).json({message:"Route not found"}));app.use((err,req,res,next)=>{console.error(err);res.status(err.status||500).json({message:err.message||"Server error"})});const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error("MONGODB_URI is missing. Put your original working .env in either the project root or backend folder.");
  process.exit(1);
}
mongoose.connect(mongoUri).then(()=>{console.log("MongoDB connected");app.listen(PORT,()=>console.log(`FarmDirect API running on http://localhost:${PORT}`));}).catch(e=>{console.error("MongoDB connection failed:",e.message);process.exit(1)});
