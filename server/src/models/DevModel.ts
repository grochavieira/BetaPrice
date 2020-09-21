import mongoose, { Document } from "mongoose";

export interface IDevModel extends Document {
  name: string;
  email: string;
  telephone: string;
  technologies: Array<string>;
  portfolio: string;
  bio: string;
  avatar_url: string;
  stars: string;
  username: string;
  password: string;
}

const DevSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  telephone: { type: String, required: true },
  technologies: { type: [String], required: true },
  portfolio: { type: String, required: true },
  bio: { type: String, required: true },
  avatar_url: { type: String, required: true },
  stars: { type: String, default: 0 },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.model<IDevModel>("Dev", DevSchema);
