const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes')
const gptRoutes = require('./routes/gptRoutes')
const jobRoutes = require('./routes/jobRoutes');

const app = express();

app.use(cors());
app.use(express.json());

  
app.use('/api/auth', authRoutes);
app.use('/api/gpt', gptRoutes);

app.use('/api/jobs', jobRoutes);


module.exports = app;