import React, { useState, useEffect } from "react";
import FrameComponent5 from "./FrameComponent5";
import FrameComponent4 from "./FrameComponent4";
import FrameComponent3 from "./FrameComponent3";
import FrameComponent2 from "./FrameComponent2";
import FrameComponent from "./FrameComponent";
import Interactions from "../HomepageDisplay/Interactions";
import Forms from "../HomepageForms/Forms";
import "./FrameComponent1.css";
import FrameContacts from "./FrameContacts";
import "./HOMEPAGE.css";
import BloodPressure from "../HomepageDisplay/BloodPressure";
import { FaBars, FaSearch } from "react-icons/fa";
import "./FrameComponent6.css";
import "./FrameComponent.css";
import Cookies from "js-cookie";
import { FiExternalLink } from "react-icons/fi";
import Tasks from "../HomepageDisplay/Tasks";
import { onAuthStateChanged } from "firebase/auth";
import { auth, database } from "../Firebase";
import { useNavigate } from "react-router-dom";
import { get, onValue, ref, update } from "firebase/database";
import FrameProgram from "./FrameProgram";
import InsuranceEmployer from "../HomepageForms/InsuranceEmployer";
import RightSectionComponent from "./RightSectionComponent";
import BloodSugar from "../HomepageDisplay/BloodSugar";
import BMI from "../HomepageDisplay/BMI";
import FrameConditions from "./FrameConditions";
import FrameInterventions from "./FrameInterventions";
import FrameGoals from "./FrameGoals";
import FrameFamilyConditions from "./FrameFamilyConditions";
import Overview from "../HomepageDisplay/Overview";

