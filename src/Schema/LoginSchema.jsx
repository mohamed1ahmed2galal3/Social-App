import * as zod from 'zod'


export const scheme = zod.object({
  email:zod.string().nonempty("Email is Required")
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ , "A valid email has text before @, a domain after it, and an extension of at least two letters."),
  password:zod.string().nonempty("Password is required")
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"A valid password must be at least 8 characters long and include uppercase and lowercase letters, plus at least one of numbers and one of special character.")
})