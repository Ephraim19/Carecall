import React, { useState, useEffect } from "react";
import carecall from "../carecall.png";
import { ref, get } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { database, auth } from "../Firebase";
import { Link } from "react-router-dom";
import { DateRangePicker } from "react-date-range";
import DatePicker from "react-datepicker";
import Cookies from "js-cookie";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

const AllTasks = () => {
  const [patientDiagnosis, setPatientDiagnosis] = useState([]);
  const dbRef2 = ref(database, "Clinic");
  const dbRef = ref(database, "clients");
  const [patientData, setPatientData] = useState([]);
  const [patientData111, setPatientData111] = useState([]);

  const [obj, setObj] = useState("");
  const [search, setSearch] = useState("");
  const [searched, setSearched] = useState([]);
  const [patientToDisplay, setPatientToDisplay] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const hs = Cookies.get("hos_admin");
  const cl = hs + "/" + "clients";

  const dbRef111 = ref(database, cl);

  // Function to join arrays based on matching IDs
  function joinArrays(array1, array2) {
    return array1.map((obj1) => {
      let matchedObj = array2.find((obj2) => obj2.id === obj1.id);
      if (matchedObj) {
        return { ...obj1, ...matchedObj };
      } else {
        return obj1;
      }
    });
  }

  useEffect(() => {
    //get clinic

    var diagnosisArray = [];

    get(dbRef2).then((snapshot) => {
      if (snapshot.exists()) {
        diagnosisArray = Object.entries(snapshot.val()).map(([id, data]) => ({
          id,
          ...data,
        }));
        console.log(diagnosisArray);
        setPatientDiagnosis(diagnosisArray);
      }
    });

    var dataArray = [];
    var dataArray111 = [];
    var dataArray11 = [];

    //read user
    get(dbRef111).then((snapshot) => {
      if (snapshot.exists()) {
        dataArray = Object.entries(snapshot.val()).map(([id, data]) => ({
          id,
          ...data,
        }));
        setPatientData(dataArray);
      }
    });

    if(Cookies.get("hos_admin") === "EQA_South_B"){
      get(dbRef).then((snapshot) => {
        if (snapshot.exists()) {
          dataArray11 = Object.entries(snapshot.val()).map(([id, data]) => ({
            id,
            ...data,
          }));
          dataArray11 = dataArray11.filter((name) => name.hospital === "EQA_South_B");
          dataArray111 = dataArray11.concat(dataArray);
          setPatientData(dataArray111);
        }
      });
    }

    // if(Cookies.get("hos_admin") === undefined){
    //   get(dbRef).then((snapshot) => {
    //     if (snapshot.exists()) {
    //       dataArray11 = Object.entries(snapshot.val()).map(([id, data]) => ({
    //         id,
    //         ...data,
    //       }));
    //       dataArray11 = dataArray11.filter((name) => name.hospital === "EQA_South_B");
    //       dataArray111 = dataArray11.concat(dataArray);
    //       setPatientData(dataArray111);
    //     }
    //   });
    // }

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

  const openDashboard = (e) => {
    Cookies.set("currentMember", e.target.innerHTML);
  };

  return (
    <div>
      <nav className="App-nav">
        <img src={carecall} alt="logo" className="App-logo" />
        <form className="App-info"></form>
      </nav>
      <div>
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
            <td>
              {" "}
              <form className="App-info">
                <label>
                  <input
                    className="enlarged-text-box"
                    type="text"
                    value={search}
                    placeholder="Filter by diagnosis"
                    onChange={handleSearch}
                  />
                </label>
              </form>
            </td>
          </tr>
          <tr>
            <th>Member</th>
            <th>Hospital</th>

            <th>Date joined</th>
            <th>Diagnosis</th>
          </tr>

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
                    <td>
                      {patientDiagnosis.filter(
                        (name) => name.patient === patient.id
                      ).length > 0
                        ? patientDiagnosis.filter(
                            (name) => name.patient === patient.id
                          )[
                            patientDiagnosis.filter(
                              (name) => name.patient === patient.id
                            ).length - 1
                          ].diagnosis
                        : ""}
                    </td>
                  </tr>
                </>
              ))
            : patientData.map((patient) => (
                <>
                  {/* {patient && patientData ? ( */}
                  <tr key={patient.id}>
                    <td>
                      {" "}
                      <Link
                        className="link"
                        to="/dashboard"
                        onClick={openDashboard}
                      >
                        {patient.patient}
                      </Link>
                    </td>
                    <td>{patient.hospital}</td>

                    <td> {patient.joinDate ? patient.joinDate : " "}</td>

                    <td>
                      {patientDiagnosis.filter(
                        (name) => name.patient === patient.id
                      ).length > 0
                        ? patientDiagnosis.filter(
                            (name) => name.patient === patient.id
                          )[
                            patientDiagnosis.filter(
                              (name) => name.patient === patient.id
                            ).length - 1
                          ].diagnosis
                        : ""}
                    </td>
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
