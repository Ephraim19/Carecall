import React, { useState } from "react";
import carecall from "../carecall.png";
import DatePicker from "react-datepicker";
import { ref, push } from "firebase/database";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { database } from "../Firebase";

const BloodPressure = () => {
  const [pressure, setPressure] = useState("");
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

  const NewBp = (event) => {
    event.preventDefault();
    if (pressure && dueDate) {
      push(ref(database, "bloodPressure"), {
        patient: Cookies.get("patient"),
        pressure,
        dueDate: dateStrip(3, dueDate),
      }).then((data) => {
        //Create a task if bp is high or low
        if (pressure.split("/")[0] > 120 || pressure.split("/")[1] > 80) {
          push(ref(database, "tasks"), {
            patient: Cookies.get("patient"),
            task:
              Cookies.get("userName") +
              " had a high blood pressure on " +
              dateStrip(3, dueDate).slice(0, 17),
            dueDate: dateStrip(3, new Date),
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
    <div>
      <nav className="App-nav">
        <img src={carecall} alt="logo" className="App-logo" />
        <form className="App-info"></form>
      </nav>
      <form className="newForm">
        <label>
          <b>Blood pressure:</b> <br />
          <input
            type="text"
            placeholder="i.e 120/80"
            value={pressure}
            onChange={(e) => setPressure(e.target.value)}
          />
        </label>

        <br />
        <br />
        <b>Date</b>
        <br />
        <DatePicker selected={dueDate} onChange={(date) => setDueDate(date)} />
        <br />
        <button className="App-info" onClick={NewBp}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default BloodPressure;
