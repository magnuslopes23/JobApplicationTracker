const mongoose = require('mongoose');

const connectDB = async () => {
  const isProduction = process.env.NODE_ENV === 'production';
  const uri = isProduction ? process.env.MONGO_URI_PROD : process.env.MONGO_URI_LOCAL;
  console.log(uri)

  try {
    await mongoose.connect(uri);
    console.log(`✅ MongoDB connected to ${isProduction ? 'Atlas' : 'Local'} database`);
  } catch (err) {
    console.error('❌ DB Connection Error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
