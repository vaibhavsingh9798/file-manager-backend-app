
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError')
const  {User}  = require('../db');
const { where } = require('sequelize');
const ApiResponse = require('../utils/ApiResponse');
const asyncHnadler = require('../utils/asyncHandler');


exports.register = asyncHnadler ( async (req, res) => {
  const {username,email,password} = req.body;
    
  if( [username,email,password].some((field) => field?.trim() === "")){
      throw new ApiError(400,"All field are required")
  }

   
    const exitedUser = await User.findOne({where:{email}})

    if(exitedUser){
        throw new ApiError(409, "User already exist with username or email")
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username,email, password: hashedPassword });
    const createdUser = await User.findByPk(user.id, {attributes : {exclude : ['password']} })
    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registring the user")
       }

   return  res.status(201).json( new ApiResponse(200,createdUser,"User registred successfully") )


})

exports.login =  asyncHnadler (async (req, res) => {
  const { email, password } = req.body;
      if( ! email){
        throw new ApiError(400,'email is required')
      }
    
      const user = await User.findOne({where:{email}})
      if(!user){
        throw new ApiError(404,'User does not exist')
    }

    const isPasswordValid = await bcrypt.compare(password,user.password)
    if(!isPasswordValid){
        throw new ApiError(401,'Invalid user credentials')
    }
  
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    const loggedInUser = await User.findByPk(user.id,{attributes : {exclude : ['password']}})
    return res.status(200)
    .json(new ApiResponse(
     200,
     {user:loggedInUser , token},
     'User logged In Successfully'
    ))

  
})
