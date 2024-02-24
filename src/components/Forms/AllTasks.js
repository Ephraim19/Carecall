import React, { useState, useEffect } from "react";
import carecall from "../carecall.png";
import { ref, get } from "firebase/database";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { database, auth } from "../Firebase";
import { Link } from "react-router-dom";

const AllTasks = () => {
  const [patientTasks, setPatientTasks] = useState([]);
  const dbRef2 = ref(database, "tasks");
  const dbRef = ref(database, "clients");
  const [patientData, setPatientData] = useState([]);
  const [obj, setObj] = useState("");

  //Sort by date
  const dateSort = (x) => {
    x.sort(function (a, b) {
      if (a.dueDate && b.dueDate) {
        var awords = a.dueDate.slice(5, 17).split(" ");
        var bwords = b.dueDate.slice(5, 17).split(" ");

        var aNewdate = awords[0] + "/" + awords[1] + "/" + awords[2];
        var bNewdate = bwords[0] + "/" + bwords[1] + "/" + bwords[2];

        var strToDatea = new Date(aNewdate);
        var strToDateb = new Date(bNewdate);

        return strToDatea - strToDateb;
      }
    });
  };

  useEffect(() => {
    //get tasks

    var taskArray = [];

    get(dbRef2).then((snapshot) => {
      if (snapshot.exists()) {
        taskArray = Object.entries(snapshot.val()).map(([id, data]) => ({
          id,
          ...data,
        }));

        console.log(taskArray);

        //Sort by date
        dateSort(taskArray);

        setPatientTasks(taskArray);
      }
    });

    var dataArray = [];

    //read user
    get(dbRef).then((snapshot) => {
      if (snapshot.exists()) {
        dataArray = Object.entries(snapshot.val()).map(([id, data]) => ({
          id,
          ...data,
        }));
        setPatientData(dataArray);
      }
    });

    console.log(patientData);
  }, []);

  return (
    <div>
      <nav className="App-nav">
        <img src={carecall} alt="logo" className="App-logo" />
        <form className="App-info"></form>
      </nav>
      <h4>All tasks</h4>
      <table key={1} className="customers">
        <tr>
          <th>Task</th>
          <th>Client</th>

          <th>due</th>

          <th>status</th>
        </tr>
        {patientTasks.map((patient) => (
          <>
            {patient && patientData && patientTasks ? (
              <tr key={patient.id}>
                <td>
                  {" "}
                  <Link className="link" to="/dashboard">
                    {patient.task}
                  </Link>
                </td>
                <td>
                  {patientData.filter((name) => name.id === patient.patient)
                    .length > 0
                    ? patientData.filter(
                        (name) => name.id === patient.patient
                      )[0].patient
                    : " "}
                </td>

                <td> {patient.dueDate ?  patient.dueDate.slice(0, 17) : " "}</td>

                <td key={patient.id}>
                  <form>
                    <label htmlFor="status">
                      <select>
                        <option className="App-info" value="Not started">
                          {patient.completed
                            ? patient.completed
                            : "Not started"}
                        </option>
                        <option className="App-info" value="Not started">
                          Not started
                        </option>
                        <option className="App-info" value="Inprogress">
                          Inprogress
                        </option>
                        <option className="App-info" value="Incomplete">
                          Incomplete
                        </option>
                        <option className="App-info" value="Complete">
                          Complete
                        </option>
                      </select>
                    </label>
                  </form>
                </td>
              </tr>
            ) : (
              " "
            )}
          </>
        ))}

        <br />
      </table>
    </div>
  );
};

export default AllTasks;
