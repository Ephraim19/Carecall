import React, { useEffect, useState } from "react";
import styles from "./Program.module.css";
import { database } from "../Firebase";
import { ref, push, update, get } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const BloodPressure = () => {
  const [pressure, setPressure] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [pulse, setPulse] = useState("");

  const dateStrip = (numOfHours, date) => {
    const dateCopy = new Date(date.getTime());
    dateCopy.setTime(dateCopy.getTime() + numOfHours * 60 * 60 * 1000);
    const stringDate = JSON.stringify(dateCopy.toUTCString().toString()).slice(
      1,
      -5
    );
    return stringDate;
  };

  const NewBp = (event) => {
    event.preventDefault();
    if (pressure && dueDate) {
      push(ref(database, "bloodPressure"), {
        patient: Cookies.get("memberId"),
        pressure,
        pulse,
        dueDate: dateStrip(3, dueDate),
      })
        .then((data) => {
          toast.success("Successfully added blood pressure", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          //Create a task if bp is high or low
          // if (pressure.split("/")[0] > 120 || pressure.split("/")[1] > 80) {
          //   push(ref(database, "tasks"), {
          //     patient: Cookies.get("patient"),
          //     task:
          //       Cookies.get("userName") +
          //       " had a high blood pressure on " +
          //       dateStrip(3, dueDate).slice(0, 17),
          //     dueDate: dateStrip(3, new Date()),
          //     completed: "Not started",
          //   });
          // } else if (pressure.split("/")[1] < 60 || pressure.split("/")[0] < 60) {
          //   push(ref(database, "tasks"), {
          //     patient: Cookies.get("patient"),
          //     task:
          //       Cookies.get("userName") +
          //       " had a low blood pressure on " +
          //       dateStrip(3, dueDate).slice(0, 17),
          //     dueDate: dateStrip(3, new Date()),
          //     completed: "Not started",
          //   });
          // }
        })
        .catch((error) => {
          toast.error("Error adding blood pressure", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    } else {
      toast.error("Please fill all fields", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div>
      <form className={styles.firstNameField}>
        <b className={styles.createNewCarecall}>BLOOD PRESSURE</b>

        <input
          className={styles.firstNameField1}
          placeholder="BLOOD PRESSURE i.e 120/80"
          type="text"
          value={pressure}
          onChange={(e) => setPressure(e.target.value)}
        />
        <input
          className={styles.lastNameField}
          placeholder="PULSE"
          type="text"
          value={pulse}
          onChange={(e) => setPulse(e.target.value)}
        />
        <input
          className={styles.phoneNumber}
          placeholder="DATE"
          type="text"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <button className={styles.signUpButton} onClick={NewBp}>
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

export default BloodPressure;
