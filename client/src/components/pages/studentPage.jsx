import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [pdf, setPdf] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('pdf', pdf);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('contact', contact);

    try {
      await axios.post('http://localhost:5000/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('User created successfully');
    } catch (error) {
      console.error(error);
      alert('Error creating user');
    }
  };

  return (
    <div>
      <Navbar />
    
    <div style={{ backgroundColor: "#228cdc", height: "100vh", width:"100%" }}>
    <div className="container" >
    <h1 className="text-center mb-4">User Registration</h1>
    <form onSubmit={handleSubmit} className="border p-4 rounded">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name:</label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email:</label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="contact" className="form-label">Contact:</label>
        <input
          type="text"
          className="form-control"
          id="contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="pdf" className="form-label">Upload PDF:</label>
        <input
          type="file"
          className="form-control"
          id="pdf"
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

export default App;