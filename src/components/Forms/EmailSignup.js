import React from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";
import { useNavigate,Link } from "react-router-dom";
import carecall from "../carecall.png";
const EmailSignup = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();
    const [errorCode, setErrorCode] = React.useState("");
  
    const onSubmit = async (e) => {
        e.preventDefault();
    
        await createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            navigate("/dashboard");
            // ...
          })
          .catch((error) => {
            setErrorCode(error.message);
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ..
          });
      };
  return (
    <div>
      <nav className="App-nav">
        <img
          style={{ display: "block", margin: "0 auto" }}
          src={carecall}
          alt="logo"
          className="App-logo"
        />
      </nav>
      <h3 style={{ color: "purple", fontSize: "23px", textAlign: "center" }}>
        Admin Registration portal
      </h3>
      <form className="newForm">
        <label>
          <b>Email</b> <br />
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          <b>Password</b> <br />
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <br />
        <b style={{ color: "red" }}>{errorCode}</b>
        <br />

        <button type="submit" onClick={onSubmit}>
          Sign up
        </button>
        <br />
        <br />

        <b>Already have an account? <Link to="/email/login">Login</Link></b>
      </form>
    </div>
  )
}

export default EmailSignup