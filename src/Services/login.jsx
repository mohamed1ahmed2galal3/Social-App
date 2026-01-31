import axios from "axios";


export async function sendLoginData(values){
    try{
        const {data} =await axios.post("https://linked-posts.routemisr.com/users/signin",values);
        return data;
    }catch(err){
        return err.response.data;
    }
}



