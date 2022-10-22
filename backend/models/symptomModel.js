const mongoose = require("mongoose");

const symptomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    painLevel: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Symptom = mongoose.model("Symptom", symptomSchema);
module.exports = Symptom;
