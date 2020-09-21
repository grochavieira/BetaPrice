import mongoose, { Document } from "mongoose";

interface IServiceModel extends Document {
  dev_id: string;
  client_id: string;
  description: string;
  price: number;
  limitDate: Date;
  createdAt: Date;
}

const ServiceSchema = new mongoose.Schema({
  dev_id: { type: String, required: true },
  client_id: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  limitDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IServiceModel>("Service", ServiceSchema);
