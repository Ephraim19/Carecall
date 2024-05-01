import React, { useEffect, useState } from "react";
import carecall from "../carecall.svg";
import DatePicker from "react-datepicker";
import { ref, update, get, push } from "firebase/database";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { database } from "../Firebase";

const EditClinicals = (props) => {
  const [clinic, setClinic] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [diagnosis, setDiagnosis] = useState("");
  const [clinicArray, setClinicArray] = useState([]);

  const dbRef4 = ref(database, "Clinic");
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

  const NewClinic = (e) => {
    e.preventDefault();

    const updates = {};
    updates[Cookies.get("editC") + "/diagnosis"] = diagnosis;
    updates[Cookies.get("editC") + "/clinic"] = clinic;
    update(dbRef4, updates);

    //ADD +7 to date
    var tody = dateStrip(3, dueDate).slice(5, 17);
    var words = tody.split(" ");
    var newdate = words[0] + "/" + words[1] + "/" + words[2];
    var strToDate = new Date(newdate);
    strToDate.setDate(strToDate.getDate() + 7);

    //Create a task for diagnosis update
    push(ref(database, "tasks"), {
      patient: Cookies.get("patient"),
      task:
        "Please check on " +
        Cookies.get("userName") +
        " to update diagnosis on " +
        diagnosis,
      dueDate: dateStrip(3, strToDate),
      completed: "Not started",
    }).catch((error) => {
      console.log(error);
    });

    console.log('eph')
    navigate("/dashboard");
  };

  useEffect(() => {
    const eph = Cookies.get("editC");

    //read clinical app
    get(dbRef4)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const clinicArray = Object.entries(snapshot.val()).map(
            ([id, data]) => ({
              id,
              ...data,
            })
          );

          const toEdit = clinicArray.find((item) => item.id === eph);
          setClinicArray(toEdit);
          setClinic(toEdit.clinic);
          console.log(toEdit.clinic);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div>
        {/* <p>eph:{props.data}</p> */}
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
          <DatePicker
            selected={dueDate}
            value={clinicArray.dueDate}
            onChange={(date) => setDueDate(date)}
          />
          <br />
          <br />
          <button className="App-info" onClick={NewClinic}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditClinicals;
