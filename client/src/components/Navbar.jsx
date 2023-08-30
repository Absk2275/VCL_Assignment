import React from 'react'
import Logout from './Logout'
export default function Navbar() {
  return (
        <div>
            <nav className="topnav">
                <span className="navbar-brand p-3" href="#">College</span>
               
                <div className="" >
                    <ul className="navbar-nav ">
                      
                        <li className="nav-item p-3">
                            <Logout />
                        </li>
                        
                    </ul>
                </div>
            </nav>
        </div>
    )
}
