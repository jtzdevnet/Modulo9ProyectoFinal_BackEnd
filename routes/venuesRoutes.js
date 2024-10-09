import express from 'express';
import venuesController from '../controllers/venuesController.js'
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all venues
router.get('/', protect, venuesController.getAllVenues);

// Get a venue by ID
router.get('/:id', protect, venuesController.getVenueById);

// Create a new venue
router.post('/', protect, venuesController.createVenue);

// Update a venue
router.put('/:id', protect, venuesController.updateVenue);

// Delete a venue
router.delete('/:id', protect, venuesController.deleteVenue);

export default router;