import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/Login.jsx";
import SigninPage from "./pages/Signin.jsx";



function App() {

  const HOST_BACK = "http://192.168.88.143:8000";
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signin" element={<SigninPage HOST_BACK={HOST_BACK} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
