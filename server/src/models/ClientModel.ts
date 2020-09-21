import mongoose, { Document } from "mongoose";

export interface IClientModel extends Document {
  name: string;
  email: string;
  telephone: string;
  username: string;
  password: string;
}

const ClientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  telephone: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.model<IClientModel>("Client", ClientSchema);
