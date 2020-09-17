import mongoose from "mongoose";

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

export default mongoose.model("Dev", DevSchema);
