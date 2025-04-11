// controllers/jobController.js
const Job = require('../model/Job');
const fs = require('fs');

const addJob = async (req, res) => {
  try {
    const { company, role, jd, status } = req.body;
    const file = req.file;

    if (!company || !role || !jd || !status || !file) {
      return res.status(400).json({ message: 'All fields including resume are required' });
    }

    const newJob = new Job({
      user: req.user._id,
      company,
      role,
      jd,
      status,
      resumePath: file.filename,
    });

    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (err) {
    console.error('Add Job Error:', err.message);
    res.status(500).json({ message: 'Failed to add job' });
  }
};

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    console.error('Get Jobs Error:', err.message);
    res.status(500).json({ message: 'Failed to fetch jobs' });
  }
};

const deleteJob = async (req, res) => { 
  try {
    const job = await Job.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!job) return res.status(404).json({ message: 'Job not found' });

    // Delete uploaded resume
    if (job.resumePath) {
      const path = `uploads/${job.resumePath}`;
      if (fs.existsSync(path)) fs.unlinkSync(path);
    }

    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    console.error('Delete Job Error:', err.message);
    res.status(500).json({ message: 'Failed to delete job' });
  }
};

const updateJob = async (req, res) => {
    try {
      const job = await Job.findOneAndUpdate(
        { _id: req.params.id, user: req.user._id },
        { $set: req.body },
        { new: true }
      );
  
      if (!job) return res.status(404).json({ message: "Job not found" });
  
      res.json(job);
    } catch (err) {
      console.error("Update Job Error:", err.message);
      res.status(500).json({ message: "Failed to update job" });
    }
  };

module.exports = { addJob, getJobs, updateJob, deleteJob };
