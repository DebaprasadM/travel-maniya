// routes/contact.js
const express = require('express');
const { body } = require('express-validator');
const rateLimit = require('express-rate-limit');
const router = express.Router();
const contactController = require('../controllers/contactController');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: 'Too many requests from this IP, please try later.'
});

router.post(
  '/',
  limiter,
  [
    body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 120 }),
    body('email').trim().isEmail().withMessage('Valid email required'),
    body('phone').optional({ checkFalsy: true }).trim().isLength({ min: 6, max: 20 }),
    body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 2000 }),
  ],
  contactController.saveMessage
);

/* ---------------- ADMIN: VIEW ALL MESSAGES ---------------- */
router.get(
  '/',
  contactController.getAllMessages
);

// ADMIN: delete message
router.delete(
  '/:id',
  contactController.deleteMessage
);


module.exports = router;
