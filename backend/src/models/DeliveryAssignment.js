import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true, unique: true },
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  deliveryPartner: { type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryPartner', required: true },
  status: { type: String, enum: ['assigned', 'accepted', 'pickup', 'out_for_delivery', 'delivered', 'cancelled'], default: 'assigned' },
  pickupLocation: { latitude: Number, longitude: Number, address: String },
  deliveryLocation: { latitude: Number, longitude: Number, address: String },
  partnerLocation: { latitude: Number, longitude: Number, updatedAt: Date },
  assignedAt: { type: Date, default: Date.now },
  acceptedAt: Date,
  pickedUpAt: Date,
  deliveredAt: Date,
  notes: String
}, { timestamps: true });

export default mongoose.model('DeliveryAssignment', schema);
