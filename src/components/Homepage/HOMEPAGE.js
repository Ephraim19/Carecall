import React, { useState, useEffect } from "react";
import FrameComponent5 from "./FrameComponent5";
import FrameComponent4 from "./FrameComponent4";
import FrameComponent3 from "./FrameComponent3";
import FrameComponent2 from "./FrameComponent2";
import FrameComponent1 from "./FrameComponent1";
import FrameComponent from "./FrameComponent";
import FrameContacts from "./FrameContacts";
import "./HOMEPAGE.css";
import { FaBars, FaSearch } from "react-icons/fa";
import "./FrameComponent6.css";
import Cookies from "js-cookie";


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
  const [adminPhoto, setAdminPhoto] = useState("");
  const [patientTasks, setPatientTasks] = useState([]);
  const [bp, setBp] = useState([]);
  const [clinic, setClinic] = useState([]);
  const [interaction, setInteraction] = useState([]);
  const [prescription, setPrescription] = useState([]);
  const [bmi, setBmi] = useState([]);
  const [sugar, setSugar] = useState([]);
  const [programStatus, setProgramStatus] = useState([]);

  const [programStatusDisplay, setProgramStatusDisplay] = React.useState("");
  const [sugarDisplay, setSugarDisplay] = React.useState([]);
  const [bmiDisplay, setBmiDisplay] = React.useState([]);
  const [prescriptionDisplay, setPrescriptionDisplay] = React.useState([]);
  const [interactionDisplay, setInteractionDisplay] = React.useState([]);
  const [clinicDisplay, setClinicDisplay] = React.useState([]);
  const [bpDisplay, setBpDisplay] = React.useState([]);
  const [taskDisplay, setTaskDisplay] = React.useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setAdminPhoto(user.photoURL);
      if (!user) {
        navigate("/");
      }
    });

    //read the whole database
    var allDataArray = [];
    get(dbAll)
      .then((snapshot) => {
        if (snapshot.exists()) {
          allDataArray = Object.entries(snapshot.val()).map(([id, data]) => ({
            id,
            ...data,
          }));
          setAllData(allDataArray);
        }
      })
      .then(() => {
        //get tasks
        var allTasks = allDataArray.filter((data) => data.id === "tasks");
        var tsArray1 = Object.entries(allTasks[0]).map(([id, data]) => ({
          id,
          ...data,
        }));
        tsArray1.shift();
        setPatientTasks(tsArray1);

        //get interaction
        var allInteraction = allDataArray.filter(
          (data) => data.id === "Interaction"
        );
        var intArray1 = Object.entries(allInteraction[0]).map(([id, data]) => ({
          id,
          ...data,
        }));
        intArray1.shift();
        setInteraction(intArray1);

        //get clinic
        var allClinic = allDataArray.filter((data) => data.id === "Clinic");
        var clncArray1 = Object.entries(allClinic[0]).map(([id, data]) => ({
          id,
          ...data,
        }));
        clncArray1.shift();
        setClinic(clncArray1);

        //get prescription
        var allPrescription = allDataArray.filter(
          (data) => data.id === "Prescription"
        );
        var prescArray1 = Object.entries(allPrescription[0]).map(
          ([id, data]) => ({
            id,
            ...data,
          })
        );
        prescArray1.shift();
        setPrescription(prescArray1);

        //get bmi
        var allBmi = allDataArray.filter((data) => data.id === "Bmi");
        var bmiArray1 = Object.entries(allBmi[0]).map(([id, data]) => ({
          id,
          ...data,
        }));
        bmiArray1.shift();
        setBmi(bmiArray1);

        //get sugar
        var allSugar = allDataArray.filter((data) => data.id === "Bloodsugar");
        var sugarArray1 = Object.entries(allSugar[0]).map(([id, data]) => ({
          id,
          ...data,
        }));
        sugarArray1.shift();
        setSugar(sugarArray1);

        //get bp
        // var allBp = allDataArray.filter((data) => data.id === "bloodpressure");
        // var bpArray1 = Object.entries(allBp[0]).map(([id, data]) => ({
        //   id,
        //   ...data,
        // }));
        // bpArray1.shift();

        //get programStatus
        var allProgramStatus = allDataArray.filter(
          (data) => data.id === "programStatus"
        );
        var psArray1 = Object.entries(allProgramStatus[0]).map(
          ([id, data]) => ({
            id,
            ...data,
          })
        );
        psArray1.shift();
        setProgramStatus(psArray1);
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
    Cookies.set("memberId", patient.id, { expires: 1 })

    setSearched([]);

    let taskArray = patientTasks.filter((name) => name.patient === patient.id);
    setTaskDisplay(taskArray);
    // let Bps = bp.filter((name) => name.patient === patient.id);
    let clncArray = clinic.filter((name) => name.patient === patient.id);
    setClinicDisplay(clncArray);
    let intArray = interaction.filter((name) => name.patient === patient.id);
    setInteractionDisplay(intArray);
    let prescArray = prescription.filter((name) => name.patient === patient.id);
    setPrescriptionDisplay(prescArray);
    let bmiArray = bmi.filter((name) => name.patient === patient.id);
    setBmiDisplay(bmiArray);
    let sugarArray = sugar.filter((name) => name.patient === patient.id);
    setSugarDisplay(sugarArray);
    let programStatusArray = programStatus.filter(
      (name) => name.member === patient.id
    );

    // programStatusArray[0].member = patient.id;
    // console.log("programStatusArray", programStatusArray[0]);
    setProgramStatusDisplay(programStatusArray[0]);
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
              <img
                className="profile-circle-svgrepocom-icon"
                src={adminPhoto}
              />
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

            <FrameProgram programStatusDisplay={programStatusDisplay} patientData={patientData} />
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
