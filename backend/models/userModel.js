const mongoose = require("mongoose");
// const Symptom = require("./symptomModel.js");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    symptoms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Symptom",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
