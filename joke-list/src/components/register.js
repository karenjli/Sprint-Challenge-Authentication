import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  

  const credentialHandler = event => {
    setCredentials({...credentials, event.target.name: event.target.value})
  };

  
  const onSubmit = () => {
    axios.post("localhost:3300/api/auth/register");
  };
  return (
    <div className="register-form">
      <h1>Registration</h1>
      <form>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={credentialHandler}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={credentialHandler}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Register;
