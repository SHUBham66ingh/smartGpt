import jwt from "jsonwebtoken";
import User from "../model/userSchema.js";
import dotenv from "dotenv";


const authUserMiddleware =  async(req , res , next)=>{
     try{
         const {token} = req.cookies;

           if(!token){
            return res.status(401).json({
                message: "You need to login First"
            })
        }

         const payload = jwt.verify(token , process.env.JWT_SECRET_KEY);

         const existingUser = await User.findById(payload.id);

         if(!existingUser){
            res.status(404).json({
                message : "user is not founded"
            })
         }

         req.user = existingUser;
         next();
     }
     catch(err)
     {
        console.log(err);
        res.status(500).json({
            message : "Inteval server error"
        })
     }
}


export default authUserMiddleware;
