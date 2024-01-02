import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { database } from "../Firebase";
import { ref, push, get,update } from "firebase/database";
import Cookies from "js-cookie";
import carecall from "../carecall.png";
import DatePicker from "react-datepicker";

//supabase passwrd 24YC?ei&@qK.UZE
export const NewPatient = () => {
  const [patient, setPatient] = useState("");
  const [Phone, setPhone] = useState(0);
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("Healthy");
  const [goals, setGoals] = useState("");
  const [condition, setCondition] = useState("");
  const [condition1, setCondition1] = useState("");
  const [condition2, setCondition2] = useState("");
  const [condition3, setCondition3] = useState("");
  const [condition4, setCondition4] = useState("");
  const [intervention, setIntervention] = useState("");
  const [intervention1, setIntervention1] = useState("");
  const [intervention2, setIntervention2] = useState("");
  const [intervention3, setIntervention3] = useState("");
  const [intervention4, setIntervention4] = useState("");
  const [dueDates, setDueDates] = useState(new Date());
  const [hc, setHc] = useState();

  const dbRef = ref(database, "HealthCordinator");
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

  const assignedHN = () => {
    let dataArray;
    get(dbRef)
      .then((snapshot) => {
        
        if (snapshot.exists()) {
          dataArray = Object.entries(snapshot.val()).map(([id, data]) => ({
            id,
            ...data,
          }))

          const valuesArray = dataArray.map(obj => obj.tasks);
          
          const min = valuesArray.reduce((a, b) => Math.min(a, b));
          const HealthCord =dataArray.find((name)=> name.tasks === min);
          setHc(HealthCord);

        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return dataArray;
  };


  useEffect(() => {
    assignedHN();
  },[]);

  const Push = (event) => {
    event.preventDefault();
    if (patient && dueDates && status && goals && gender && Phone) {
      //push data to firebase

      push(ref(database, "clients"), {
        patient,
        age: dateStrip(3, dueDates),
        status,
        goals,
        condition,
        condition1,
        condition2,
        condition3,
        condition4,
        intervention,
        intervention1,
        intervention2,
        intervention3,
        intervention4,
        gender,
        Phone,
        hc: hc.user,
      }).then((data) => {

        var strToDate = new Date();

        strToDate.setDate(strToDate.getDate() + 1);
        push(ref(database, "tasks"), {
          patient: data.key,
          task: "Call " + patient + " for welcoming",
          dueDate: dateStrip(3, strToDate),
          completed: "Progress",
        });

        //Add +1 tasks to HC
        const updates = {};
        updates[hc.id + "/tasks"] = parseInt(hc.tasks) + 1;
        update(dbRef, updates);

        Cookies.set("patient", data.key);
        navigate("/dashboard");
      });
    }
  };

  const onOptionChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSelect = (e) => {
    setGender(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div>
      <nav className="App-nav">
        <img src={carecall} alt="logo" className="App-logo" />
        <form className="App-info"></form>
      </nav>
      <div>
        <form className="newForm">
          <label>
            <b>Enter the patient's full name:</b> <br />
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
          <label htmlFor="Gender">
            <select onChange={handleSelect}>
              <option className="App-info" value="MF" key={"MF"}>
                Select Gender
              </option>
              <option className="App-info" value="M" key={"M"}>
                Male
              </option>
              <option className="App-info" value="F" key={"F"}>
                Female
              </option>
            </select>
          </label>
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
          <label>
            <b>Enter the patients health status:</b> <br />
            <input
              type="radio"
              value="Healthy"
              name="status"
              checked={status === "Healthy"}
              onChange={onOptionChange}
            />{" "}
            Healthy <br />
            <input
              type="radio"
              value="At risk"
              name="status"
              checked={status === "At risk"}
              onChange={onOptionChange}
            />{" "}
            At risk <br />
            <input
              type="radio"
              value="Chronic"
              name="status"
              checked={status === "Chronic"}
              onChange={onOptionChange}
            />{" "}
            Chronic <br />
          </label>
          <br />
          <label>
            <b>Enter the patients health goals:</b> <br />
            <input
              type="text"
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
            />
          </label>
          <br />
          <br />
          <b>Enter the condition the patients has:</b> <br />
          <br />
          <label>
            Condition 1: <br />
            <input
              type="text"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            />
          </label>
          <br />
          <label>
            Condition 2: <br />
            <input
              type="text"
              value={condition1}
              onChange={(e) => setCondition1(e.target.value)}
            />
          </label>
          <br />
          <label>
            Condition 3: <br />
            <input
              type="text"
              value={condition2}
              onChange={(e) => setCondition2(e.target.value)}
            />
          </label>
          <br />
          <label>
            Condition 4: <br />
            <input
              type="text"
              value={condition3}
              onChange={(e) => setCondition3(e.target.value)}
            />
          </label>
          <br />
          <label>
            Condition 5: <br />
            <input
              type="text"
              value={condition4}
              onChange={(e) => setCondition4(e.target.value)}
            />
          </label>
          <br />
          <br />
          <b>Enter the interventions to be taken</b>
          <br />
          <br />
          <label>
            Intervention 1: <br />
            <input
              type="text"
              value={intervention}
              onChange={(e) => setIntervention(e.target.value)}
            />
          </label>
          <br />
          <label>
            Intervention 2: <br />
            <input
              type="text"
              value={intervention1}
              onChange={(e) => setIntervention1(e.target.value)}
            />
          </label>
          <br />
          <label>
            Intervention 3: <br />
            <input
              type="text"
              value={intervention2}
              onChange={(e) => setIntervention2(e.target.value)}
            />
          </label>
          <br />
          <label>
            Intervention 4: <br />
            <input
              type="text"
              value={intervention3}
              onChange={(e) => setIntervention3(e.target.value)}
            />
          </label>
          <br />
          <label>
            Intervention 5: <br />
            <input
              type="text"
              value={intervention4}
              onChange={(e) => setIntervention4(e.target.value)}
            />
          </label>
          <br />
          <br />
          <button onClick={Push}>Save</button>
        </form>
      </div>
    </div>
  );
};
