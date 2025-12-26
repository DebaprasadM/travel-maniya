const mongoose = require("mongoose");

const TourSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: String, required: true },
    excerpt: { type: String, required: true },
    details: [{ type: String }],
    days: { type: String, default: "2–3 Days" },
    image: { type: String, default: "/placeholder.jpg" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tour", TourSchema);
