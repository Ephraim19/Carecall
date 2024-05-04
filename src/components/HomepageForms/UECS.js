import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import styles from "./Program.module.css";
import { database } from "../Firebase";
import { ref, push } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";

const UECS = (patientData) => {
  const [UECS, setUECS] = useState("");
  const [dueDate, setDueDate] = useState(new Date());

  const dateStrip = (numOfHours, date) => {
    const dateCopy = new Date(date.getTime());
    dateCopy.setTime(dateCopy.getTime() + numOfHours * 60 * 60 * 1000);
    const stringDate = JSON.stringify(dateCopy.toUTCString().toString()).slice(
      1,
      -5
    );
    return stringDate;
  };

  const NewSugar = (event) => {
    event.preventDefault();
    push(ref(database, "UECS"), {
      patient: patientData.patientData.patientData[0].id,
      UECS,
      dueDate: dateStrip(3, dueDate),
    })
      .then(() => {
        toast.success("Data submitted successfully");
      })
      .catch((error) => {
        toast.error("Error submitting data " + error);
      });
  };

  return (
    <div>
      <form className={styles.firstNameField}>
        <b className={styles.createNewCarecall}>UECS</b>

        <input
          className={styles.firstNameField1}
          placeholder="UECS"
          type="text"
          value={UECS}
          onChange={(e) => setUECS(e.target.value)}
        />
        {/* <input
          className={styles.lastNameField}
          placeholder="AST"
          type="text"
          value={AST}
          onChange={(e) => setAST(e.target.value)}
        />
        <input
          className={styles.phoneNumber}
          placeholder="ALP"
          type="text"
          value={ALP}
          onChange={(e) => setALP(e.target.value)}
        /> */}

        {/* <input
          className={styles.emailAddressr}
          placeholder="Triglycerides"
          type="text"
          value={triglycerides}
          onChange={(e) => setTriglycerides(e.target.value)}
        /> */}
        {/* <div className={styles.emailAddress}>
          <input
            className={styles.emailAddressr}
            placeholder="GGT"
            type="text"
            value={GGT}
            onChange={(e) => setGGT(e.target.value)}
          />
        </div> */}

        <button
          className={styles.signUpButton}
          type="button"
          onClick={NewSugar}
        >
          <div className={styles.signUpButton1}>
            <div className={styles.signUpButtonChild} />
            <b className={styles.createAccount}>SUBMIT DATA</b>
          </div>
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UECS;
