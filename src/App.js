
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './pages/Signup';
import Login from './pages/Login';
import Transporter from './pages/Transporter';
import Manufacturer from './pages/Manufacturer';


function App() {
  return (
    <BrowserRouter >
    
  
   <Routes>

   <Route exact path="/" element={<Signup/>}/>
   <Route  path="/login" element={<Login/>}/>
   <Route  path="/transporter" element={<Transporter/>}/>
   <Route  path="/manufacturer" element={<Manufacturer/>}/>
   </Routes>

 </BrowserRouter>
  );
}

export default App;
