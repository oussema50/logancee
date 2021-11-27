const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config/keys');
exports.authentecatJwt = (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
      return  res.status(401).json({
            errorMessage:'no token, authorization denied'
        }) 
    }  

    try{
      const decoded =  jwt.verify(token,jwtSecret);
      req.user = decoded._id
      next();
    }
    catch(err){
        console.log(err);
        res.status(401).json({
            errorMessage:'invalid token'
        });
    }
}