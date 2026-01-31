import * as zod from 'zod'
export const schema = zod.object({
  name:zod.string().nonempty("Name Is Required")
    .min(3,"Minimun Characters is 3")
    .max(15 , "Maximum Characters is 15"),
  email:zod.string().nonempty("Email Is Required")
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ , "A valid email has text before @, a domain after it, and an extension of at least two letters."),
  password:zod.string().nonempty("Password Is Required")
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"A valid password must be at least 8 characters long and include uppercase and lowercase letters, plus at least one of numbers and one of special character."),
  rePassword:zod.string().nonempty("Repassword Is Required"),
  dateOfBirth:zod.coerce.date("Date Is Required").refine((value)=>{
    const now = new Date().getFullYear();
    const birth = value.getFullYear();
    const diff = now - birth ;
    return diff >= 18 && diff <= 45
  },"You Age Must Be Less Than 45 and Greater Than 18" ),
  gender:zod.string().nonempty("Gender Is Required")
}).refine((data)=> data.password === data.rePassword , {path : ["rePassword"] , message:"Password and RePassword do not match"} )
