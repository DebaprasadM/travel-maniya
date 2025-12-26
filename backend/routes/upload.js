const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// Multer temp storage
const upload = multer({ dest: "uploads/" });

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Upload route
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "tours",
    });

    fs.unlinkSync(req.file.path);

    res.json({ url: result.secure_url });
  } catch (err) {
    res.status(500).json({ message: "Upload failed", error: err });
  }
});

module.exports = router;
