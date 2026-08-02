import jwt from "jsonwebtoken";
import User from "..model/userSchema.js";


const authMiddleware =  async(req , res , next)=>{
     try{
         const {token} = req.cookies;

         const payload = jwt.verify(token , process.env.JWT.SECRET_KEY);

         const existingUser = await findOne({payload_id});

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
        res.staus(500).json({
            message : "Inteval server error"
        })
     }
}


export default authUserMiddleware;
