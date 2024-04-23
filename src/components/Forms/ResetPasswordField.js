import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ResetPasswordField.module.css";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPasswordField = () => {
  const navigate = useNavigate();

  const onCreateAnAccountClick = useCallback(() => {
    navigate("/partner");
  }, [navigate]);

  const onLogInTextClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const reset = useCallback(() => {
    console.log("Resetting password");
    const auth = getAuth();
    sendPasswordResetEmail(auth)
      .then(() => {
        toast.success("Password reset email sent. Check your inbox.");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  });

  return (
    <div className={styles.resetPasswordField}>
      <div className={styles.resetPasswordFieldInner}>
        <div className={styles.carecallParent}>
          <h1 className={styles.carecall}>CareCall</h1>
          <div className={styles.connectedContinuousCareWrapper}>
            <b className={styles.connectedContinuousCare}>
              Connected. Continuous. Care
            </b>
          </div>
        </div>
      </div>
      <div className={styles.resetPasswordPromptWrapper}>
        <h3 className={styles.resetPasswordPrompt}>Reset Account Password</h3>
      </div>
      <div className={styles.resetPasswordFieldChild}>
        <div className={styles.emailParent}>
          <div className={styles.email}>Email</div>
          <div className={styles.div}>*</div>
        </div>
      </div>
      <input
        className={styles.resetPasswordFieldItem}
        placeholder="Enter your email address"
        type="text"
      />
      <div className={styles.sendResetCodeWrapper}>
        <button className={styles.sendResetCode} onClick={reset}>
          <img className={styles.buttonIcon} alt="" src="/button.svg" />
          <b className={styles.sendCode}>SEND RESET LINK</b>
        </button>
      </div>
      <div className={styles.bottomNavigation}>
        <div className={styles.newHereParent}>
          <div className={styles.newHere}>New Here?</div>
          <div
            className={styles.createAnAccount}
            onClick={onCreateAnAccountClick}
          >
            Create an account
          </div>
        </div>
        <div className={styles.orParent}>
          <div className={styles.or}>Or</div>
          <div className={styles.logIn} onClick={onLogInTextClick}>
            Log In
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ResetPasswordField;
