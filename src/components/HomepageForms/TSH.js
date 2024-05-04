import React,{useState} from "react";
import styles from "./Program.module.css";
import { database } from "../Firebase";
import { ref, push } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";

const TSH = (patientData) => {
  const [T3, setT3] = useState("");
  const [T4, setT4] = useState("");
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

    push(ref(database, "TSH"), {
      patient: patientData.patientData.patientData[0].id,
      T3,
      T4,
      dueDate: dateStrip(3, dueDate),
    })
      .then(() => {
        toast.success("Data submitted successfully");
      })
      .catch((error) => {
        toast.error("Error submitting data" + error);
      });
  };

  return (
    <div>
      <form className={styles.firstNameField}>
        <b className={styles.createNewCarecall}>TSH</b>

        <input
          className={styles.firstNameField1}
          placeholder="T3"
          type="text"
          value={T3}
          onChange={(e) => setT3(e.target.value)}
        />
        <input
          className={styles.lastNameField}
          placeholder="T4"
          type="text"
          value={T4}
          onChange={(e) => setT4(e.target.value)}
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

export default TSH;
