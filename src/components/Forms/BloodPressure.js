import React, { useState } from "react";
import carecall from "../carecall.png";
import DatePicker from "react-datepicker";
import { ref, push } from "firebase/database";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { database } from "../Firebase";
import styles from "../FrameComponent.module.css";

const BloodPressure = () => {
  const [pressure, setPressure] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const navigate = useNavigate();
  const [errorCode, setErrorCode] = useState("");

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
        patient: Cookies.get("patient"),
        pressure,
        dueDate: dateStrip(3, dueDate),
      }).then((data) => {
        setErrorCode("Successfully added blood pressure. click anywhere to close");

        //Create a task if bp is high or low
        if (pressure.split("/")[0] > 120 || pressure.split("/")[1] > 80) {
          push(ref(database, "tasks"), {
            patient: Cookies.get("patient"),
            task:
              Cookies.get("userName") +
              " had a high blood pressure on " +
              dateStrip(3, dueDate).slice(0, 17),
            dueDate: dateStrip(3, new Date()),
            completed: "Not started",
          });
        } else if (pressure.split("/")[1] < 60 || pressure.split("/")[0] < 60) {
          push(ref(database, "tasks"), {
            patient: Cookies.get("patient"),
            task:
              Cookies.get("userName") +
              " had a low blood pressure on " +
              dateStrip(3, dueDate).slice(0, 17),
            dueDate: dateStrip(3, new Date()),
            completed: "Not started",
          });
        }
        navigate("/dashboard");
      });
    }
  };

  return (
    <div className={styles.frameParent}>
      <div className={styles.frameWrapper}>
        <form className={styles.logInToYourCarecallAccounParent}>
          <b className={styles.logInTo}>BLOOD PRESSURE</b>
          <div className={styles.emailParent}>
            <div className={styles.email}>Blood pressure</div>
            <div className={styles.div}>*</div>
          </div>
          <input
            className={styles.emailFieldForLogin}
            placeholder="i.e 120/80"
            type="text"
            value={pressure}
            onChange={(e) => setPressure(e.target.value)}
          />

          <button className={styles.loginButtonloginButton} onClick={NewBp}>
            <button className={styles.buttonIcon} />
            <b className={styles.logIn}>SUBMIT</b>
          </button>
          <b style={{ color: "red", fontSize: "15px" }}>{errorCode}</b>
        </form>
      </div>
    </div>
  );
};

export default BloodPressure;
