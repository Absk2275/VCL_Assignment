import React, { useState, useRef } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
export default function StudentPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [pdf, setPdf] = useState(null);
  const [success, setSuccess]= useState("");
  const [err, setErr]= useState("");
  const [loading, setLoading] = useState(false);

  const pdfInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('pdf', pdf);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('contact', contact);

    try {
      if(name==="" || pdf===""||email===""||contact==="")
      {
        setErr("All fields are required");
      }
      else{
        setLoading(true);
      await axios.post('https://collegeapps.onrender.com/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess("Your application submitted successfully");

      setName('');
      setEmail('');
      setContact('');
      setPdf(null);
      setErr('');
      if (pdfInputRef.current) {
        pdfInputRef.current.value = '';
      }
      setLoading(false);
    }
  } catch (error) {
      console.error(error);
      setErr("Email already in use please try with different email");
      setSuccess("");
    }
  };

  return (
    <div>
      <Navbar />
    
    <div className="studentMain">
    <div className="container" >
    <h1 className="text-center mb-4  form-title">Student Job Portal</h1>
    <form onSubmit={handleSubmit} className="border p-4 rounded bg-light">
    {loading && (
      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-1">
            <span className="spinner-border text-success spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            </div>
          )}
      <p className="text-center text-success">{success}</p>
      <p className="text-center text-danger">{err}</p>
      <div className="mb-3">
        <label htmlFor="name" className="form-label form-title">Name:</label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
         
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label form-title">Email:</label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          
        />
      </div>
      <div className="mb-3">
        <label htmlFor="contact" className="form-label form-title">Contact:</label>
        <input
          type="tel"
          className="form-control"
          id="contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          
        />
      </div>
      <div className="mb-3">
        <label htmlFor="pdf" className="form-label form-title">Upload Resume:</label>
        <input
          type="file"
          className="form-control"
          id="pdf" ref={pdfInputRef}
          onChange={(e) => setPdf(e.target.files[0])}
          accept=".pdf"
        />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  </div>
  </div>
  </div>
  );
}

