import React, { useEffect, useState } from "react";
import styles from "./Program.module.css";
import { database } from "../Firebase";
import { ref, push } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import DatePicker from "react-datepicker";

const LIPID = (patientData) => {
  const [total, setTotal] = useState("");
  const [hdl, setHdl] = useState("");
  const [ldl, setLdl] = useState("");
  const [triglycerides, setTriglycerides] = useState("");
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
    push(ref(database, "LIPID"), {
      patient: patientData.patientData.patientData[0].id,
      hdl,
      ldl,
      total,
      triglycerides,
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
        <b className={styles.createNewCarecall}>LIPID</b>

        <input
          className={styles.firstNameField1}
          placeholder="Total Cholestaral"
          type="text"
          value={total}
          onChange={(e) => setTotal(e.target.value)}
        />
        <input
          className={styles.lastNameField}
          placeholder="LDL"
          type="text"
          value={ldl}
          onChange={(e) => setLdl(e.target.value)}
        />
        <input
          className={styles.phoneNumber}
          placeholder="HDL"
          type="text"
          value={hdl}
          onChange={(e) => setHdl(e.target.value)}
        />

        {/* <input
          className={styles.emailAddressr}
          placeholder="Triglycerides"
          type="text"
          value={triglycerides}
          onChange={(e) => setTriglycerides(e.target.value)}
        /> */}
        <div className={styles.emailAddress}>
          <input
            className={styles.emailAddressr}
            placeholder="Triglycerides"
            type="text"
            value={triglycerides}
            onChange={(e) => setTriglycerides(e.target.value)}
          />
        </div>

        <button
          className={styles.signUpButton}
          type="button"
        >
          <div className={styles.signUpButton1} onClick={NewSugar} >
            <div className={styles.signUpButtonChild} />
            <b className={styles.createAccount}>SUBMIT DATA</b>
          </div>
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default LIPID;
