import React, { useEffect, useState } from "react";
import styles from "./Program.module.css";
import { database } from "../Firebase";
import { ref, push, update, get } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import DatePicker from "react-datepicker";

const Prescription = (familyDisplay) => {
  const [prescription, setPrescription] = useState("");
  const [daysTaken, setDaysTaken] = useState();
  const [dueDate, setDueDate] = useState(new Date());
  const [prescription1, setPrescription1] = useState("");
  const [daysTaken1, setDaysTaken1] = useState();
  const [prescription2, setPrescription2] = useState("");
  const [daysTaken2, setDaysTaken2] = useState();

  const dateStrip = (numOfHours, date) => {
    const dateCopy = new Date(date.getTime());
    dateCopy.setTime(dateCopy.getTime() + numOfHours * 60 * 60 * 1000);
    const stringDate = JSON.stringify(dateCopy.toUTCString().toString()).slice(
      1,
      -5
    );
    return stringDate;
  };

  const NewPrescription = (event) => {
    event.preventDefault();
    if (prescription && daysTaken) {
      push(ref(database, "Prescription"), {
        patient: Cookies.get("memberId"),
        prescription,
        daysTaken,
        dueDate: dateStrip(3, dueDate),
        status: "Ongoing",
      })
        .then(() => {
          toast.success("Prescription added successfully");
          // var tody = dateStrip(3, dueDate).slice(5, 17);
          // var words = tody.split(" ");
          // var newdate = words[0] + "/" + words[1] + "/" + words[2];
          // var strToDate = new Date(newdate);

          // strToDate.setDate(strToDate.getDate() + parseInt(daysTaken));

          // //Create a task
          // push(ref(database, "tasks"), {
          //   patient: Cookies.get("patient"),
          //   task:
          //     Cookies.get("userName") +
          //     " has finished " +
          //     prescription +
          //     " on " +
          //     dateStrip(3, strToDate).slice(0, 17),
          //   dueDate: dateStrip(3, strToDate),
          //   completed: "Not started",
          // }).then((data) => {
          //   console.log(data);
          // });
        })
        .catch((error) => {
          toast.error("Error adding prescription");
        });
    } else{
      toast.error("Please fill in all fields");
    }
  };
  return (
    <div>
      <form className={styles.firstNameField}>
        <b className={styles.createNewCarecall}>PRESCRIPTIONS</b>

        <input
          className={styles.firstNameField1}
          placeholder="Medication"
          type="text"
          value={prescription}
          onChange={(e) => setPrescription(e.target.value)}
        />
        <input
          className={styles.lastNameField}
          placeholder="Duration"
          type="text"
          value={daysTaken}
          onChange={(e) => setDaysTaken(e.target.value)}
        />
        <div className={styles.phoneNumber}>
          <DatePicker
            selected={dueDate}
            onChange={(date) => setDueDate(date)}
          />
        </div>

        {/* <input
          className={styles.emailAddress}
          placeholder="Duration"
          type="text"
          value={daysTaken1}
          onChange={(e) => setDaysTaken(e.target.value)}
        />
        <input
          className={styles.firstNameField11}
          placeholder="Medication"
          type="text"
          value={prescription2}
          onChange={(e) => setPrescription2(e.target.value)}
        />
        <input
          className={styles.lastNameField1}
          placeholder="Duration"
          type="text"
          value={daysTaken2}
          onChange={(e) => setDaysTaken2(e.target.value)}
        /> */}

        <button className={styles.signUpButton5} onClick={NewPrescription} >
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

export default Prescription;
