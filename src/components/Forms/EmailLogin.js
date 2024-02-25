import React, { useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";
import { useNavigate ,Link} from "react-router-dom";
import carecall from "../carecall.png";

const EmailLogin = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const [errorCode, setErrorCode] = React.useState("");

  // useEffect(() => {
  //   if (auth.currentUser) {
  //     navigate("/dashboard");
  //   }
  // },[auth.currentUser]);

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/dashboard")
        console.log(user);
    })
    .catch((error) => {
        setErrorCode(error.message);
    });
   
}

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
        Admin Login portal
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
        <button type="submit" onClick={onLogin}>
          Login
        </button>
        <br />
        <br />

        <b>Don't have an account? <Link to="/email/signup">Signup</Link></b>
      </form>

    </div>
  );
};

export default EmailLogin;
