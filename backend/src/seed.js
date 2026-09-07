import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import Product from "./models/Product.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the same environment files regardless of where this script is run from.
// backend/.env takes priority when both files exist.
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
dotenv.config({ path: path.resolve(__dirname, "../.env"), override: true });

if (!process.env.MONGODB_URI) {
  console.error("❌ MONGODB_URI is missing.");
  console.error("Add MONGODB_URI to .env or backend/.env and run the seed again.");
  process.exit(1);
}

const products = [
  {name:"Potato",category:"Vegetables",price:25,unit:"kg",stock:100,rating:4.8,organic:true,image:"https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=900&q=80",location:{city:"Lucknow",state:"Uttar Pradesh"}},
  {name:"Onion",category:"Vegetables",price:30,unit:"kg",stock:180,rating:4.7,organic:true,image:"https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?auto=format&fit=crop&w=900&q=80",location:{city:"Nashik",state:"Maharashtra"}},
  {name:"Tomato",category:"Vegetables",price:35,unit:"kg",stock:75,rating:4.9,organic:true,image:"https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=900&q=80",location:{city:"Pune",state:"Maharashtra"}},
  {name:"Carrot",category:"Vegetables",price:40,unit:"kg",stock:90,rating:4.6,organic:true,image:"https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=900&q=80",location:{city:"Jaipur",state:"Rajasthan"}}
];

try {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("✅ MongoDB connected");

  const email = process.env.ADMIN_EMAIL || "admin@farmdirect.local";
  let admin = await User.findOne({ email });

  if (!admin) {
    admin = await User.create({
      name: "FarmDirect Admin",
      email,
      password: await bcrypt.hash(process.env.ADMIN_PASSWORD || "ChangeMe123!", 12),
      role: "admin",
      verified: true
    });
    console.log(`✅ Admin created: ${email}`);
  } else {
    console.log(`ℹ️ Admin already exists: ${email}`);
  }

  let farmer = await User.findOne({ role: "farmer" });

  if (!farmer) {
    farmer = await User.create({
      name: "Demo Farmer",
      email: "farmer@farmdirect.local",
      password: await bcrypt.hash("Farmer123!", 12),
      role: "farmer",
      verified: true,
      location: { lat: 26.8467, lng: 80.9462, city: "Lucknow", state: "Uttar Pradesh" }
    });
    console.log("✅ Demo farmer created");
  }

  if (await Product.countDocuments() === 0) {
    await Product.insertMany(products.map(p => ({ ...p, farmer: farmer._id })));
    console.log("✅ Demo products inserted");
  }

  console.log("🎉 Seed complete");
} catch (error) {
  console.error("❌ Seed failed:", error.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect().catch(() => {});
}
