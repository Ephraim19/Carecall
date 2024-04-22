import ResetPasswordField from "./ResetPasswordField";
import styles from "./RESETPASSWORD.module.css";
import { getAuth,sendCustomPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";

const RESETPASSWORD = () => {


  return (
    <div className={styles.resetPassword}>
      <ResetPasswordField />
    </div>
  );
};

export default RESETPASSWORD;