import React, { useState } from "react";
import carecall from "../carecall.png";
import DatePicker from "react-datepicker";
import { ref, push } from "firebase/database";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { database } from "../Firebase";
import "react-datepicker/dist/react-datepicker.css";

const Prescriptions = () => {
  const [prescription, setPrescription] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const navigate = useNavigate();

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
    if (prescription && dueDate) {
      push(ref(database, "Prescription"), {
        patient: Cookies.get("patient"),
        prescription,
        dueDate: dateStrip(3, dueDate),
      }).then(() => {
        navigate("/dashboard");
      });
    }
  };

  return (
    <div>
      <nav className="App-nav">
        <img src={carecall} alt="logo" className="App-logo" />
        <form className="App-info"></form>
      </nav>
      <form className="newForm">
        <label>
          <b>Prescription:</b> <br />
          <input
            type="text"
            value={prescription}
            onChange={(e) => setPrescription(e.target.value)}
          />
        </label>
        <br />
        <br />
        <b>Date</b>
        <br />
        <DatePicker selected={dueDate} onChange={(date) => setDueDate(date)} />

        <br />
        <button className="App-info" onClick={NewPrescription}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Prescriptions;
