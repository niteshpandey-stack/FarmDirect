import mongoose from "mongoose";
const schema=new mongoose.Schema({name:{type:String,required:true,trim:true},email:{type:String,required:true,unique:true,lowercase:true,trim:true},password:{type:String,required:true,select:false},role:{type:String,enum:["buyer","farmer","admin","delivery_partner"],default:"buyer"},phone:String,address:String,location:{lat:Number,lng:Number,city:String,state:String},verified:{type:Boolean,default:false}},{timestamps:true});
export default mongoose.model("User",schema);
