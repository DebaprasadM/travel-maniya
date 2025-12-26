const Tour = require('../model/Tour');

// GET all
exports.getTours = async (req, res) => {
  try {
    const { page = 1, limit = 12 } = req.query;

    const tours = await Tour.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Tour.countDocuments();

    res.json({ success: true, data: tours, total });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET single
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ success: false, message: "Not found" });

    res.json({ success: true, data: tour });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// CREATE
exports.createTour = async (req, res) => {
  try {
    const newTour = new Tour(req.body);
    const saved = await newTour.save();
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// UPDATE
exports.updateTour = async (req, res) => {
  try {
    const updated = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// DELETE
exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
