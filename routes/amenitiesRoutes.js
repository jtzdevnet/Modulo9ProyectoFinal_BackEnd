import express from 'express';
import amenitiesController from '../controllers/amenitiesController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all amenities
router.get('/', protect, amenitiesController.getAllAmenities);

// Get an amenity by ID
router.get('/:id', protect, amenitiesController.getAmenityById);

// Get an amenity by Name
router.post('/name', protect, amenitiesController.getAmenityByName);

// Create a new amenity
router.post('/', protect, amenitiesController.createAmenity);

// Update an amenity
router.put('/:id', protect, amenitiesController.updateAmenity);

// Delete an amenity
router.delete('/:id', protect, amenitiesController.deleteAmenity);

export default router;