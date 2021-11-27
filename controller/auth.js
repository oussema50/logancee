const bcrypt = require('bcryptjs');
const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const {jwtSecret,jwtExpire} = require('../config/keys');
exports.signupController = async (req,res)=>{
    const {name,email,phone,userName,password} = req.body;
    try{
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                errorMessage:'this email already exist'
            });
        }
        const newUser = new User
        newUser.name = name;
        newUser.email = email;
        newUser.phone = phone;
        newUser.username = userName
        const salt= await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password,salt);
        await newUser.save();
        res.status(200).json({
            successMessage:'success please signin'
        })
    }catch(err){
        console.log('signupController error:' + err);
    }
}

exports.signinController = async(req,res)=>{
    const {email,password} = req.body
    try{
        const user = await User.findOne({email})
        
        if(!user){
           return res.status(400).json({
                errorMessage:'invalid credentials',
            }); 
        }
        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({
                errorMessage:'invalid credentials',
            });
        }
        const payload = {
            _id:user._id,
        }
        /*jwt.sign(payload,secretKey,option{expireIn:jwtExpire},(err,token)=>{
            
        })*/
        
        jwt.sign(payload,jwtSecret,{expiresIn:jwtExpire},(err,token)=>{
            if(err) console.log(err);
            const {_id,username,email,role} = user;
            res.json({
                token,
                user:{_id,username,email,role},
            });
        })
    }catch(err){
        console.log('signin controller error',err);
        res.status(500).json({
            errorMessage:'server error',
        });
    }
}