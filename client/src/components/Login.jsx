import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [role, setRole] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (email === "" || password === "") {
        setErr("All fields are required");
      }
      else {
        setLoading(true);
        setErr("");
        setMessage("");
        const response = await axios.post("http://localhost:5000/loginuser", {
          email,
          password,
        });

        const { success, authToken: token, role: userRole, message: msg } = response.data;



        if (success) {
          setAuthToken(token);
          setRole(userRole);
          setMessage(msg);
          localStorage.setItem("authToken",token);
        } else {
          setMessage(msg);
        }
      }
    } catch (error) {
      console.error(error);
      setErr("Invalid Credentials");

    } finally {
      setLoading(false);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (authToken) {
      if (role === "staff") {
        navigate("./staff");
      } else if (role === "student") {
        navigate("./student");
      }
    }
  }, [authToken, role, navigate]);

  return (
    <div>

      <section className="100vh" style={{ backgroundColor: "#228cdc", height: "100vh" }}>
        <div className="container h-100 lg-h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11" >
              <div className="card text-black h-75 my-2"  >
                <div className="card-body p-md-5" >
                  <div className="row justify-content-center " >
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                      <p className="text-center h1 fw-bold mb-3 mx-1 mx-md-4 ">Login</p>

                      <form className="mx-1 mx-md-4" >
                        <p>{message}</p>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-1">
                          <span disabled={loading}> 
                            {loading ? <span className="spinner-border text-success spinner-border-sm me-2" role="status" aria-hidden="true"></span> : null} {/* Show the loading icon while loading */}

                          </span>
                        </div>


                        {err ? <p className='text-danger text-center'>{err}</p> : ""}

                        <div className="d-flex flex-row align-items-center mb-2">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                            <input type="email" id="form3Example3c" className="form-control" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                          </div>
                        </div>


                        <div className="d-flex flex-row align-items-center mb-2">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0 form-group">

                            <label className="form-label" htmlFor="form3Example4c">Password</label>
                            <input type={showPassword ? "text" : "password"} id="form3Example4c" className="form-control" aria-describedby="basic-addon2" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                          </div>
                          <div className="input-group-append mt-4 flex-fill form-group">
                            <span className="input-group-text text-center" style={{ paddingTop: "10px", paddingBottom: "10px", marginTop: "8px" }} onClick={handleShowPassword}>
                              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                            </span>
                          </div>
                        </div>





                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-1">
                          <button type="submit" className="btn btn-primary btn-lg" onClick={handleLogin}>Login</button>
                        </div>

                      </form>



                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                      <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                        className="img-fluid loginimg" alt="Sample_image" />

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>


  )
}










