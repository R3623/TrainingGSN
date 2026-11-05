import { TextField, Button } from "@mui/material";
import { useState } from "react";
function Login({ HOST_BACK }) {
  //State
  const [loginData, setLoginData] = useState({
    loginput: "",
    password: "",
  });

  const [estErreur, setEstErreur] = useState(false);
  const [message, setMessage] = useState("");

  //Comportement

  const handleChanged = (e) => {
    const [name, value] = [e.target.name, e.target.value];
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    let body = {};
    body.password = loginData.password;

    e.preventDefault();
    const condition = loginData.loginput.includes("@") ? "email" : "username";
    body[condition] = loginData.loginput;

    console.log(`${HOST_BACK}/api/login/`);

    try {
      console.log(`${HOST_BACK}/api/login/`);
      let response = await fetch(`${HOST_BACK}/api/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      response = await response.json();
      console.log(response);

      
    
      if (response.status >= 400) {
        setEstErreur(true);
        setMessage(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Render

  return (
    <>
      <div>
        <form action="">
          <h2>Se connecter</h2>
          <label htmlFor="">Username or email</label>
          <TextField
            name="loginput"
            label="username or email"
            value={loginData.loginput}
            onChange={handleChanged}
            // inputRef={User_email}
          />
          <label htmlFor="">Password</label>
          <TextField
            name="password"
            label="Password"
            value={loginData.password}
            onChange={handleChanged}
          />

          <Button type="submit" onClick={handleSubmit}>
            {" "}
            Se connecter
          </Button>
          <div
          className = {`text-3xl text-red-500 ${estErreur ? 'block' : 'hidden'}`}
        >
          {message}
        </div>
        </form>
      </div>
    </>
  );
}

export default Login;
