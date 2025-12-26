const Post = require('../model/Post');

// GET all (with pagination)
exports.getPosts = async (req, res) => {
  try {
    const { page = 1, limit = 12, q } = req.query;
    const filter = q ? { title: new RegExp(q, 'i') } : {};
    const posts = await Post.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Post.countDocuments(filter);
    res.json({ success: true, data: posts, total });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET one
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: post });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// CREATE
exports.createPost = async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const saved = await newPost.save();
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// UPDATE
exports.updatePost = async (req, res) => {
  try {
    const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// DELETE
exports.deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
