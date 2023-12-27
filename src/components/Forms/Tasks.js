import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { database } from "../Firebase";
import { set, ref, push } from "firebase/database";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const Tasks = () => {
  const [task, setTask] = useState("");
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

  const NewTask = (event) => {
    event.preventDefault();
    console.log(dueDate);
    if (task && dueDate) {
      //push data to firebase
      push(ref(database, "tasks"), {
        patient: Cookies.get("patient"),
        task,
        dueDate: dateStrip(3, dueDate),
        completed: false,
      }).then((data) => {
        console.log(data);
        navigate("/dashboard");
      });
    }
  };

  return (
    <div className="Tasks">
      <form>
        <label>
          <b>Enter task:</b> <br />
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </label>
        <br />
        <br />
        <b>Date</b>
        <br />
        <DatePicker selected={dueDate} onChange={(date) => setDueDate(date)} />

        <br />
        <button className="App-info" onClick={NewTask}>
          Submit
        </button>
      </form>
    </div>
  );
};
