import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import StudentPage from './components/pages/studentPage';
import StaffPage from './components/pages/staffPage';
import Login from './components/Login';
import Protected from './components/ProtectedRoutes/Protected';

function App() {
  return (
    <BrowserRouter>
       <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/student" element={<StudentPage />} /> 
        <Route exact path="/staff" element={<StaffPage />} /> 
        <Route path='/home' element = {<Protected Component={Login}/>}/>
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
