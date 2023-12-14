const mongoose = require("mongoose");

const carsSchema = mongoose.Schema({
  marque: { type: String },
  modele: String,
  typeBoite: String,
  puissanceF: String,
  carburant: { type: String },
  annee: { type: Number },
  images: { type: [String] },
  serie: Number,
  orderV: Number,
  created_at: String,
});

module.exports = mongoose.model("cars", carsSchema);
