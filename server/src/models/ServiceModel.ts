import mongoose, { Document } from "mongoose";

export interface IServiceModel extends Document {
  dev_id: string;
  client_id: string;
  description: string;
  price: number;
  limitDate: Date;
}

const ServiceSchema = new mongoose.Schema({
  dev_id: { type: String, required: true },
  client_id: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  limitDate: { type: Date, required: true },
  status: { type: String, default: "Em desenvolvimento..." },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IServiceModel>("Service", ServiceSchema);
