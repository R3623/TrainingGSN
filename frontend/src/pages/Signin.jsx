import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = ({ HOST_BACK }) => {
  //State
  const [signin_data, setSigninData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });
  const navigate = useNavigate();

  const [estErreur, setEstErreur] = useState(false);
  const [message, setMessage] = useState("")

  //Comportement

  const handleChange = (e) => {
    const [name, value] = [e.target.name, e.target.value];
    setSigninData({ ...signin_data, [name]: value });
  }

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      console.log(`${HOST_BACK}/api/signin`);
      let response = await fetch(`${HOST_BACK}/api/signin/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signin_data),
      });

      response = await response.json();

      if (response.status == 200) {
        navigate("../login");
      }

      if (response.status >= 400) {
        setEstErreur(true);
        setMessage(response.message)
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Render

  return (
    <>
      <div>
        <h2>Inscription</h2>
        <label htmlFor="">Username</label>
        <TextField
          label="Username"
          name="username"
          value={signin_data.username}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="">Email</label>
        <TextField label="Email" name="email" onChange={handleChange} />
        <div className="block"></div>

        <label htmlFor="">Password</label>
        <TextField
          label="Password"
          value={signin_data.password1}
          name="password1"
          onChange={handleChange}
        />
        <br />

        <label htmlFor="">Confirm Password</label>
        <TextField
          label="Confirm Password"
          value={signin_data.password2}
          name="password2"
          onChange={handleChange}
        />
        <br />

        <Button onClick={handleForm}>S'inscrire</Button>

        <div
          className = {`text-3xl text-red-500 ${estErreur ? 'block' : 'hidden'}`}
        >
          {message}
        </div>
      </div>
      <div></div>
    </>
  );
};

export default Signin;
