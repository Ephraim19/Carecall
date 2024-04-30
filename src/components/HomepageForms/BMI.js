import React, { useEffect, useState } from "react";
import styles from "./Program.module.css";
import { database, auth } from "../Firebase";
import { ref, push, update, get } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import DatePicker from "react-datepicker";

const BMI = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
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

  const NewBmi = (event) => {
    event.preventDefault();

    push(ref(database, "Bmi"), {
      patient: Cookies.get("memberId"),
      weight,
      height,
      dueDate: dateStrip(3, dueDate),
    })
      .then(() => {
        toast.success("Data submitted successfully");
        //Create a task if user has abnormal BMI
        // if (height === "" || weight === "") {
        //   toast.error("Please fill in all fields");
        // } else {
        //   if (parseInt(weight) / parseInt(height ^ 2) < 18.5) {
        //     push(ref(database, "tasks"), {
        //       patient: Cookies.get("patient"),
        //       task:
        //         Cookies.get("userName") +
        //         " is under weight on " +
        //         dateStrip(3, dueDate).slice(0, 17),
        //       dueDate: dateStrip(3, new Date()),
        //       completed: "Not started",
        //     });
        //   } else if (parseInt(weight) / parseInt(height ^ 2) > 25) {
        //     push(ref(database, "tasks"), {
        //       patient: Cookies.get("patient"),
        //       task:
        //         Cookies.get("userName") +
        //         " is over weight on " +
        //         dateStrip(3, dueDate).slice(0, 17),
        //       dueDate: dateStrip(3, new Date()),
        //       completed: "Not started",
        //     });
        //   }
        //}
      })
      .catch((error) => {
        toast.error("Error submitting data");
      });
  };

  return (
    <div>
      <form className={styles.firstNameField}>
        <b className={styles.createNewCarecall}>WEIGHT & HEIGHT(BMI)</b>

        <input
          className={styles.firstNameField1}
          placeholder="WEIGHT IN KG IE 77"
          type="text"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <input
          className={styles.lastNameField}
          placeholder="HEIGHT IN METERS i.e 1.79"
          type="text"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
        <div className={styles.phoneNumber}>
          <DatePicker
            selected={dueDate}
            onChange={(date) => setDueDate(date)}
          />
        </div>

        <button className={styles.signUpButton} onClick={NewBmi}>
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

export default BMI;
