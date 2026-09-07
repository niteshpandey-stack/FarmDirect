import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  name: { type: String, required: true, trim: true },
  phone: { type: String, trim: true },
  availability: { type: String, enum: ['available', 'busy', 'offline'], default: 'offline' },
  latitude: Number,
  longitude: Number,
  lastLocationUpdate: Date,
  rating: { type: Number, min: 0, max: 5, default: 5 },
  currentDeliveryCount: { type: Number, min: 0, default: 0 },
  vehicleType: { type: String, default: 'Bike' },
  verified: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('DeliveryPartner', schema);
