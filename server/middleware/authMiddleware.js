const User = require('../model/User')
const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader && !authHeader.startsWith('Bearer')){
        return res.status(401).json({message: 'Not Authorized, token missing'});
    }

    const token = authHeader.split(' ')[1];

    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET)

        req.user = await User.findById(decode.id).select('-password');

        next();

    }catch (err){
        console.error('Auth Error:', err.message);
        res.status(401).json({ message: 'Invalid or expired token' });
    }
}

module.exports = protect