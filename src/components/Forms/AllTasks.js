import React, { useState, useEffect } from "react";
import carecall from "../carecall.png";
import { ref, get } from "firebase/database";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { database, auth } from "../Firebase";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";

const AllTasks = () => {
  const [patientTasks, setPatientTasks] = useState([]);
  const dbRef2 = ref(database, "tasks");
  const dbRef = ref(database, "clients");
  const [patientData, setPatientData] = useState([]);
  const [obj, setObj] = useState("");
  const [search, setSearch] = useState("");
  const [searched, setSearched] = useState([]);
  const [patientToDisplay, setPatientToDisplay] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
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

  const handleStartDateChange = (date) => {
    setStartDate(date);
    console.log("z");
    let currentDate = new Date(startDate);
    var dates = [];
    while (currentDate <= endDate) {
      console.log("zz");

      dates.push(new Date(currentDate).toDateString());
      currentDate.setDate(currentDate.getDate() + 1);
    }

    var searches = patientData.filter((name) => dates.includes(name.joinDate));

    setPatientToDisplay(searches);
    setSearched(searches);
  };

  const handleEndDateChange = (date) => {
    console.log("z");

    setEndDate(date);
    let currentDate = new Date(startDate);
    var dates = [];
    while (currentDate <= endDate) {
      console.log("zz");

      dates.push(new Date(currentDate).toDateString());
      currentDate.setDate(currentDate.getDate() + 1);
    }

    var searches = patientData.filter((name) => dates.includes(name.joinDate));

    setPatientToDisplay(searches);
    setSearched(searches);
  };

  const handleHospital = (e) => {
    console.log(e.target.value);
    let obj = patientTasks.filter((name) => name.completed === e.target.value);
    setSearched(obj);
    setPatientToDisplay(obj);
  };

  return (
    <div>
      <nav className="App-nav">
        <img src={carecall} alt="logo" className="App-logo" />
        <form className="App-info"></form>
      </nav>
      <h4>All tasks</h4>
      <table key={1} className="customers">
        <tr>
          <td>Task</td>
          <td>Client</td>

          <td>
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Start Date"
            />
            <br />
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              placeholderText="End Date"
              minDate={startDate}
            />
          </td>

          <td>
            {" "}
            <form className="App-info">
              <label htmlFor="Gender">
                <select onChange={handleHospital}>
                  <option className="App-info" value="HS" key={"HS"}>
                    Filter by status
                  </option>
                  <option
                    className="App-info"
                    value="Not started"
                    key={"Not started"}
                  >
                    Not started
                  </option>
                  <option
                    className="App-info"
                    value="Inprogress"
                    key={"Inprogress"}
                  >
                    Inprogress
                  </option>
                  <option
                    className="App-info"
                    value="Incomplete"
                    key={"Incomplete"}
                  >
                    EQA Kitengela
                  </option>
                  <option
                    className="App-info"
                    value="complete"
                    key={"complete"}
                  >
                    complete
                  </option>
                </select>
              </label>
            </form>
          </td>
        </tr>
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
                <td> {patient.task}</td>

                <td>
                  {patientData.filter((name) => name.id === patient.patient)
                    .length > 0
                    ? patientData.filter(
                        (name) => name.id === patient.patient
                      )[0].patient
                    : " "}
                </td>

                {new Date(patient.dueDate) <= new Date() &&
                patient.completed !== "complete" ? (
                  <td style={{ color: "red" }}>
                    {patient.dueDate ? patient.dueDate.slice(0, 17) : " "}
                  </td>
                ) : (
                  <td>
                    {patient.dueDate ? patient.dueDate.slice(0, 17) : " "}
                  </td>
                )}

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
