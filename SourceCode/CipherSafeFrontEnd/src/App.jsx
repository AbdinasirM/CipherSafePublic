import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPageComponents from "./components/LandingPageComponents";
import HomeComponent from "./components/homeComponents";
import SigninComponent from "./components/SigninComponent";
import SignupComponent from "./components/SignupComponent";
import GeneratePasswordComponent from "./components/GeneratePasswordComponent";
function App() {
  return (
    <>
    
 <Router>
        <Routes>
          <Route path="/" element={<LandingPageComponents />} />
          <Route path="/home" element={<HomeComponent  />} />
          <Route path="/signin" element={< SigninComponent/>} />
          <Route path="/signup" element={< SignupComponent/>} />
          <Route path="/generate" element={< GeneratePasswordComponent/>} />
                    
        </Routes>
      </Router>      
    </>
  );
}

export default App;
