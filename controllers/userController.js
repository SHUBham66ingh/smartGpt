
import User from "../model/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import  {signupSchema} from "../validators/userValidators.js";


const createToken = (id , email)=>{
    if(!process.env.JWT_SECRET)
    {
        throw new Error("secret key is missing");
    }
    const token = jwt.sign({id , email} , process.env.JWT_SECRET , {expiresIn:"1h"});
    return token;
}



const cookiesOption = {
     httpOnly : true,
     secure : false,
     maxAge : 60 * 60 * 1000
}



export const signup = async ( req , res)=>{
      try{

        //validate this data
      const result =  signupSchema.safeParse(req.body);
         
     const{name , age , email , passowrd} = req.body;

     if(!name || !age || !email || !password)
     {
        res.status(400).json({
            message: "Some input is wrong"
        })
     }
     const user = await  User.findOne({email});

     if(user)
     {
        res.status(200).json({
            message:"Id already existed"
        })
     }

     const hashPassoword = await bcrypt.hash(password , 12);

     const userCreated = User.create({
         name , 
         age , 
         email,
         password:hashPassoword
     });

     // token create karna padega
     // _id, email : payload

     const token = createToken(userCreated._id , email , cookiesOption);

     res.status(201).json({
         message: "User created Successfully",
         name,
         age ,
         email
     });

    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({
            message : "Internal Server error"
        })
    }
}



export const login = async(req , res)=>{
    const {email , password} = req.body;
    try{
        if(!email|| !password)
        {
            res.status(400).json({
                message: "some input are not valid"
            })
        }

        const existingUser = User.findOne({email});

        if(!existingUser)
        {
            res.status(401).json({
                message:"Some field are not missing"
            })
        }

        const isMatch = await  bcrypt.compare(password , existingUser.password);

         if(!isMacth)
         {
           res.staus(400).json({
              message : "Password is wrong"
           })
         }
         
         const token = createToken(existingUser._id , email);

         res.cookie("token" , token , cookiesOption );

         res.status(200).json({
            message:"User Logged in SuccessFully",
            name: existingUser.name,
            age: existingUser.age,
            email: existingUser.email,
            usage: existingUser.usage
         });
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({
            message : "Interval server error"
        })
    }

}


export const logout = async(req , res)=>{

     res.clearCookie("token",{
        httpOnly:true,
        secure:false,
     })

     res.status(200).json({
        message:"User logout successfully"
     })
}



export const profile = async(req,res)=>{
    try{
        // profile ki informat send karo
        // Database ke andar call kari padegi, us user ko search, _id, email
        res.status(200).json({
            name:req.user.name,
            age: req.user.age,
            usage: req.user.usage,
            email: req.user.email
        })

    }
    catch(err){

        console.log(err);
        res.status(500).json({
            message: "Internal Server error"
        })
    }
}




