// client/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/all');
      console.log(response.data)
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownload = async (filename) => {
   const name = filename.split("uploads").pop();

   const name1 =name.split("");
   name1.shift()
   const fname = name1.join("");
    try {
      const response = await axios.get(`http://localhost:5000/download/${fname}`, {
        
        responseType: 'blob', // Set response type to 'blob'
        
      });

      const blob = new Blob([response.data]);
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename; // Set the download attribute
      link.click();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center mb-4">User Details</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Date and Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.contact}</td>
              <td>{new Date(user.createdAt).toLocaleString()}</td>
              <td>
                <button
                  className="btn btn-link"
                  onClick={() => handleDownload(user.pdfPath)}
                >
                  Download PDF
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
