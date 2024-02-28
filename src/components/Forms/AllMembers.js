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


  return (
    <div>
      <nav className="App-nav">
        <img src={carecall} alt="logo" className="App-logo" />
        <form className="App-info"></form>
      </nav>
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
          <td>Status</td>
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
  );
};

export default AllTasks;
