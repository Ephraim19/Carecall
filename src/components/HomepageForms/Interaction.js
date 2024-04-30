import React, { useCallback, useEffect } from "react";
import styles from "./Interaction.module.css";

const Interaction = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorCode, setErrorCode] = React.useState("");
  const [seePassword, setSeePassword] = React.useState(false);

  return (
    <div className={styles.frameParent}>
      <div className={styles.frameWrapper}>
        <form className={styles.logInToYourCarecallAccounParent}>
          <b className={styles.logInTo}>INTERACTION LOG</b>
          <div className={styles.emailParent}>
            <div className={styles.email}>Interaction</div>
            <div className={styles.div}>*</div>
          </div>
          <input
            className={styles.emailFieldForLogin}
            placeholder="Enter the interaction"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className={styles.loginButtonloginButton}>
            <button className={styles.buttonIcon} />
            <b className={styles.logIn}>SUBMIT</b>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Interaction;
