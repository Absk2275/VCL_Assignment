import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Protected(props) {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setLoggedIn(!!token);
    if (!token) {
      navigate('/');
    }
  },[navigate]);

  if (!loggedIn) {
    return null;
  }

  return <div>{props.children}</div>;
}






