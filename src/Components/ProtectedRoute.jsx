import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import AuthContextProvider, { AuthContext } from "../Context/AuthContext";


export function ProtectedRoute({children}){

    const {isLoggedIn} = useContext(AuthContext)

    return isLoggedIn ? children : <Navigate to={"/login"}/>;
}