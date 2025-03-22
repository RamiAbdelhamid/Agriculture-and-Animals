const mongoose = require("mongoose");

const vetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    department: { type: String, required: true },
    experience: { type: Number, required: true },
    rating: { type: Number, default: 4.5 },
    reviewCount: { type: Number, default: 0 },
    specializations: { type: [String], required: true },
  },
  { timestamps: true }
);

const Vet = mongoose.model("Vet", vetSchema);

module.exports = Vet;
