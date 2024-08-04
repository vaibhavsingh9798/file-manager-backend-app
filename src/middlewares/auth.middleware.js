
const jwt = require('jsonwebtoken')
const ApiError = require("../utils/ApiError")
const {User} = require('../models')


const verifyJWT = async (req,res,next) =>{
    try{
   
        const token =  req.header('Authorization')?.replace('Bearer ',"")
        if(!token){
            throw new ApiError(401,'Unauthorized request')
        }

        const decodedToken = jwt.verify(token,process.env.JWT_SECRET)
        const user = await User.findByPk(decodedToken.userId)
        req.user = user
         next()
    }catch(error){
       throw new ApiError(401,'Unauthorized user')
    }
}

module.exports = verifyJWT ;  