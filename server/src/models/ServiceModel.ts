import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  dev_id: { type: String, required: true },
  client_id: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  limitDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Service", ServiceSchema);
