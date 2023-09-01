
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';

export default function StaffDashboard() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [previewContent, setPreviewContent] = useState('');
  const [loading, setLoading] =useState(true)

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://collegeapps.onrender.com/all');
      console.log(response.data)
      setUsers(response.data);
      setLoading(false);
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
      const response = await axios.get(`https://collegeapps.onrender.com/download/${fname}`, {
        
        responseType: 'blob', 
        
      });

      const blob = new Blob([response.data]);
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    } catch (error) {
      console.error(error);
    }
  };
  const handlePreview = async (filename) => {
    const name = filename.split("uploads").pop();

    const name1 =name.split("");
    name1.shift()
    const fname = name1.join("");
    try {
      const response = await axios.get(`https://collegeapps.onrender.com/download/${fname}`, {
        responseType: 'blob',
      });

      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewContent(e.target.result);
        setSelectedUser({ filename });
      };
      reader.readAsDataURL(response.data);
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <div>
      <Navbar/>
    <div className="container">
  <h1 className="text-center mb-4 mt-4 form-title">Student Details</h1>
  {loading?(<div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
          <div className="spinner-border text-primary" role="status">
            
          </div>
        </div>):(
           <div className="table-responsive">
          <table className="table table-striped table-bordered">
          <thead className="thead-dark text-center">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Date and Time</th>
              <th>Resume</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.contact}</td>
                <td>{new Date(user.createdAt).toLocaleString()}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleDownload(user.pdfPath)}
                  >
                    Download
                  </button>
                    {" "}
                  <button
                        className="btn btn-secondary"
                        onClick={() => handlePreview(user.pdfPath)}
                      >
                        Preview
                      </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

        )}
  


  {selectedUser && (
        <div className="modal fade show" style={{ display: 'block' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">File Preview: {selectedUser.filename}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedUser(null)}
                ></button>
              </div>
              <div className="modal-body">
                {previewContent && (
                  <embed src={previewContent} type="application/pdf" width="100%" height="500px" />
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setSelectedUser(null)}
                >
                  Close
                </button>
                
              </div>
            </div>
          </div>
        </div>
      )}
</div>
</div>

  );
}


