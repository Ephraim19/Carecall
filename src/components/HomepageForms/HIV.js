import React, { useEffect } from "react";
import styles from "./Interaction.module.css";
import { ref, push } from "firebase/database";
import { database, auth } from "../Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HIV = (patientData) => {
  const [HIV, setHIV] = React.useState("");
  const today = new Date();
//   const [mode, setMode] = React.useState("");
//   const [hc, setHc] = React.useState("");

  const dateStrip = (numOfHours, date) => {
    const dateCopy = new Date(date.getTime());
    dateCopy.setTime(dateCopy.getTime() + numOfHours * 60 * 60 * 1000);
    const stringDate = JSON.stringify(dateCopy.toUTCString().toString()).slice(
      1,
      -5
    );
    return stringDate;
  };

//   useEffect(() => {
//     onAuthStateChanged(auth, (user) => {
//       setHc(user.email);
//     });
//   }, [interaction]);

  const NewInteraction = (e) => {
    e.preventDefault();
    if (HIV) {
      push(ref(database, "HIV"), {
        patient: patientData.patientData.patientData[0].id,
        HIV,
        // interaction,
        // mode,
        // Hc: hc,
        dueDate: dateStrip(3, today),
      })
        .then((data) => {
          toast.success(
            "Successfully added data. click anywhere to close"
          );
        })
        .catch((error) => {
          toast.error("Error adding data. click anywhere to close");
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
            <b className={styles.logInTo}>HIV STATUS</b>
            <div className={styles.emailParent}>
              <div className={styles.email}>HIV</div>
              <div className={styles.div}>*</div>
            </div>
            {/* <textarea
              className={styles.emailFieldForLogin12}
              placeholder="Enter the interaction"
              type="text"
              onChange={(e) => setInteraction(e.target.value)}
            /> */}
            <div className={styles.passwordField}>
              <div className={styles.passwordField1} />

              <label htmlFor="Status">
                <select
                  className={styles.passwordFieldChild}
                  onChange={(e) => setHIV(e.target.value)}
                >
                  <option value={HIV} key={"HS1"}>
                    HIV STATUS
                  </option>
                  <option
                    className="App-info"
                    value="Positive"
                    key={"Positive"}
                  >
                    Positive
                  </option>

                  <option className="App-info" value="Negative" key={"Negative"}>
                    Negative
                  </option>
                </select>
              </label>
            </div>
            <button className={styles.loginButtonloginButton} type="botton">
              <button
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

export default HIV;
