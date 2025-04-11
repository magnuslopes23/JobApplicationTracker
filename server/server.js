const app = require('./app')
const dotenv = require('dotenv')
const connectDB = require('./config/connect');

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB(); 

app.listen(PORT, () =>{
    console.log("server running on", PORT)
})
