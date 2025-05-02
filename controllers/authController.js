import dotenv from 'dotenv'
dotenv.config()
import bcrypt from 'bcrypt'
import User from '../models/user.model.js'
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET 

export const signup = async (req, res)=>{
    const {name ,email , password }= req.body //user input
    const existingUser = await User.findOne({email}) 
    if(existingUser){return res.status(400).json({message:"email already exist"})}
    const  hashedPassword = await bcrypt.hash(password , 8);
    const newUser =new User({name:name , email:email , password:hashedPassword})
   await newUser.save()

   //creating jwt token 
   const token = jwt.sign({id:newUser._id , email: newUser.email}, JWT_SECRET , {expiresIn: "1hr"})
    
   res.status(201).json({message:"successfully registetred", token , 
    user:{id:newUser._id , name: newUser.name , email: newUser.email}
});
}
export const login =async  (req, res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email})

    if(!user){return res.status(404).json({msg:"user not found!! please signup"})}

    const passMatch = await bcrypt.compare(password , user.password); // user.password -> hashed password , password-> user input 
    if(!passMatch){return res.status(401).json({message:"Invalid password"})}

    // created jwt for login
    const token = jwt.sign({id:user._id , email: user.email}, JWT_SECRET , {expiresIn: '1hr'})
    res.status(200).json({message:"successfully login",token, 
    user:{id: user._id , email: user.email , name:user.email}});
}

export const profile= async (req, res)=>{
    res.json({msg:"welcome to user profile ", user:req.user}) //routes comes here  after middleware so it stores user into req.user
}


 