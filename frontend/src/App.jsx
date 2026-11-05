import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import LoginPage from "./pages/Login.jsx";
import SigninPage from "./pages/Signin.jsx";
import Home from "./pages/Home.jsx";



function App() {

  //State
  const [user, setUser] = useState(null);

  //Comportement


  const HOST_BACK = "http://192.168.88.149:8000";
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage HOST_BACK={HOST_BACK} setUser={setUser} />} />
          <Route path="/signin" element={<SigninPage HOST_BACK={HOST_BACK} />} />
          <Route path="/home" element={<Home HOST_BACK={HOST_BACK} user={user} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
