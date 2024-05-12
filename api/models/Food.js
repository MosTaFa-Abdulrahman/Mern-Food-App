const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    cookTime: { type: String, required: true },
    imageUrl: { type: String, required: true },
    tags: { type: [String] },
    origins: { type: [String], required: true },
    price: { type: Number, required: true },
    stars: { type: Number, default: 3 },
    favorite: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

module.exports = mongoose.model("Food", FoodSchema);
