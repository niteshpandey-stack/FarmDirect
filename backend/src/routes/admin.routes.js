import {Router} from "express"; import User from "../models/User.js"; import Product from "../models/Product.js"; import Order from "../models/Order.js"; import {protect,roles} from "../middleware/auth.js";
const router=Router();
router.get("/dashboard",protect,roles("admin"),async(req,res,next)=>{try{const [users,farmers,products,orders,revenue]=await Promise.all([User.countDocuments(),User.countDocuments({role:"farmer"}),Product.countDocuments(),Order.countDocuments(),Order.aggregate([{$match:{status:{$ne:"cancelled"}}},{$group:{_id:null,total:{$sum:"$total"}}}])]);res.json({users,farmers,products,orders,revenue:revenue[0]?.total||0});}catch(e){next(e)}});
router.get("/farmers",protect,roles("admin"),async(req,res,next)=>{try{res.json(await User.find({role:"farmer"}).select("-password").sort({createdAt:-1}));}catch(e){next(e)}});
router.patch("/farmers/:id/verify",protect,roles("admin"),async(req,res,next)=>{try{const f=await User.findOneAndUpdate({_id:req.params.id,role:"farmer"},{verified:Boolean(req.body.verified)},{new:true}).select("-password");if(!f)return res.status(404).json({message:"Farmer not found"});res.json(f);}catch(e){next(e)}});
export default router;
