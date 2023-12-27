import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./Firebase";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import carecall from "./carecall.png";

const Login = () => {
  const navigate = useNavigate();

  const signIn = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        //const credential = GoogleAuthProvider.credentialFromResult(result);
        //const token = credential.accessToken;
        // The signed-in user info.

        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)

        Cookies.set("name", user.displayName, { expires: 7 });
        Cookies.set("userId", user.uid, { expires: 7 });
        navigate("/dashboard");
      })
      .catch((error) => {
        // Handle Errors here.
        //const errorCode = error.code;
        //const errorMessage = error.message;
        // The email of the user's account used.
        //const email = error.customData.email;
        // The AuthCredential type that was used.
        //const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return (
    <div>
      <div className="landing">
        <img src={carecall} alt="logo" className="App-logo" />
      </div>
      <div className="google">
        <button onClick={signIn}>sign in with google</button>
      </div>
    </div>
  );
};

export default Login;
