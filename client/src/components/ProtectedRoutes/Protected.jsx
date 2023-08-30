
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Protected(props) {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");

  const { Component } = props;

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setLogin(token);

    if (!token) {
      navigate("/home");
    }
  }, []); 

  return (
    <div>
      {login ? <Component /> : null}
    </div>
  );
}

