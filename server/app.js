const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const authRoutes = require('./routes/authRoutes');
const gptRoutes = require('./routes/gptRoutes');
const jobRoutes = require('./routes/jobRoutes');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');

const app = express();

app.use(helmet());

app.use((req, res, next) => {
    mongoSanitize.sanitize(req.body);
    next();
  });
  
  

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, 
    message: 'Too many requests from this IP, please try again later.'
  });
  app.use(limiter);

app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/gpt', gptRoutes);
app.use('/api/jobs', jobRoutes);

module.exports = app;
