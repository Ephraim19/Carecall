import React, { useState } from "react";
import carecall from "../carecall.png";
import { ref, push } from "firebase/database";
import { database } from "../Firebase";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const HealthStatusForm = () => {
  const [improve, setImprove] = useState("");
  const [activity, setActivity] = useState("");
  const [sleep, setSleep] = useState(0);
  const [cConditions, setCconditions] = useState([]);
  const [FConditions, setFconditions] = useState([]);
  const [drugUse, setDrugUse] = useState([]);

  const navigate = useNavigate();

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

  const pActivities = [
    { condition: "Professional" },
    { condition: " Moderate" },
    { condition: "Mild" },
    { condition: "Minimal" },
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

  const Push = (event) => {
    event.preventDefault();

    push(ref(database, "HealthStatus"), {
      improve,
      activity,
      sleep,
      cConditions,
      FConditions,
      drugUse,
      patient: Cookies.get("patient"),
    }).then((data) => {
      //Add a task if member has conditions
      if (cConditions.length > 0) {
        const today = new Date();
        push(ref(database, "tasks"), {
          patient: Cookies.get("patient"),
          task:
            Cookies.get("userName") +
            " has the following current conditions: " +
              cConditions.map((c) => c.condition),
          dueDate: dateStrip(3, today),
          completed: "Not started",
        });

        //Add a task if member has conditions
        if (FConditions.length > 0) {
          const today = new Date();
          push(ref(database, "tasks"), {
            patient: Cookies.get("patient"),
            task:
              Cookies.get("userName") +
              " has the following conditions in the family: " +
                FConditions.map((c)=> c.condition ) ,

            dueDate: dateStrip(3, today),
            completed: "Not started",
          });
        }

        //Add task of what mbr wants to work on
        if (improve.length > 0) {
          const today = new Date();
          push(ref(database, "tasks"), {
            patient: Cookies.get("patient"),
            task: Cookies.get("userName") + " wants to work on " + improve,

            dueDate: dateStrip(3, today),
            completed: "Not started",
          });
        }
      }

      navigate("/dashboard");
    });
  };

  return (
    <div>
      <nav className="App-nav">
        <img src={carecall} alt="logo" className="App-logo" />
        <form className="App-info"></form>
      </nav>
      <div>
        <h3 style={{ color: "purple", fontSize: "23px", marginLeft: "10%" }}>
          Member Health Status
        </h3>
      </div>
      <form className="newForm">
        <b>Current conditions</b> <br />
        <br />
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
        <b>Family history</b> <br /> <br />
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
        <label>
          <b>What aspect of your health would you want to work on</b> <br />
          <input
            type="text"
            value={improve}
            onChange={(e) => setImprove(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          <b>Physical activity levels</b> <br />
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
        <b>Do you use any of the following?</b> <br />
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
          <b>Hours of sleep per night</b> <br />
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

export default HealthStatusForm;
