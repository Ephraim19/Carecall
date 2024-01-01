import React, { useState, useEffect } from "react";
import carecall from "../carecall.png";
import { ref, get } from "firebase/database";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { database, auth } from "../Firebase";
import { getAuth } from "firebase/auth";

const AllTasks = () => {
  const [patientTasks, setPatientTasks] = useState([]);
  const dbRef2 = ref(database, "tasks");

  //Sort by date
  const dateSort = (x) => {
    x.sort(function(a, b) {
      var awords = a.dueDate.slice(5, 17).split(" ");
      var bwords = b.dueDate.slice(5, 17).split(" ");

      var aNewdate = awords[0] + "/" + awords[1] + "/" + awords[2];
      var bNewdate = bwords[0] + "/" + bwords[1] + "/" + bwords[2];

      var strToDatea = new Date(aNewdate);
      var strToDateb = new Date(bNewdate);

      return strToDatea - strToDateb;
    });
  };
  //get tasks

  useEffect(() => {
    get(dbRef2)
      .then((snapshot) => {
        if (snapshot.exists()) {
          var taskArray = Object.entries(snapshot.val()).map(([id, data]) => ({
            id,
            ...data,
          }));

          //Sort by date
          dateSort(taskArray);

          setPatientTasks(taskArray);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div>
      <nav className="App-nav">
        <img src={carecall} alt="logo" className="App-logo" />
        <form className="App-info"></form>
      </nav>
      <h4>All tasks</h4>
      <table className="customers">
        <tr>
          <th>Task</th>

          <th>due</th>

          <th>status</th>
        </tr>
        {patientTasks.map((patient) => (
          <>
            {patient ? (
              <tr key={patient.id}>
                <td>{patient.task}</td>

                <td>{patient.dueDate.slice(0, 17)}</td>

                <td key={patient.id}>
                  <form>
                    <label htmlFor="status">
                      <select>
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
