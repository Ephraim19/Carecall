import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { database } from "../Firebase";
import { set, ref, push } from "firebase/database";
import Cookies from "js-cookie";
import carecall from "../carecall.png";


//supabase passwrd 24YC?ei&@qK.UZE
export const NewPatient = () => {
  const [patient, setPatient] = useState("");
  const [age, setAge] = useState("");
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

  const navigate = useNavigate();

  const Push = (event) => {
    event.preventDefault();
    if (patient && age && status && goals) {
      //push data to firebase
      set(
        push(ref(database, "clients"), {
          patient,
          age,
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
        }).then((data) => {
          Cookies.set("FirebaseKey", data.key, { expires: 2 });
          navigate("/dashboard");
        })
      ).catch((error) => {
        console.log(error);
      });
    }
  };

  const onOptionChange = (e) => {
    setStatus(e.target.value);
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
          <label>
            <b>Enter the patients age:</b> <br />
            <input
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
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
          <b>Enter the interventions to be taken</b><br />
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
