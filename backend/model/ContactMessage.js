
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 120 },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, trim: true },
  message: { type: String, required: true, trim: true, maxlength: 2000 },
  ip: { type: String },
  userAgent: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('ContactMessage', contactSchema);
