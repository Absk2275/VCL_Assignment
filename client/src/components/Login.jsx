import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";


const Login = ()=> {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [role, setRole] = useState("");


  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/loginuser", {
        email,
        password,
      });
      console.log(response);

      const { success, authToken: token, role: userRole, message: msg } = response.data;

      if (success) {
        setAuthToken(token);
        setRole(userRole);
        setMessage(msg);
      } else {
        setMessage(msg);
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred during login.");
    }
  };

  const renderContent = () => {
    if (authToken) {
      if (role === "staff") {
       navigate("./staff")
      } else if (role === "student") {
        navigate("./student")
      }
    }

    return (
      <form onSubmit={handleLogin}>
        <div>
            <h1>Login</h1>
          <label>Email:</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
        <p>{message}</p>
      </form>
    );
  };

  return (
    <div className="App">
      {renderContent()}
    </div>
  );
}

export default Login;
