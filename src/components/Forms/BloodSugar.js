import React, { useState } from "react";
import carecall from "../carecall.png";
import DatePicker from "react-datepicker";
import { ref, push } from "firebase/database";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { database } from "../Firebase";

const BloodSugar = () => {
  const [fasting, setFasting] = useState("");
  const [random, setRandom] = useState("");
  const [HBA1C, setHBA1C] = useState("");
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

  const NewSugar = (event) => {
    event.preventDefault();
    if (fasting || random || HBA1C && dueDate) {
      push(ref(database, "Bloodsugar"), {
        patient: Cookies.get("patient"),
        random,
        fasting,
        HBA1C,
        dueDate: dateStrip(3, dueDate),
      }).then(() => {
        //Create a task if user has abnormal Blood sugar

        if (parseFloat(HBA1C) > 5.7 || parseFloat(fasting) > 10 || parseFloat(fasting) < 4 || parseFloat(random) > 10 || parseFloat(random) < 4) {
          push(ref(database, "tasks"), {
            patient: Cookies.get("patient"),
            task:
              Cookies.get("userName") +
              " has low / high blood sugar on " +
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
          <b>Fasting blood sugar(mmol/l)</b> <br />
          <input
            type="text"
            value={fasting}
            onChange={(e) => setFasting(e.target.value)}
          />
        </label>

        <br />
        <br />
        <label>
          <b>Random blood sugar</b> <br />
          <input
            type="text"
            value={random}
            onChange={(e) => setRandom(e.target.value)}
          />
        </label>

        <br />
        <br />

        <label>
          <b>HBA1C</b> <br />
          <input
            type="text"
            value={HBA1C}
            onChange={(e) => setHBA1C(e.target.value)}
          />
        </label>

        <br />
        <br />

        <b>Date</b>
        <br />
        <DatePicker selected={dueDate} onChange={(date) => setDueDate(date)} />
        <br />
        <br />
        <button className="App-info" onClick={NewSugar}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default BloodSugar;
