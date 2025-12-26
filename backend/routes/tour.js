const express = require('express');
const router = express.Router();

const {
  getTours,
  getTour,
  createTour,
  updateTour,
  deleteTour
} = require('../controllers/tourController');

router.get('/', getTours);
router.get('/:id', getTour);
router.post('/', createTour);
router.put('/:id', updateTour);
router.delete('/:id', deleteTour);

module.exports = router;
