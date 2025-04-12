const express = require('express');
const multer = require('multer');
const { body, validationResult } = require('express-validator');
const protect = require('../middleware/authMiddleware');
const { addJob, getJobs, updateJob, deleteJob } = require('../controllers/jobController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

const validateJobFields = [
  body('company').notEmpty().withMessage('Company is required'),
  body('role').notEmpty().withMessage('Role is required'),
  body('jd').notEmpty().withMessage('Job description is required'),
  body('status')
    .isIn(['Applied', 'Interviewed', 'Accepted', 'Rejected'])
    .withMessage('Invalid status'),
];

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.use(protect);

router.post(
  '/',
  upload.single('resume'),
  validateJobFields,
  handleValidation,
  addJob
);

router.get('/', getJobs);

router.delete('/:id', deleteJob);

router.put(
  '/:id',
  validateJobFields,
  handleValidation,
  updateJob
);

module.exports = router;
