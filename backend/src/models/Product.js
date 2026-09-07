import mongoose from "mongoose";
const schema=new mongoose.Schema({name:{type:String,required:true,trim:true},category:{type:String,required:true},description:String,price:{type:Number,required:true,min:0},unit:{type:String,default:"kg"},stock:{type:Number,required:true,min:0},image:String,organic:{type:Boolean,default:false},farmer:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},location:{lat:Number,lng:Number,city:String,state:String},rating:{type:Number,default:0}},{timestamps:true});
export default mongoose.model("Product",schema);
