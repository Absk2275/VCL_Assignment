import React from 'react'
import { useNavigate } from "react-router-dom";
export default function Logout() {
    const Navigate=useNavigate()
    const handlelog=()=>{
        localStorage.removeItem("authToken");
       
        
        Navigate('/')
    }
    return(
        <div onClick={handlelog}>
           <div className="btn bg-white text-success mx-2">Logout</div>
        </div>
    )
}
