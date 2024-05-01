import React, { useState } from "react";
import carecall from "../carecall.svg";
import DatePicker from "react-datepicker";
import { ref, push } from "firebase/database";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { database } from "../Firebase";

const Bmi = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
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

  const NewBmi = (event) => {
    event.preventDefault();

    push(ref(database, "Bmi"), {
      patient: Cookies.get("patient"),
      weight,
      height,
      dueDate: dateStrip(3, dueDate),
    }).then(() => {
      //Create a task if user has abnormal BMI
      if (height === "" || weight === "") {
        console.log("Please fill in all fields");
        navigate("/dashboard");

      } else {
        if (parseInt(weight) / parseInt(height ^ 2) < 18.5) {
          push(ref(database, "tasks"), {
            patient: Cookies.get("patient"),
            task:
              Cookies.get("userName") +
              " is under weight on " +
              dateStrip(3, dueDate).slice(0, 17),
            dueDate: dateStrip(3, new Date()),
            completed: "Not started",
          });
        } else if (parseInt(weight) / parseInt(height ^ 2) > 25) {
          push(ref(database, "tasks"), {
            patient: Cookies.get("patient"),
            task:
              Cookies.get("userName") +
              " is over weight on " +
              dateStrip(3, dueDate).slice(0, 17),
            dueDate: dateStrip(3, new Date()),
            completed: "Not started",
          });
        }
        navigate("/dashboard");
      }
    });
  };

  
  return (
    <div>
      <nav className="App-nav">
        <img src={carecall} alt="logo" className="App-logo" />
        <form className="App-info"></form>
      </nav>
      <form className="newForm">
        <label>
          <b>weight in kg</b> <br />
          <input
            type="text"
            placeholder="i.e 80"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </label>

        <br />
        <br />
        <label>
          <b>Height in meters</b> <br />
          <input
            type="text"
            placeholder="i.e 1.7 "
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </label>

        <br />
        <br />

        <b>Date</b>
        <br />
        <DatePicker selected={dueDate} onChange={(date) => setDueDate(date)} />
        <br />
        <br />
        <button className="App-info" onClick={NewBmi}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Bmi;
