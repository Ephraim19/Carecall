import React, { useCallback, useEffect, useState } from "react";

import styles from "../FrameComponent.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { ref, push } from "firebase/database";
import { database } from "../Firebase";
const NewInt = () => {
  const [interaction, setInteraction] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [mode, setMode] = useState("");
  const [errorCode, setErrorCode] = useState("");

  const dateStrip = (numOfHours, date) => {
    const dateCopy = new Date(date.getTime());
    dateCopy.setTime(dateCopy.getTime() + numOfHours * 60 * 60 * 1000);
    const stringDate = JSON.stringify(dateCopy.toUTCString().toString()).slice(
      1,
      -5
    );
    return stringDate;
  };

  const handleStatus = (e) => {
    setMode(e.target.value);
  };

  const NewInteraction = (event) => {
    event.preventDefault();
    if (interaction && dueDate) {
      push(ref(database, "Interaction"), {
        patient: Cookies.get("patient"),
        interaction,
        mode,
        Hc: Cookies.get("name"),
        dueDate: dateStrip(3, dueDate),
      }).then((data) => {
        setErrorCode("Successfully added interaction. click anywhere to close");
        setInteraction("");
      });
    }
  };

  return (
    <div className={styles.frameParent}>
      <div className={styles.frameWrapper}>
        <form className={styles.logInToYourCarecallAccounParent}>
          <b className={styles.logInTo}>New interaction</b>
          <div className={styles.emailParent}>
            <div className={styles.email}>Interaction</div>
            <div className={styles.div}>*</div>
          </div>
          <input
            className={styles.emailFieldForLogin}
            placeholder="Add a new interaction"
            type="text"
            value={interaction}
            onChange={(e) => setInteraction(e.target.value)}
          />
          <div className={styles.passwordParent}>
            <div className={styles.password}>Method of interaction</div>
            <div className={styles.div1}>*</div>
          </div>
          <div className={styles.passwordField}>
            <div className={styles.passwordField1} />
            <select
              className={styles.passwordFieldChild}
              onChange={handleStatus}
            >
              <option value="HS" key={"HS"}>
                Select the method of interaction
              </option>
              <option className="App-info" value="call" key={"Phone call"}>
                Phone call
              </option>
              <option className="App-info" value="sms" key={"SMS"}>
                SMS
              </option>
              <option className="App-info" value="whatsapp" key={"WhatsApp"}>
                WhatsApp
              </option>
              <option className="App-info" value="email">
                Email
              </option>
            </select>
          </div>

          <button
            className={styles.loginButtonloginButton}
            onClick={NewInteraction}
          >
            <button className={styles.buttonIcon} />
            <b className={styles.logIn}>SUBMIT</b>
          </button>
          <b style={{ color: "red", fontSize: "15px" }}>{errorCode}</b>
        </form>
      </div>
    </div>
  );
};

export default NewInt;
