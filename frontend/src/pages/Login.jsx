import { TextField, Button } from "@mui/material";
import { useState } from "react";
function Login() {  


//Render

  return (
    <body>
      <div>
        <img src="" alt="" />
      </div>
      <div>
        <form action="">
          <h2>Se connecter</h2>
          <label htmlFor="">Username or email</label>
          <TextField  label="username or email" onChange={handleChange} />
          <label htmlFor="">Password</label>
          <TextField  label="Password"  onChange={handleChange}/>
          <Button type="submit" onChange={handleChange}> Se connecter</Button>
        </form>
      </div>
    </body>
  );
}

export default Login;
