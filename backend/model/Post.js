const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String },             // full blog body (optional)
  category: { type: String, default: 'Travel' },
  image: { type: String, default: '/placeholder.jpg' }, // image URL
  date: { type: Date, default: Date.now },
   details: [{ type: String }],
  slug: { type: String, index: true },   // optional friendly url
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
