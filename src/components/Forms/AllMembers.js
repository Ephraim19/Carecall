import React, { useState, useEffect } from "react";
import carecall from "../carecall.png";
import { ref, get } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { database, auth } from "../Firebase";
import { Link } from "react-router-dom";
import { DateRangePicker } from "react-date-range";
import DatePicker from "react-datepicker";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

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

  const handleHospital = (e) => {
    console.log(e.target.value);
    let obj = patientData.filter((name) => name.hospital === e.target.value);
    setSearched(obj);
    setPatientToDisplay(obj);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);

    var searches = patientData.filter((name) =>
      name.patient.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setPatientToDisplay(searches);
    setSearched(searches);
    console.log(searches);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    let currentDate = new Date(startDate);
    var dates = [];
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate).toDateString());
      currentDate.setDate(currentDate.getDate() + 1);
    }

    var searches = patientData.filter((name) => dates.includes(name.joinDate));

    setPatientToDisplay(searches);
    setSearched(searches);
  };

  return (
    <div>
      <nav className="App-nav">
        <img src={carecall} alt="logo" className="App-logo" />
        <form className="App-info"></form>
      </nav>
      <div style={{ width: "90%", display: "block", margin: "0 auto" }}>
        <h4>All Members</h4>
        <table key={1} className="customers">
          <tr>
            <td>
              {" "}
              <form className="App-info">
                <label>
                  <input
                    className="enlarged-text-box"
                    type="text"
                    value={search}
                    placeholder="Filter member"
                    onChange={handleSearch}
                  />
                </label>
              </form>
            </td>
            <td>
              <form className="App-info">
                <label htmlFor="Gender">
                  <select onChange={handleHospital}>
                    <option className="App-info" value="HS" key={"HS"}>
                      Filter by Hospital
                    </option>
                    <option
                      className="App-info"
                      value="EQA_West_Nairobi_Hospital"
                      key={"EQA_West_Nairobi_Hospital"}
                    >
                      EQA Nairobi West Hospital
                    </option>
                    <option
                      className="App-info"
                      value="EQA_South_B"
                      key={"EQA_South_B"}
                    >
                      EQA South B
                    </option>
                    <option
                      className="App-info"
                      value="EQA_Kitengela"
                      key={"EQA_Kitengela"}
                    >
                      EQA Kitengela
                    </option>
                  </select>
                </label>
              </form>
            </td>
            <td>
              {" "}
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
          </tr>
          <tr>
            <th>Member</th>
            <th>Hospital</th>
            <th>Date joined</th>
          </tr>
          {/* {patientData.length > 0 &&
        patientToDisplay.length > 0 &&
        searched.length === 0 */}
          {searched.length > 0
            ? patientToDisplay.map((patient) => (
                <>
                  <tr key={patient.id}>
                    <td>
                      {" "}
                      <Link className="link" to="/dashboard">
                        {patient.patient}
                      </Link>
                    </td>
                    <td>{patient.hospital}</td>

                    <td> {patient.joinDate ? patient.joinDate : " "}</td>
                  </tr>
                </>
              ))
            : patientData.map((patient) => (
                <>
                  {/* {patient && patientData ? ( */}
                  <tr key={patient.id}>
                    <td>
                      {" "}
                      <Link className="link" to="/dashboard">
                        {patient.patient}
                      </Link>
                    </td>
                    <td>{patient.hospital}</td>

                    <td> {patient.joinDate ? patient.joinDate : " "}</td>
                  </tr>
                </>
              ))}

          <br />
        </table>
      </div>
    </div>
  );
};

export default AllTasks;
