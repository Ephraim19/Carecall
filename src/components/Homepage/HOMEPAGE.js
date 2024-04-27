import React, { useState, useEffect } from "react";
import FrameComponent5 from "./FrameComponent5";
import FrameComponent4 from "./FrameComponent4";
import FrameComponent3 from "./FrameComponent3";
import FrameComponent2 from "./FrameComponent2";
import FrameComponent1 from "./FrameComponent1";
import FrameComponent from "./FrameComponent";
import FrameContacts from "./FrameContacts";
import "./HOMEPAGE.css";
import { FaBars, FaSearch, FaUser } from "react-icons/fa";
import "./FrameComponent6.css";

import { onAuthStateChanged } from "firebase/auth";
import { auth, database } from "../Firebase";
import { useNavigate } from "react-router-dom";
import { get, onValue, ref, update } from "firebase/database";
import FrameProgram from "./FrameProgram";

const HOMEPAGE = () => {
  const navigate = useNavigate();
  const [allData, setAllData] = useState([]);
  const [patientData, setPatientData] = useState([]);
  const dbAll = ref(database);
  const [searched, setSearched] = useState([]);
  const [dataKitengela, setDataKitengela] = useState([]);
  const [dataNairobiWestHospital, setDataNairobiWestHospital] = useState([]);
  const [dataSouthB, setDataSouthB] = useState([]);
  const [allPatient, setAllPatient] = useState([]);
  const [member, setMember] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
      }
    });
    //read the whole database
    get(dbAll).then((snapshot) => {
      if (snapshot.exists()) {
        const allDataArray = Object.entries(snapshot.val()).map(
          ([id, data]) => ({
            id,
            ...data,
          })
        );
        setAllData(allDataArray);
      }
    });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    var dataArray, dataArray1, dataArray2;
    if (e.target.value.length === 1) {
      setMember(e.target.value);
      var EQA_Nairobi_West_Hospital = allData.filter(
        (data) => data.id === "EQA_Nairobi_West_Hospital"
      );
      var EQA_South_B = allData.filter((data) => data.id === "EQA_South_B");
      var EQA_Kitengela = allData.filter((data) => data.id === "EQA_Kitengela");

      if (EQA_Kitengela.length > 0) {
        dataArray = Object.entries(EQA_Kitengela[0].clients).map(
          ([id, data]) => ({
            id,
            ...data,
          })
        );
        setDataKitengela(dataArray);
      }
      if (EQA_Nairobi_West_Hospital.length > 0) {
        dataArray1 = Object.entries(EQA_Nairobi_West_Hospital[0].clients).map(
          ([id, data]) => ({
            id,
            ...data,
          })
        );
        setDataNairobiWestHospital(dataArray1);
      }
      if (EQA_South_B.length > 0) {
        dataArray2 = Object.entries(EQA_South_B[0].clients).map(
          ([id, data]) => ({
            id,
            ...data,
          })
        );
        setDataSouthB(dataArray2);
      }

      var allPatients = dataArray.concat(dataArray1, dataArray2);
      setAllPatient(allPatients);
    } else if (e.target.value.length > 2) {
      setMember(e.target.value);
      var searches = allPatient.filter(
        (name) =>
          name.patient.toLowerCase().includes(e.target.value.toLowerCase()) ||
          name.Phone.includes(e.target.value)
      );

      setSearched(searches);
    } else {
      setMember(e.target.value);

      setSearched([]);
    }
  };

  const handleResultClick = (patient) => {
    setMember(patient.patient);
    setPatientData(patient);
    setSearched([]);
  };

  return (
    <div>
      <header className="home-page-inner">
        <div className="frame-parent11">
          <div className="frame-parent12">
            <div className="navigation-svgrepocom-wrapper">
              <FaBars className="navigation-svgrepocom-icon" />
            </div>
            <div className="carecall-logo-parent">
              {/* <img
          className="carecall-logo-icon"
          loading="lazy"
          alt=""
          src={carecall}
        /> */}
              <div className="frame-wrapper4">
                <div className="carecall-parent">
                  <h1 className="carecall">
                    <span>Care</span>
                    <span className="call">Call</span>
                  </h1>
                  <div className="connected-continuous-care-wrapper">
                    <b className="connected-continuous-care">
                      Connected. Continuous. Care
                    </b>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="frame-wrapper5">
            <div className="frame-parent13">
              <div className="vector-wrapper">
                <FaSearch className="vector-icon" />
              </div>

              <input
                className="search-by-patient"
                placeholder="name, phone or CareCall ID "
                type="text"
                onChange={handleSearch}
                value={member}
              />
            </div>
            <div>
              {searched ? (
                <ul className="searchable">
                  {searched.map((patient) => (
                    <li
                      key={patient.id}
                      onClick={() => handleResultClick(patient)}
                    >
                      {patient.patient}
                    </li>
                  ))}
                </ul>
              ) : (
                " "
              )}
            </div>
          </div>

          <div className="frame-wrapper6">
            <button className="frame-button">
              <div className="frame-child1" />
              <div className="view-all-members">Members</div>
            </button>
          </div>
          <div className="frame-wrapper7">
            <div className="frame-parent14">
              <div className="frame-wrapper8">
                <button className="rectangle-parent1">
                  <div className="frame-child2" />
                  <div className="add-new-member">New Member</div>
                </button>
              </div>
              <FaUser className="profile-circle-svgrepocom-icon" />
            </div>
          </div>
        </div>
      </header>
      <div className="home-page">
        <main className="frame-parent">
          <div className="frame-group">
            <FrameComponent5 patientData={patientData} />
            <div className="frame-container">
              <div className="rectangle-parent">
                <div className="frame-child" />
                <div className="personal">Personal</div>
              </div>
              <div className="rectangle-group">
                <div className="frame-item" />
                <div className="clinical">Clinical</div>
              </div>
            </div>

            <FrameProgram patientData={patientData} />
            <FrameContacts patientData={patientData} />
            <FrameComponent4 />
            <FrameComponent3 />
            <FrameComponent2 />
          </div>
          <div className="frame-wrapper3">
            <FrameComponent1 />
          </div>
          <FrameComponent />
        </main>
      </div>
    </div>
  );
};

export default HOMEPAGE;
