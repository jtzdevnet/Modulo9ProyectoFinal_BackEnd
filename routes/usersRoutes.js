// routes/users.js
import express from 'express';
import usersController from '../controllers/usersController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all users
router.get('/', protect, usersController.getAllUsers);

// Get user by ID
router.get('/:id', protect, usersController.getUserById);

// Create a new user
router.post('/', protect, usersController.createUser);
router.post('/registro', usersController.createUser);
router.post('/login', usersController.loginUser)

// Update a user
router.put('/:id', protect, usersController.updateUser);

// Delete a user
router.delete('/:id', protect, usersController.deleteUser);

// Testing route
router.post('/test', usersController.testUser);
router.post('/test-pass', usersController.testPass);

export default router;
