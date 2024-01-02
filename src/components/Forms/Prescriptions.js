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
  const [daysTaken, setDaysTaken] = useState();
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
        daysTaken,
        dueDate: dateStrip(3, dueDate),
      }).then(() => {
        var tody = dateStrip(3, dueDate).slice(5, 17);
        var words = tody.split(" ");
        var newdate = words[0] + "/" + words[1] + "/" + words[2];
        var strToDate = new Date(newdate);

        strToDate.setDate(strToDate.getDate() + parseInt(daysTaken));

        //Create a task
        push(ref(database, "tasks"), {
          patient: Cookies.get("patient"),
          task:
            Cookies.get("userName") +
            " has finished " +
            prescription +
            " on " +
            dateStrip(3, strToDate).slice(0, 17),
          dueDate: dateStrip(3, strToDate),
          completed: "Progress",
        }).then((data) => {
          console.log(data);
        });
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
        <b>Start date</b>
        <br />
        <DatePicker selected={dueDate} onChange={(date) => setDueDate(date)} />

        <br />
        <br />
        <label>
          <b>No of days to be taken</b> <br />
          <input
            type="text"
            value={daysTaken}
            onChange={(e) => setDaysTaken(e.target.value)}
          />
        </label>
        <br />
        <br />
        <button className="App-info" onClick={NewPrescription}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Prescriptions;
