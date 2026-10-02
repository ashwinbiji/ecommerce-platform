const express = require('express');
const router = express.Router();
const { registerUser, authUser, getUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware'); // Import middleware

router.post('/', registerUser);
router.post('/login', authUser);

// Use .get() and add 'protect' as the second argument
router.get('/profile', protect, getUserProfile); 

module.exports = router;