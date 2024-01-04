import React, { useEffect, useState } from "react";
import { database } from "../Firebase";
import { ref, push, get, update } from "firebase/database";
import carecall from "../carecall.png";
import DatePicker from "react-datepicker";

const HealthStatusForm = () => {
  const [patient, setPatient] = useState("");
  const [Phone, setPhone] = useState(0);
  const [gender, setGender] = useState("");
  const [condition, setCondition] = useState("");
  const [condition1, setCondition1] = useState("");
  const [condition2, setCondition2] = useState("");
  const [condition3, setCondition3] = useState("");
  const [condition4, setCondition4] = useState("");
  const [file, setFile] = useState([]);
  const [percent, setPercent] = useState(0);
  const [Save, setSave] = useState("Save");

  const [dueDates, setDueDates] = useState(new Date());
  const [hc, setHc] = useState();

  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [medication, setMedication] = useState("");
  const [blood, setBlood] = useState("");

  const dbRef = ref(database, "HealthCordinator");

  const dateStrip = (numOfHours, date) => {
    const dateCopy = new Date(date.getTime());
    dateCopy.setTime(dateCopy.getTime() + numOfHours * 60 * 60 * 1000);
    const stringDate = JSON.stringify(dateCopy.toUTCString().toString()).slice(
      1,
      -5
    );
    return stringDate;
  };

  const Push = (e) =>{
    e.preventDefault();
  }

  return (
    <div>
      <nav className="App-nav">
        <img src={carecall} alt="logo" className="App-logo" />
        <form className="App-info"></form>
      </nav>
      <div>
        <h3 style={{ color: "purple", fontSize: "25px", marginLeft: "10%" }}>
          Health Status
        </h3>
        <form className="newForm">
          <label>
            <b>Full name:</b> <br />
            <input
              type="text"
              value={patient}
              onChange={(e) => setPatient(e.target.value)}
            />
          </label>
          <br />
          <br />
          <b>Date of birth</b>
          <br />
          <DatePicker
            selected={dueDates}
            onChange={(date) => setDueDates(date)}
          />
          <br />
          <br />
          <b>Gender</b> <br />
          
          <br />
          <br />
          <label>
            <b>Phone number:</b> <br />
            <input
              type="number"
              value={Phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>
          <br />
          <br />
          <b>Diagnosis</b> <br />
          <br />
          <label>
            Diagnosis 1: <br />
            <input
              type="text"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            />
          </label>
          <br />
          <label>
            Diagnosis 2: <br />
            <input
              type="text"
              value={condition1}
              onChange={(e) => setCondition1(e.target.value)}
            />
          </label>
          <br />
          <label>
            Diagnosis 3: <br />
            <input
              type="text"
              value={condition2}
              onChange={(e) => setCondition2(e.target.value)}
            />
          </label>
          <br />
          <label>
            Diagnosis 4: <br />
            <input
              type="text"
              value={condition3}
              onChange={(e) => setCondition3(e.target.value)}
            />
          </label>
          <br />
          <label>
            Diagnosis 5: <br />
            <input
              type="text"
              value={condition4}
              onChange={(e) => setCondition4(e.target.value)}
            />
          </label>
          <br />
          <br />
          <label>
            <b>Medication (Include dosage, frequency and duration)</b> <br />
            <input
              type="text"
              value={medication}
              onChange={(e) => setMedication(e.target.value)}
            />
          </label>
          <br />
          <br />
          <label>
            <b>Blood pressure:</b> <br />
            <input
              type="text"
              value={blood}
              onChange={(e) => setBlood(e.target.value)}
            />
          </label>
          <br />
          <br />
          <label>
            <b>Height</b> <br />
            <input
              type="text"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </label>
          <br />
          <br />
          <label>
            <b>Weight</b> <br />
            <input
              type="text"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </label>
          <br />
          <br />
          <button onClick={Push}>{Save}</button>
        </form>
      </div>
    </div>
  );
};

export default HealthStatusForm;
