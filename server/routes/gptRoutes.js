const express = require('express');
const multer = require('multer');
const { optimizeResume } = require('../controllers/gptController');

const router = express.Router();

// Save uploaded file temporarily
const upload = multer({ dest: 'uploads/' });

router.post('/optimize-resume', upload.single('resume'), optimizeResume);

module.exports = router;
