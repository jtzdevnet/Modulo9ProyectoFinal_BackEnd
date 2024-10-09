// routes/reservations.js
import express from 'express';
import reservationsController from '../controllers/reservationsController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all reservations
router.get('/', protect, reservationsController.getAllReservations);

// Get a reservation by ID
router.get('/:id', protect, reservationsController.getReservationById);

// Create a new reservation
router.post('/', protect, reservationsController.createReservation);

// Update a reservation
router.put('/:id', protect, reservationsController.updateReservation);

// Delete a reservation
router.delete('/:id', protect, reservationsController.deleteReservation);

export default router;