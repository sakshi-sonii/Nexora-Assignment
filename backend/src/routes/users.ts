import { Router } from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/userController';
import { authenticateToken } from '../middlewares/auth';

const router = Router();

// Route for user registration
router.post('/register', registerUser);

// Route for user login
router.post('/login', loginUser);

// Route for getting user profile (protected)
router.get('/profile', authenticateToken, getUserProfile);

export default router;