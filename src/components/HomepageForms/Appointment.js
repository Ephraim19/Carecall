import React, { useEffect } from "react";
import styles from "./Program.module.css";
import { database } from "../Firebase";
import { ref, push, update, get } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const Appointment = () => {
  const dbRef = ref(database, "Family");
  const [primaryMember, setPrimaryMember] = React.useState("");
  const [spouse, setSpouse] = React.useState("");
  const [age1, setAge1] = React.useState("");
  const [age2, setAge2] = React.useState("");

  return (
    <div>
      <form className={styles.firstNameField}>
        <b className={styles.createNewCarecall}>APPOINTMENT</b>

        <input
          className={styles.firstNameField1}
          placeholder="Clinic"
          type="text"
          value={primaryMember}
          onChange={(e) => setPrimaryMember(e.target.value)}
        />
        <input
          className={styles.lastNameField}
          placeholder="Date"
          type="text"
          value={age1}
          onChange={(e) => setAge1(e.target.value)}
        />
        <input
          className={styles.phoneNumber}
          placeholder="Diagnosis"
          type="text"
          value={spouse}
          onChange={(e) => setSpouse(e.target.value)}
        />

        <button className={styles.signUpButton}>
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

export default Appointment;
