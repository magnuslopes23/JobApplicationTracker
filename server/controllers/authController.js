const User = require('../model/User')
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) =>{
    const {name, email, password} = req.body;
    try{
        const existingUser = await User.findOne({email})
     
        if(existingUser) 
            return res.status(400).json({message: 'User Already Exist'});
        const hashedPassword = await bycrypt.hash(password, 10);
        const user = await User.create({name, email, password: hashedPassword});
        console.log("SIGNING TOKEN WITH SECRET:", process.env.JWT_SECRET);

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: '1D'
        })
        res.status(201).json({
            message:"User registered Successfully",
            user:{
                id: user._id,
                name: user.name,
                email: user.email
            },
            token
        });
    }catch (e){
        console.log(e)
        res.status(500).json({message:'Internal Server Error'});
    }
}

const loginUser = async (req, res) =>{
    const {email, password} = req.body;
    try{
        const existingUser = await User.findOne({email})
        if(!existingUser) 
            return res.status(404).json({message: 'User not Found'});
        const isMatch = await bycrypt.compare(password, existingUser.password)
        if(!isMatch) 
            return res.status(401).json({message:"Invalid Creds"})
        console.log("SIGNING TOKEN WITH SECRET:", process.env.JWT_SECRET);

        const token = jwt.sign({id: existingUser._id}, process.env.JWT_SECRET, {
            expiresIn: '1D'
        })
        
        res.status(201).json({
            message:"User Logged In Successfully",
            user:{
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email
            },
            token
        });
    }catch (e){
        console.log(e)
        res.status(500).json({message:'Internal Server Error'});
    }
}

module.exports = {registerUser, loginUser};