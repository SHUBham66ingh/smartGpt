import {z} from zod;



export const signupSchema =  z.object({
    name : z.string()
            .trim()
             .min(3 , "Minumum lenght of name should be 3 ")
             .max(30 , "Maxmimum length of name should be 30"),
    age : z.number()
           .min(10 , "Minimun age should be 10")
           .max(100 , "Maximum age should be 100")
           .optional(),
    email : z.email(),
    password:
     z.sring()
     .min(8)
     .max(30)
     .regez(/[A-Z]/,"Your password should have atleast 1 capital letter")
     .regex(/[a-z]/,"Your password should have atleast 1 small letter")
})