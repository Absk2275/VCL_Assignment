import React from 'react'
import Logout from './Logout';
import image from "./images/logo.png";
export default function Navbar() {
  return (
        <div>
            <nav className="topnav">
                <span className="navbar-brand p-3" href="#">
                    <img src={image} alt="logo" style={{height:"16%", width:"16%"}}/>
                   <span className="lg-fs-4"> Sikkim University</span>
                </span>
               
                <div className="" >
                    <ul className="navbar-nav ">
                        {(localStorage.getItem("authToken"))?(<li className="nav-item p-3">
                            <Logout />
                        </li>): ""}
                      
                        
                        
                    </ul>
                </div>
            </nav>
        </div>
    )
}
