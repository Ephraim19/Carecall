import React, { useState } from "react";
import styles from "./Program.module.css";
import { database } from "../Firebase";
import { ref, push, update, get } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import DatePicker from "react-datepicker";

const Appointment = () => {
  const [clinic, setClinic] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [diagnosis, setDiagnosis] = useState("");

  const dateStrip = (numOfHours, date) => {
    const dateCopy = new Date(date.getTime());
    dateCopy.setTime(dateCopy.getTime() + numOfHours * 60 * 60 * 1000);
    const stringDate = JSON.stringify(dateCopy.toUTCString().toString()).slice(
      1,
      -5
    );
    return stringDate;
  };

  const NewClinic = (event) => {
    event.preventDefault();
    if (clinic && dueDate) {
      push(ref(database, "Clinic"), {
        patient: Cookies.get("memberId"),
        clinic,
        diagnosis,
        status: "Active",
        dueDate: dateStrip(3, dueDate),
      }).then(() => {
        toast.success("Data submitted successfully");
        //Create a task for appointment reminder
      //   push(ref(database, "tasks"), {
      //     patient: Cookies.get("patient"),
      //     task:
      //       "Remind " +
      //       Cookies.get("userName") +
      //       " to go to " +
      //       clinic +
      //       " on " +
      //       dateStrip(3, dueDate).slice(0, 17),
      //     dueDate: dateStrip(3, dueDate),
      //     completed: "Not started",
      //   });

      //   //Create a task for appointment followup
      //   var tody = dateStrip(3, dueDate).slice(5, 17);
      //   var words = tody.split(" ");
      //   var newdate = words[0] + "/" + words[1] + "/" + words[2];
      //   var strToDate = new Date(newdate);
      //   strToDate.setDate(strToDate.getDate() + 1);

      //   push(ref(database, "tasks"), {
      //     patient: Cookies.get("patient"),
      //     task:
      //       "Follow up on " +
      //       Cookies.get("userName") +
      //       " about " +
      //       clinic +
      //       " appointment " +
      //       dateStrip(3, strToDate).slice(0, 17),
      //     dueDate: dateStrip(3, strToDate),
      //     completed: "Not started",
      //   });
      //   navigate("/dashboard");
       }).catch((error) => {
        toast.error("Error submitting data");
       });
    }
  };

  return (
    <div>
      <form className={styles.firstNameField}>
        <b className={styles.createNewCarecall}>APPOINTMENT</b>

        <input
          className={styles.firstNameField1}
          placeholder="Clinic"
          type="text"
          value={clinic}
          onChange={(e) => setClinic(e.target.value)}
        />
                <input
          className={styles.phoneNumber}
          placeholder="Diagnosis"
          type="text"
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
        />
          <div className={styles.lastName }>
          <DatePicker
            selected={dueDate}
            onChange={(date) => setDueDate(date)}
          />
        </div>


        <button className={styles.signUpButton} onClick={NewClinic} type="button" >
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
