import React, { useEffect, useState } from "react";
import styles from "./Program.module.css";
import { database } from "../Firebase";
import { ref, push } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import DatePicker from "react-datepicker";

const BloodSugar = (patientData) => {
  const [fasting, setFasting] = useState("");
  const [random, setRandom] = useState("");
  const [HBA1C, setHBA1C] = useState("");
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
    if (fasting || random || (HBA1C && dueDate)) {
      push(ref(database, "Bloodsugar"), {
        patient: patientData.patientData.patientData[0].id,
        random,
        fasting,
        HBA1C,
        dueDate: dateStrip(3, dueDate),
      })
        .then(() => {
          toast.success("Data submitted successfully");
          //Create a task if user has abnormal Blood sugar
          if (patientData.patientData.patientData[1].program === "AcuteCare") {
            if (HBA1C && parseFloat(HBA1C > 5.7)) {
              push(ref(database, "tasks"), {
                patient: patientData.patientData.patientData[0].id,
                task:
                  patientData.patientData.patientData[0].patient +
                  " has high HBA1C on " +
                  dateStrip(3, dueDate).slice(0, 17),
                dueDate: dateStrip(3, new Date()),
                completed: "Not started",
              });
            }
            if (fasting && parseFloat(fasting) > 10) {
              push(ref(database, "tasks"), {
                patient: patientData.patientData.patientData[0].id,
                task:
                  patientData.patientData.patientData[0].patient +
                  " has high fasting blood sugar on " +
                  dateStrip(3, dueDate).slice(0, 17),
                dueDate: dateStrip(3, new Date()),
                completed: "Not started",
              });
            }
            if (fasting && parseFloat(fasting) < 4) {
              push(ref(database, "tasks"), {
                patient: patientData.patientData.patientData[0].id,
                task:
                  patientData.patientData.patientData[0].patient +
                  " has low fasting blood sugar on " +
                  dateStrip(3, dueDate).slice(0, 17),
                dueDate: dateStrip(3, new Date()),
                completed: "Not started",
              });
            }
            if (random && parseFloat(random) > 10) {
              push(ref(database, "tasks"), {
                patient: patientData.patientData.patientData[0].id,
                task:
                  patientData.patientData.patientData[0].patient +
                  " has high random blood sugar on " +
                  dateStrip(3, dueDate).slice(0, 17),
                dueDate: dateStrip(3, new Date()),
                completed: "Not started",
              });
            }
            if (random && parseFloat(random) < 10) {
              push(ref(database, "tasks"), {
                patient: patientData.patientData.patientData[0].id,
                task:
                  patientData.patientData.patientData[0].patient +
                  " has low random blood sugar on " +
                  dateStrip(3, dueDate).slice(0, 17),
                dueDate: dateStrip(3, new Date()),
                completed: "Not started",
              });
            }
          }
        })
        .catch((error) => {
          toast.error("Error submitting data " + error);
        });
    } else {
      toast.error("Please fill in all fields");
    }
  };

  return (
    <div>
      <form className={styles.firstNameField}>
        <b className={styles.createNewCarecall}>BLOOD SUGAR</b>

        <input
          className={styles.firstNameField1}
          placeholder="Fasting"
          type="text"
          value={fasting}
          onChange={(e) => setFasting(e.target.value)}
        />
        <input
          className={styles.lastNameField}
          placeholder="Random"
          type="text"
          value={random}
          onChange={(e) => setRandom(e.target.value)}
        />
        <input
          className={styles.phoneNumber}
          placeholder="HBA1C"
          type="text"
          value={HBA1C}
          onChange={(e) => setHBA1C(e.target.value)}
        />
        <div className={styles.emailAddress}>
          <DatePicker
            selected={dueDate}
            onChange={(date) => setDueDate(date)}
          />
        </div>

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

export default BloodSugar;
