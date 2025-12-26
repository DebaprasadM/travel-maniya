// controllers/contactController.js
const { validationResult } = require("express-validator");
const ContactMessage = require("../model/ContactMessage");
// const sendMail = require('../utils/mailer'); // optional

exports.saveMessage = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { name, email, phone, message } = req.body;

    const contact = new ContactMessage({
      name,
      email,
      phone,
      message,
      ip: req.ip,
      userAgent: req.get("User-Agent") || "",
    });

    await contact.save();

    // Optional: send notification email to admin
    // await sendMail({ to: 'support@wanderscape.com', subject: 'New Contact Message', text: `${name} - ${message}` });

    return res.status(201).json({ success: true, message: "Message saved" });
  } catch (err) {
    next(err);
  }
};

// GET all contact messages (for admin)
exports.getAllMessages = async (req, res, next) => {
  try {
    const messages = await ContactMessage
      .find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: messages,
    });
  } catch (err) {
    next(err);
  }
};


exports.deleteMessage = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = await ContactMessage.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

