import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken';

 const JWT_SECRET = process.env.JWT_SECRET
 export const authenticateToken = (req, res , next)=>{
    // when user send req. to the backend which is protected by jwt token.
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token){
        return res.status(401).json({msg:"token is not provided"})
    }

    jwt.verify(token , JWT_SECRET , (err , user)=>{
        if(err){
            return res.status(401).json({msg:"  token is wrong"});
        }
        req.user = user;  //creating new object user inside request object that contains info. about the user.
        // console.log("inside authmiddleware - req.user is", req.user);

        next();
    })
 }