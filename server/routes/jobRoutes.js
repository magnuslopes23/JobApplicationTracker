// routes/jobRoutes.js
const express = require('express');
const multer = require('multer');
const protect = require('../middleware/authMiddleware');
const { addJob, getJobs, updateJob, deleteJob } = require('../controllers/jobController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.use(protect);

router.post('/', upload.single('resume'), addJob);
router.get('/', getJobs);
router.delete('/:id', deleteJob);
router.put('/:id', updateJob);


module.exports = router;
