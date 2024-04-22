import React, { useCallback,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Forms/FirstNameField.module.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "./Firebase";
import { ref, push} from "firebase/database";
import { FaEye } from "react-icons/fa";
import Cookies from "js-cookie";

const FirstNameField = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password1, setPassword1] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [hospital,setHospital] = React.useState("");
  const [errorCode, setErrorCode] = React.useState("");
  const [passwordErrorCode, setPasswordErrorCode] = React.useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setHospital(Cookies.get("hospital"));
  }
  ,[])


  const onSubmit = async (e) => {
    e.preventDefault();
    //Send verification email
    sendEmailVerification(auth.currentUser).then(() => {
      // Email verification sent!
      // ...
    });
    
    if (password !== password1) {
      setPasswordErrorCode("Passwords do not match!");
    } else {
      

      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          push(ref(database, Cookies.get("hospital") + "/" + "Admins"), {
            admin: userCredential.user.email,
            hospital: Cookies.get("hospital"),
            lastName,
            firstName,
            phoneNumber,
          }).catch((error) => {
            console.error("Error adding document: ", error);
          });
          // Signed in
          const user = userCredential.user;
          console.log(user);
          navigate("/");
          // ...
        })
        .catch((error) => {
          setErrorCode(error.message);
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          // ..
        });
    }
  };

  const onLogInTextClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div>
      <form className={styles.firstNameField}>
        <div className={styles.carecallBranding}>
          <h1 className={styles.carecall}>CareCall</h1>
          <div className={styles.connectedContinuousCareLabe}>
            <b className={styles.connectedContinuousCare}>
              Connected. Continuous. Care
            </b>
          </div>
        </div>
        <b className={styles.createNewCarecall}>Create your CareCall account</b>
        <input
          className={styles.firstNameField1}
          placeholder="First Name"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          className={styles.lastNameField}
          placeholder="Last Name"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          className={styles.phoneNumber}
          placeholder="Enter Phone Number"
          type="number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          className={styles.emailAddress}
          placeholder="Enter Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className={styles.newPassword}>
          <div className={styles.newPasswordField} />
          <input
            className={styles.newPasswordChild}
            placeholder="Enter New Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaEye className={styles.seeunseePasswordIcon} />
        </div>


        <div className={styles.confirmPassword}>
          <div className={styles.confirmPasswordField} />
          <input
            className={styles.confirmPasswordChild}
            placeholder="Confirm Password"
            type="password"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          />
          <FaEye className={styles.seeunseePasswordIcon1} />
        </div>

        <button className={styles.signUpButton} onClick={onSubmit}>
          <div className={styles.signUpButton1}>
            <div className={styles.signUpButtonChild} />
            <b className={styles.createAccount}>CREATE ACCOUNT</b>
          </div>
          <b style={{ color: "red" }}>{passwordErrorCode}</b>
        </button>

        <div className={styles.logInPrompt}>
          <div className={styles.alreadyHaveAn}>Already Have An Account?</div>
          <div className={styles.logIn} onClick={onLogInTextClick}>
            Log In
          </div>
        </div>
      </form>
    </div>
  );
};

export default FirstNameField;
