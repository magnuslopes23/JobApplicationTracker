// models/Job.js
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  company: String,
  role: String,
  jd: String,
  status: {
    type: String,
    enum: ['Applied', 'Interviewed', 'Accepted', 'Rejected'],
    default: 'Applied',
  },
  resumePath: String,
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
