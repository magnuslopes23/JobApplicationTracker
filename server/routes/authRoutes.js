const express = require('express');
const router = express.Router();
const {registerUser, loginUser} = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');


router.get('/test', (req, res) => {
  res.json({ message: 'Auth route working!' });
});

router.post('/register', registerUser).post('/login', loginUser);

router.get('/me', protect, (req, res) => {
    res.json(req.user); // You’ll get user info (except password)
});

module.exports = router;
