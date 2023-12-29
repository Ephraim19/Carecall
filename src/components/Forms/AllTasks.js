import React, { useState } from "react";
import carecall from "../carecall.png";
import DatePicker from "react-datepicker";
import { ref, push } from "firebase/database";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { database } from "../Firebase";

const AllTasks = () => {
  const [patientTasksDisplay, setPatientTasksDisplay] = useState([]);
  
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
                      <select onChange={handleStatus}>
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
