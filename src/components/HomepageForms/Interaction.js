import React, { useEffect } from "react";
import styles from "./Interaction.module.css";
import { ref, push } from "firebase/database";
import { database, auth } from "../Firebase";
import { onAuthStateChanged } from "firebase/auth";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Interaction = () => {
  const [interaction, setInteraction] = React.useState("");
  const today = new Date();
  const [mode, setMode] = React.useState("");
  const [hc, setHc] = React.useState("");

  const dateStrip = (numOfHours, date) => {
    const dateCopy = new Date(date.getTime());
    dateCopy.setTime(dateCopy.getTime() + numOfHours * 60 * 60 * 1000);
    const stringDate = JSON.stringify(dateCopy.toUTCString().toString()).slice(
      1,
      -5
    );
    return stringDate;
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setHc(user.email);
    });
  }, [interaction]);

  const NewInteraction = (e) => {
    e.preventDefault();
    if (interaction && today && mode) {
      push(ref(database, "Interaction"), {
        patient: Cookies.get("memberId"),
        interaction,
        mode,
        Hc: hc,
        dueDate: dateStrip(3, today),
      })
        .then((data) => {
          toast.success(
            "Successfully added interaction. click anywhere to close"
          );
          setInteraction("");
        })
        .catch((error) => {
          toast.error("Error adding interaction. click anywhere to close");
        });
    } else {
      toast.error("Please fill in all fields");
    }
  };

  return (
    <div>
      <div className={styles.frameParent}>
        <div className={styles.frameWrapper}>
          <form className={styles.logInToYourCarecallAccounParent}>
            <b className={styles.logInTo}>INTERACTION LOG</b>
            <div className={styles.emailParent}>
              <div className={styles.email}>Interaction</div>
              <div className={styles.div}>*</div>
            </div>
            <input
              className={styles.emailFieldForLogin12}
              placeholder="Enter the interaction"
              type="text"
              onChange={(e) => setInteraction(e.target.value)}
            />
            <div className={styles.passwordField}>
              <div className={styles.passwordField1} />

              <label htmlFor="Status">
                <select
                  className={styles.passwordFieldChild}
                  onChange={(e) => setMode(e.target.value)}
                >
                  <option value={mode} key={"HS1"}>
                    MODE OF INTERACTION
                  </option>
                  <option
                    className="App-info"
                    value="Phone call"
                    key={"Phone call "}
                  >
                    PHONE CALL
                  </option>

                  <option className="App-info" value="SMS" key={"SMS"}>
                    SMS
                  </option>
                  <option className="App-info" value="Email" key={"Email"}>
                    EMAIL
                  </option>
                  <option
                    className="App-info"
                    value="Whatsapp"
                    key={"Whatsapp"}
                  >
                    WHATSAPP
                  </option>
                </select>
              </label>
            </div>
            <button className={styles.loginButtonloginButton}>
              <button
                type="button"
                className={styles.buttonIcon}
                onClick={NewInteraction}
              />
              <b className={styles.logIn}>SUBMIT</b>
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Interaction;