const HOMEPAGE = () => {
  const navigate = useNavigate();
  const [state, setState] = React.useState("Overview");
  const [state1, setState1] = React.useState("engagement");

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
  const [insurance, setInsurance] = useState([]);
  const [programStatus, setProgramStatus] = useState([]);
  const [family, setFamily] = useState([]);
  const [address, setAddress] = useState([]);
  const [personalClinical, setPersonalClinical] = useState("personal");

  const [programStatusDisplay, setProgramStatusDisplay] = React.useState("");
  const [sugarDisplay, setSugarDisplay] = React.useState([]);
  const [bmiDisplay, setBmiDisplay] = React.useState([]);
  const [prescriptionDisplay, setPrescriptionDisplay] = React.useState([]);
  const [interactionDisplay, setInteractionDisplay] = React.useState([]);
  const [clinicDisplay, setClinicDisplay] = React.useState([]);
  const [bpDisplay, setBpDisplay] = React.useState([]);
  const [taskDisplay, setTaskDisplay] = React.useState([]);
  const [insuranceDisplay, setInsuranceDisplay] = React.useState([]);
  const [familyDisplay, setFamilyDisplay] = React.useState([]);
  const [addressDisplay, setAddressDisplay] = React.useState([]);
  const [careId, setCareId] = React.useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setAdminPhoto(user.photoURL);
      if (!user) {
        navigate("/");
      }
    });
    // Cookies.remove("careId");

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
        setPatientTasks(tsArray1.reverse());

        //get BP
        var allBP = allDataArray.filter((data) => data.id === "bloodPressure");
        var bpArray1 = Object.entries(allBP[0]).map(([id, data]) => ({
          id,
          ...data,
        }));
        bpArray1.shift();
        setBp(bpArray1);

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

        //Get addresses
        var allAddress = allDataArray.filter((data) => data.id === "Addresses");
        var addressArray1 = Object.entries(allAddress[0]).map(([id, data]) => ({
          id,
          ...data,
        }));
        addressArray1.shift();
        setAddress(addressArray1);

        //get bmi
        var allBmi = allDataArray.filter((data) => data.id === "Bmi");
        var bmiArray1 = Object.entries(allBmi[0]).map(([id, data]) => ({
          id,
          ...data,
        }));
        bmiArray1.shift();
        setBmi(bmiArray1);

        // Family
        var allFamily = allDataArray.filter((data) => data.id === "Family");
        var familyArray1 = Object.entries(allFamily[0]).map(([id, data]) => ({
          id,
          ...data,
        }));
        familyArray1.shift();
        setFamily(familyArray1);

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

        //get sugar
        var allSugar = allDataArray.filter((data) => data.id === "Bloodsugar");
        var sugarArray1 = Object.entries(allSugar[0]).map(([id, data]) => ({
          id,
          ...data,
        }));
        sugarArray1.shift();
        setSugar(sugarArray1);

        //get insurance
        var allInsurance = allDataArray.filter(
          (data) => data.id === "InsuranceEmployer"
        );

        var InsuranceArray1 = Object.entries(allInsurance[0]).map(
          ([id, data]) => ({
            id,
            ...data,
          })
        );
        InsuranceArray1.shift();
        setInsurance(InsuranceArray1);
      });
  }, [allData]);

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
          name.Phone.includes(e.target.value) ||
          name.idc === parseInt(e.target.value)
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

    const randomId = () => {
      if (patient.idc === undefined) {
        let idRand = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        var searches = allPatient.filter((name) => name.idc === idRand);
        Cookies.set("careId", idRand, { expires: 1 });
        if (searches.length === 0) {
          update(ref(database, `${patient.hospital}/clients/${patient.id}`), {
            idc: idRand,
          });
        } else {
          randomId();
        }
      }
    };
    randomId();

    setSearched([]);

    let taskArray = patientTasks.filter((name) => name.patient === patient.id);
    setTaskDisplay(taskArray);

    let clncArray = clinic.filter((name) => name.patient === patient.id);
    setClinicDisplay(clncArray.reverse());

    let intArray = interaction.filter((name) => name.patient === patient.id);
    setInteractionDisplay(intArray.reverse());

    let prescArray = prescription.filter((name) => name.patient === patient.id);
    setPrescriptionDisplay(prescArray.reverse());

    let bmiArray = bmi.filter((name) => name.patient === patient.id);
    setBmiDisplay(bmiArray.reverse());

    let sugarArray = sugar.filter((name) => name.patient === patient.id);
    setSugarDisplay(sugarArray.reverse());

    let programStatusArray = programStatus.filter(
      (name) => name.member === patient.id
    );
    let InsuranceEmployerArray = insurance.filter(
      (name) => name.member === patient.id
    );
    setInsuranceDisplay(InsuranceEmployerArray);

    // programStatusArray[0].member = patient.id;
    setProgramStatusDisplay(programStatusArray[0]);
    let familyArray = family.filter((name) => name.member === patient.id);
    setFamilyDisplay(familyArray);

    let addressArray = address.filter((name) => name.member === patient.id);
    setAddressDisplay(addressArray[0]);

    let bpArray = bp.filter((name) => name.patient === patient.id);
    setBpDisplay(bpArray);
  };

  const allMembers = () => {
    navigate("/allmembers");
  };
  const New = () => {
    navigate("/new");
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
                  <div className="connected-continuous-care-wrapper" style={{marginBottom:"-5%"}}>
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
                placeholder={
                  allData.length > 0
                    ? "name, phone or CareCall ID"
                    : "Loading..."
                }
                type="text"
                onChange={handleSearch}
                value={member}
              />
            </div>
            <div>
              {searched.length > 0 ? (
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
                <ul className="searchable" style={{ display: "none" }}>
                  {searched.map((patient) => (
                    <li
                      key={patient.id}
                      onClick={() => handleResultClick(patient)}
                    >
                      {patient.patient}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="frame-wrapper6">
            <button className="frame-button">
              <div className="frame-child1" />
              <div className="view-all-members" onClick={allMembers}>
                Members
              </div>
            </button>
          </div>
          <div className="frame-wrapper7">
            <div className="frame-parent14">
              <div className="frame-wrapper8">
                <button className="rectangle-parent1">
                  <div className="frame-child2" />
                  <div className="add-new-member" onClick={New}>
                    New Member
                  </div>
                </button>
              </div>
              <img
                className="profile-circle-svgrepocom-icon"
                src={adminPhoto}
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              />
            </div>
          </div>
        </div>
      </header>
      <div className="home-page">
        <main className="frame-parent">
          <div
            className="frame-group"
            style={{ overflow: "scroll", height: "600px" }}
          >
            <FrameComponent5 patientData={patientData} />
            <div className="frame-container">
              <div className="rectangle-parent">
                <div className="frame-child" />
                <div
                  className="personal"
                  style={{ cursor: "pointer" }}
                  onClick={() => setPersonalClinical("personal")}
                >
                  Personal
                </div>
              </div>
              <div className="rectangle-group">
                <div className="frame-item" />
                <div
                  className="clinical"
                  style={{ cursor: "pointer" }}
                  onClick={() => setPersonalClinical("clinical")}
                >
                  Clinical
                </div>
              </div>
            </div>
            {personalClinical === "personal" ? (
              <>
                <FrameProgram programStatusDisplay={programStatusDisplay} />
                <FrameContacts patientData={patientData} />
                <FrameComponent4 insuranceDisplay={insuranceDisplay} />
                <FrameComponent3 addressDisplay={addressDisplay} />
                <FrameComponent2 familyDisplay={familyDisplay} />
              </>
            ) : (
              <>
                <FrameConditions patientData={patientData} />
                <FrameInterventions patientData={patientData} />
                <FrameGoals patientData={patientData} />
                <FrameFamilyConditions patientData={patientData} />

              </>
            )}
          </div>
          <div className="frame-wrapper3">
            <div className="frame-parent24">
              {/* <div className="frame-wrapper14">
                <div className="overview-parent">
                  <h3 className="overview">Overview</h3>
                  <div className="data-processor-wrapper">
                    <FaBars
                      className="data-processor-icon"
                      loading="lazy"
                      alt=""
                    />
                  </div>
                </div>
              </div> */}
              {/* <div
                className="conditions-wrapper"
                onClick={(e) => setState("conditions")}
              >
                <h3 className="conditions">Conditions</h3>
              </div> */}

              <div
                className="conditions-wrapper"
                onClick={(e) => setState("Overview")}
              >
                <h3 className="conditions">Vw</h3>
              </div>
              <div
                className="conditions-wrapper"
                onClick={(e) => setState("BP")}
              >
                <h3 className="conditions">Int</h3>
              </div>
              {/* <div
                className="interventions-wrapper"
                onClick={(e) => setState("interventions")}
              >
                <h3 className="interventions">Interventions</h3>
              </div> */}
              <div
                className="conditions-wrapper"
                onClick={(e) => setState("BS")}
              >
                <h3 className="conditions">Engage</h3>
              </div>
              <div
                className="input-filter"
                onClick={(e) => setState("interactions")}
              >
                <h3 className="interactions">Docs</h3>
              </div>
              <h1 className="h1">{`>`}</h1>
            </div>
          </div>
          {state === "interactions" ? (
            <Interactions interactionDisplay={interactionDisplay} />
          ) : (
            ""
          )}
          {state === "Overview" ? <Overview datas = {[bpDisplay,sugarDisplay,bmiDisplay]} /> : ""}
          
          {state === "BP" ? <BloodPressure bpDisplay={bpDisplay} /> : ""}
          {state === "BS" ? <BloodSugar sugarDisplay={sugarDisplay} /> : ""}
          {state === "BMI" ? <BMI bmiDisplay={bmiDisplay} /> : ""}
          {/* {state === "BMI" ? <Overview bmiDisplay={[bmiDisplay} /> : ""} */}
          
          {/* <RightSectionComponent /> */}
          <div>
            <div className="frame-parent26">
              <div className="engagement-parent">
                <h3
                  className="engagement"
                  onClick={(e) => setState1("engagement")}
                >
                  Engagement
                </h3>
                <div className="line-wrapper">
                  <hr className="line-icon" />
                </div>
              </div>
              {state1 === "forms" ? (
                <h3
                  style={{ color: "#060074" }}
                  className="forms"
                  onClick={(e) => setState1("forms")}
                >
                  Forms
                </h3>
              ) : (
                <h3 className="forms" onClick={(e) => setState1("forms")}>
                  Forms
                </h3>
              )}
              <div className="workflow-wrapper">
                <h3 className="workflow" onClick={(e) => setState1("workflow")}>
                  Workflow
                </h3>
              </div>
              {/* <h1 className="h11">{`>`}</h1> */}
            </div>

            {state1 === "engagement" ? (
              <div
                className="frame-parent25"
                // style={{ overflow: "scroll", height: "600px" }}
              >
                <div className="tasks-parent">
                  <Tasks taskDisplay={[taskDisplay, patientTasks]} />
                </div>

                <div className="member-journey-parent">
                  <b className="member-journey">Member Journey</b>
                  <div className="rectangle-parent9">
                    <div className="frame-child12" />
                    <FiExternalLink className="expand-svgrepocom-icon1" />
                  </div>
                </div>
                <div className="frame-parent27">
                  <div className="rectangle-parent10">
                    <div className="frame-child13" />
                    <FiExternalLink className="expand-svgrepocom-icon2" />
                  </div>
                  <h3 className="appointments">Appointments</h3>
                </div>
                <div className="frame-parent27">
                  <div className="rectangle-parent10">
                    <div className="frame-child13" />
                    <FiExternalLink className="expand-svgrepocom-icon2" />
                  </div>
                  <h3 className="appointments">Engagement Panel</h3>
                </div>
              </div>
            ) : (
              ""
            )}
            {state1 === "forms" ? (
              <Forms patientData={[patientData, programStatusDisplay]} />
            ) : (
              ""
            )}
            {state1 === "workflow" ? "workflow" : ""}
          </div>
        </main>
      </div>
    </div>
  );
};

export default HOMEPAGE;
