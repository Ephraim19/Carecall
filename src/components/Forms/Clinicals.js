import React, { useState } from "react";
import carecall from "../carecall.svg";
import DatePicker from "react-datepicker";
import { ref, push } from "firebase/database";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { database } from "../Firebase";

const Clinicals = () => {
  const [clinic, setClinic] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [diagnosis, setDiagnosis] = useState("");
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

  const NewClinic = (event) => {
    event.preventDefault();
    if (clinic && dueDate) {
      push(ref(database, "Clinic"), {
        patient: Cookies.get("patient"),
        clinic,
        diagnosis,
        status: "Active",
        dueDate: dateStrip(3, dueDate),
      }).then(() => {
        //Create a task for appointment reminder
        push(ref(database, "tasks"), {
          patient: Cookies.get("patient"),
          task:
            "Remind " +
            Cookies.get("userName") +
            " to go to " +
            clinic +
            " on " +
            dateStrip(3, dueDate).slice(0, 17),
          dueDate: dateStrip(3, dueDate),
          completed: "Not started",
        });

        //Create a task for appointment followup
        var tody = dateStrip(3, dueDate).slice(5, 17);
        var words = tody.split(" ");
        var newdate = words[0] + "/" + words[1] + "/" + words[2];
        var strToDate = new Date(newdate);
        strToDate.setDate(strToDate.getDate() + 1);

        push(ref(database, "tasks"), {
          patient: Cookies.get("patient"),
          task:
            "Follow up on " +
            Cookies.get("userName") +
            " about " +
            clinic +
            " appointment " +
            dateStrip(3, strToDate).slice(0, 17),
          dueDate: dateStrip(3, strToDate),
          completed: "Not started",
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
          <b>Hospital:</b> <br />
          <input
            type="text"
            value={clinic}
            onChange={(e) => setClinic(e.target.value)}
          />
        </label>

        <br />
        <br />
        <label>
          <b>Diagnosis:</b> <br />
          <input
            type="text"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
          />
        </label>

        <br />
        <br />
        <b>Date</b>
        <br />
        <DatePicker selected={dueDate} onChange={(date) => setDueDate(date)} />
        <br />
        <br />
        <button className="App-info" onClick={NewClinic}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Clinicals;
