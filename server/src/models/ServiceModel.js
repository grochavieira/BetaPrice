const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  dev_id: { type: String, required: true },
  client_id: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  limitDate: { type: Date, required: true },
  status: { type: String, default: "Em desenvolvimento..." },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Service", ServiceSchema);
