import React, { useState, useEffect } from "react";
import carecall from "../carecall.svg";
import { ref, get, update } from "firebase/database";

import { database } from "../Firebase";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const HealthStatusEdit = () => {
  const [improve, setImprove] = useState("");
  const [activity, setActivity] = useState("");
  const [sleep, setSleep] = useState(0);
  const [cConditions, setCconditions] = useState([]);
  const [FConditions, setFconditions] = useState([]);
  const [drugUse, setDrugUse] = useState([]);
  const [healthSDisplayId, setHealthSDisplayId] = useState("");

  const dbRef = ref(database, "HealthStatus");

  const navigate = useNavigate();

  useEffect(() => {
    get(dbRef).then((snapshot) => {
      if (snapshot.exists()) {
        const dataArray = Object.entries(snapshot.val()).map(([id, data]) => ({
          id,
          ...data,
        }));

        const obj = dataArray.find(
          (name) => name.patient === Cookies.get("patient")
        );

        setActivity(obj.activity);
        setImprove(obj.improve);
        setSleep(obj.sleep);
        setHealthSDisplayId(obj.id);

        setFconditions(obj.FConditions);
        setCconditions(obj.cConditions);
        setDrugUse(obj.drugUse);
      }
    });
  }, []);

  const current = [
    { condition: "High blood pressure" },
    { condition: " Asthma" },
    { condition: "High Cholesterol" },
    { condition: "Overweight" },
    { condition: " Lower back pain" },
    { condition: "Diabetes" },
    { condition: "Cancer" },
    { condition: "Osteoarthritis" },
    { condition: "other" },
  ];

  const Fcurrent = [
    { condition: "High blood pressure" },
    { condition: "Asthma" },
    { condition: "High Cholesterol" },
    { condition: "Overweight" },
    { condition: "Lower back pain" },
    { condition: "Diabetes" },
    { condition: "Cancer" },
    { condition: "Osteoarthritis" },
    { condition: "other" },
  ];

  const drugs = [
    { condition: "Alcohol" },
    { condition: " Cigarretes" },
    { condition: "Other" },
    { condition: "None" },
  ];
  const [checkedState, setCheckedState] = useState(
    new Array(current.length).fill(false)
  );

  const [checkedState1, setCheckedState1] = useState(
    new Array(Fcurrent.length).fill(false)
  );

  const [checkedState2, setCheckedState2] = useState(
    new Array(drugs.length).fill(false)
  );

  const pActivities = [
    { condition: "Professional" },
    { condition: " Moderate" },
    { condition: "Mild" },
    { condition: "Minimal" },
  ];

  const [checkedState3, setCheckedState3] = useState(
    new Array(pActivities.length).fill(false)
  );

  const dateStrip = (numOfHours, date) => {
    const dateCopy = new Date(date.getTime());
    dateCopy.setTime(dateCopy.getTime() + numOfHours * 60 * 60 * 1000);
    const stringDate = JSON.stringify(dateCopy.toUTCString().toString()).slice(
      1,
      -5
    );
    return stringDate;
  };

  //Checkbox
  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);

    var a = [];
    const AllConditions = updatedCheckedState.reduce(
      (all, currentState, index, AllTowns = []) => {
        if (currentState === true) {
          a.push(current[index]);
          setCconditions(a);
          return AllTowns;
        }
        return all;
      },
      current
    );
  };

  //Checkbox_1
  const handleOnChange1 = (position) => {
    const updatedCheckedState = checkedState1.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState1(updatedCheckedState);

    var b = [];
    const AllCConditions = updatedCheckedState.reduce(
      (all, currentState, index, AllTowns1 = []) => {
        if (currentState === true) {
          b.push(Fcurrent[index]);
          setFconditions(b);
          return AllTowns1;
        }
        return all;
      },
      Fcurrent
    );
  };

  //Checkbox_2
  const handleOnChange2 = (position) => {
    const updatedCheckedState = checkedState2.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState2(updatedCheckedState);

    var c = [];
    const AllDrugs = updatedCheckedState.reduce(
      (all, currentState, index, AllTowns2 = []) => {
        if (currentState === true) {
          c.push(drugs[index]);
          setDrugUse(c);

          console.log(c);
          return AllTowns2;
        }
        return all;
      },
      drugs
    );
  };

  //Checkbox_3
  const handleOnChange3 = (position) => {
    const updatedCheckedState = checkedState3.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState3(updatedCheckedState);

    var d = [];
    const AllActivity = updatedCheckedState.reduce(
      (all, currentState, index, AllTowns2 = []) => {
        if (currentState === true) {
          d.push(pActivities[index]);
          setActivity(d);

          return AllTowns2;
        }
        return all;
      },
      activity
    );
  };

  const Push = (e) => {
    e.preventDefault();
    //Update user statys
    const updates = {};
    updates[healthSDisplayId + "/activity"] = activity;
    updates[healthSDisplayId + "/improve"] = improve;
    updates[healthSDisplayId + "/sleep"] = sleep;

    update(dbRef, updates);
    navigate("/dashboard");
  };

  return (
    <div>
      <nav className="App-nav">
        <img src={carecall} alt="logo" className="App-logo" />
        <form className="App-info"></form>
      </nav>
      <div>
        <h3 style={{ textAlign: "center", color: "purple", fontSize: "23px" }}>
          Member Health Status
        </h3>
      </div>
      <form className="newForm">
        <h4
          style={{
            textAlign: "center",
            color: "purple",
            fontSize: "20px",
          }}
        >
          Current conditions
        </h4>
        <ul className="toppings-list">
          {current.map(({ condition }, index) => {
            return (
              <li key={index}>
                <div className="toppings-list-item">
                  <label htmlFor={`custom-checkbox-${index}`}>
                    {condition}
                  </label>

                  <div className="left-section">
                    <input
                      type="checkbox"
                      id={`custom-checkbox-${index}`}
                      name={condition}
                      value={condition}
                      checked={checkedState[index]}
                      onChange={() => handleOnChange(index)}
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <br />
        <br />
        <h4
          style={{
            textAlign: "center",
            color: "purple",
            fontSize: "20px",
          }}
        >
          Family conditions
        </h4>
        <ul className="toppings-list">
          {Fcurrent.map(({ condition }, index) => {
            return (
              <li key={index}>
                <div className="toppings-list-item">
                  <label htmlFor={`custom-checkbox-${index}`}>
                    {condition}
                  </label>

                  <div className="left-section">
                    <input
                      type="checkbox"
                      id={`custom-checkbox-${index}`}
                      name={condition}
                      value={condition}
                      checked={checkedState1[index]}
                      onChange={() => handleOnChange1(index)}
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <br />
        <br />
        <h4
          style={{
            textAlign: "center",
            color: "purple",
            fontSize: "20px",
          }}
        >
          Do you use any of the following drugs?
        </h4>
        <ul className="toppings-list">
          {drugs.map(({ condition }, index) => {
            return (
              <li key={index}>
                <div className="toppings-list-item">
                  <label htmlFor={`custom-checkbox-${index}`}>
                    {condition}
                  </label>

                  <div className="left-section">
                    <input
                      type="checkbox"
                      id={`custom-checkbox-${index}`}
                      name={condition}
                      value={condition}
                      checked={checkedState2[index]}
                      onChange={() => handleOnChange2(index)}
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <br />
        <br />
        <label>
          <h4
            style={{
              textAlign: "center",
              color: "purple",
              fontSize: "20px",
            }}
          >
            Physical Activity level
          </h4>
          <ul className="toppings-list">
            {pActivities.map(({ condition }, index) => {
              return (
                <li key={index}>
                  <div className="toppings-list-item">
                    <label htmlFor={`custom-checkbox-${index}`}>
                      {condition}
                    </label>

                    <div className="left-section">
                      <input
                        type="checkbox"
                        id={`custom-checkbox-${index}`}
                        name={condition}
                        value={condition}
                        checked={checkedState3[index]}
                        onChange={() => handleOnChange3(index)}
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </label>
        <br />
        <br />
        <label>
          <h5
            style={{
              color: "purple",
              fontSize: "20px",
            }}
          >
            What aspect of your health would you like to improve on?
          </h5>
          <input
            type="text"
            value={improve}
            onChange={(e) => setImprove(e.target.value)}
          />
        </label>
        <br />
        <br />

        <label>
          <h5
            style={{
              color: "purple",
              fontSize: "20px",
            }}
          >
            Hours of sleep per night
          </h5>
          <input
            type="number"
            value={sleep}
            onChange={(e) => setSleep(e.target.value)}
          />
        </label>
        <br />
        <br />
        <button onClick={Push}>Submit</button>
      </form>
    </div>
  );
};

export default HealthStatusEdit;
