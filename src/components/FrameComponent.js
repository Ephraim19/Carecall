import React, { useCallback, useEffect } from "react";

import styles from "./FrameComponent.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./Firebase";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const FrameComponent = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const [errorCode, setErrorCode] = React.useState("");
  const [seePassword, setSeePassword] = React.useState(false);

  const onLogin = (e) => {
    console.log("login clicked");
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        Cookies.set("name", userCredential.user.email, { expires: 7 });
        navigate("/dashboard");
        console.log(user);
      })
      .catch((error) => {
        setErrorCode(error.message);
      });
  };

  const onCreateAnAccountClick = useCallback((e) => {
    navigate("/partner");
  }, []);

  const onResetPasswordPromptClick = useCallback(() => {
    navigate("/reset");
  }, []);

  const seePass = (e) => {
    setSeePassword(!seePassword);
  };

  return (
    <div className={styles.frameParent}>
      <div className={styles.carecallParent}>
        <h1 className={styles.carecall}>CareCall</h1>
        <div className={styles.connectedContinuousCareWrapper}>
          <b className={styles.connectedContinuousCare}>
            Connected. Continuous. Care
          </b>
        </div>
      </div>
      <div className={styles.frameWrapper}>
        <form className={styles.logInToYourCarecallAccounParent}>
          <b className={styles.logInTo}>Log in to your CareCall account</b>
          <div className={styles.emailParent}>
            <div className={styles.email}>Email</div>
            <div className={styles.div}>*</div>
          </div>
          <input
            className={styles.emailFieldForLogin}
            placeholder="Enter your email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className={styles.passwordParent}>
            <div className={styles.password}>Password</div>
            <div className={styles.div1}>*</div>
          </div>
          <div className={styles.passwordField}>
            <div className={styles.passwordField1} />
            <input
              className={styles.passwordFieldChild}
              placeholder="Enter your password"
              type={seePassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
            />
            {seePassword ? (
              <FaEyeSlash
                className={styles.seeunseePasswordIcon}
                onClick={seePass}
              />
            ) : (
              <FaEye
                className={styles.seeunseePasswordIcon}
                onClick={seePass}
              />
            )}
          </div>

          <button className={styles.loginButtonloginButton} onClick={onLogin}>
            <button className={styles.buttonIcon} />
            <b className={styles.logIn}>LOG IN</b>
          </button>
          <b style={{ color: "red", fontSize:"15px" }}>{errorCode}</b>
        </form>
      </div>
      <div className={styles.loginButton}>
        <img className={styles.buttonIcon1} alt="" src="/button.svg" />
        <b className={styles.logIn1}>Log In</b>
      </div>
      <div className={styles.frameGroup}>
        <div className={styles.newHereParent}>
          <div className={styles.newHere}>New Here?</div>
          <div
            className={styles.createAnAccount}
            onClick={onCreateAnAccountClick}
          >
            Create an account
          </div>
        </div>
        <div
          className={styles.resetPasswordPrompt}
          onClick={onResetPasswordPromptClick}
        >
          <div className={styles.forgotPasswordWrapper}>
            <div className={styles.forgotPassword}>Forgot Password?</div>
          </div>
          <div className={styles.resetPassword}>Reset It</div>
        </div>
      </div>
    </div>
  );
};

export default FrameComponent;
