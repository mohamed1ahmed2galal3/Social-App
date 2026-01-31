import { createContext, useEffect, useState } from "react";
import { getLoggedUserData} from "../Services/userService";



export const AuthContext = createContext();

export default function AuthContextProvider({children}){

    const [userData, setUserData] = useState(null);
    const [updatePost, setUpdatePost] = useState(null);

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") !== null );

    async function getUserData() {
        const response = await getLoggedUserData();
        if(response.message == 'success'){
            setUserData(response.user);
        }
    }

    useEffect(()=>{
        if(isLoggedIn){
            getUserData();
            
        }
    },[isLoggedIn])



    return <AuthContext.Provider value={{ isLoggedIn , setIsLoggedIn , userData, setUserData ,updatePost, setUpdatePost}}>
        {children}
    </AuthContext.Provider>
}