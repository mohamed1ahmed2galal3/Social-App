import axios from "axios";
import { tr } from "zod/locales";


export async function sendRegisterDate(values){
    try{
        const {data} = await axios.post("https://linked-posts.routemisr.com/users/signup" ,values);
        return data
    }catch(err){
        return err.response.data
    }
    
}