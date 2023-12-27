import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { remove, get, ref, child, update } from "firebase/database";
import { database } from "./Firebase";
import carecall from "./carecall.png";
import { useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { FaList, FaRegHeart } from "react-icons/fa";
import {
  FiHome,
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle,
} from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";

const Dashboard = () => {
  const [patientData, setPatientData] = useState([]);
  const [search, setSearch] = useState("");
  const [optionValue, setOptionValue] = useState("");
  const [patientToDisplay, setPatientToDisplay] = useState([]);
  const [patientTasks, setPatientTasks] = useState([]);
  const [patientTasksDisplay, setPatientTasksDisplay] = useState([]);
  const [bp, setBp] = useState([]);
  const [bpDisplay, setBpDisplay] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [clinic, setClinic] = useState([]);
  const [clinicDisplay, setClinicDisplay] = useState([]);
  const [interaction, setInteraction] = useState([]);
  const [intDisplay, setIntDisplay] = useState([]);
  const [prescription, setPrescription] = useState([]);
  const [prescDisplay, setPrescDisplay] = useState([]);

  const cookie = Cookies.get("name");
  const navigate = useNavigate();

  const dbRef = ref(database, "clients");
  const dbRef2 = ref(database, "tasks");
  const dbRef3 = ref(database, "bloodPressure");
  const dbRef4 = ref(database, "Clinic");
  const dbRef5 = ref(database, "Interaction");
  const dbRef6 = ref(database, "Prescription");

  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false);

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  useEffect(() => {
    //read user
    get(dbRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const dataArray = Object.entries(snapshot.val()).map(
            ([id, data]) => ({
              id,
              ...data,
            })
          );
          setPatientData(dataArray);
          setPatientToDisplay([dataArray[dataArray.length - 1]]);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    //get tasks
    get(dbRef2)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const taskArray = Object.entries(snapshot.val()).map(
            ([id, data]) => ({
              id,
              ...data,
            })
          );
          setPatientTasks(taskArray);
          setPatientTasksDisplay([taskArray[taskArray.length - 1]]);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    //read bp
    get(dbRef3)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const bpArray = Object.entries(snapshot.val()).map(([id, data]) => ({
            id,
            ...data,
          }));

          setBp(bpArray);
          setBpDisplay([bpArray[bpArray.length - 1]]);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    //read clinical app
    get(dbRef4)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const clinicArray = Object.entries(snapshot.val()).map(
            ([id, data]) => ({
              id,
              ...data,
            })
          );

          setClinic(clinicArray);
          setClinicDisplay([clinicArray[clinicArray.length - 1]]);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    //read interactions
    get(dbRef5)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const intArray = Object.entries(snapshot.val()).map(([id, data]) => ({
            id,
            ...data,
          }));
          console.log(intArray);
          setInteraction(intArray);
          setIntDisplay([intArray[intArray.length - 1]]);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    //read prescriptions
    get(dbRef6)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const prescArray = Object.entries(snapshot.val()).map(
            ([id, data]) => ({
              id,
              ...data,
            })
          );

          setPrescription(prescArray);
          setPrescDisplay([prescArray[prescArray.length - 1]]);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSelect = (e) => {
    setOptionValue(e.target.value);
    setSearch(e.target.value);

    let obj = patientData.find((name) => name.patient === e.target.value);
    let taskArray = patientTasks.filter((name) => name.patient === obj.id);
    let Bps = bp.filter((name) => name.patient === obj.id);
    let clncArray = clinic.filter((name) => name.patient === obj.id);
    let intArray = interaction.filter((name) => name.patient === obj.id);
    let prescArray = prescription.filter((name) => name.patient === obj.id);

    const dataArray = [obj];

    setPatientToDisplay(dataArray);
    setPatientTasksDisplay(taskArray);
    setBpDisplay(Bps);
    setClinicDisplay(clncArray);
    setIntDisplay(intArray);
    setPrescDisplay(prescArray);

    Cookies.set("patient", obj.id);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    //setOptionValue(e.target.value);
  };

  const handleOnChange = (e) => {
    console.log(e.target.value);
    const checkedId = e.target.value;
    const updates = {};

    if (e.target.checked) {
      setSelectedIds([...selectedIds, checkedId]);

      updates[checkedId + "/completed"] = true;

      update(dbRef2, updates);
    } else {
      setSelectedIds(selectedIds.filter((id) => id !== checkedId));

      updates[checkedId + "/completed"] = false;

      update(dbRef2, updates);
    }
  };

  const Logout = () => {
    navigate("/");
  };

  const New = () => {
    navigate("/new");
  };

  return (
    <div>
      <nav className="App-nav">
        <img src={carecall} alt="logo" className="App-logo" />
        <form className="App-info">
          <label>
            <input
              className="enlarged-text-box"
              type="text"
              value={search}
              placeholder="Search patient"
              //onChange={(e) => setSearch(e.target.value)}
              onChange={handleSearch}
            />
          </label>
        </form>
        <button className="App-info" onClick={New}>
          New member
        </button>
        <form>
          <label htmlFor="All Patients">
            <select onChange={handleSelect}>
              <option className="App-info" value="1">
                All Patients
              </option>
              {patientData.map((patient) => (
                <option key={patient.id} value={patient.key}>
                  {patient.patient}
                </option>
              ))}
            </select>
          </label>
        </form>
        <button className="App-info" onClick={Logout}>
          {cookie} <b> /Logout</b>
        </button>
      </nav>

      <div className="patient">
        {patientToDisplay.map((patient) => (
          <Sidebar key = {patient.id} collapsed={menuCollapse}>
            <div className="logotext">
              {/* small and big change using menucollapse state */}
              <p>{menuCollapse ? "Logo" : patient.patient}</p>
            </div>
            <div className="closemenu" onClick={menuIconClick}>
              {/* changing menu collapse icon on click */}
              {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
            </div>

            <Menu iconShape="square">
              <MenuItem active={true} icon={<FiHome />}>
                Home
              </MenuItem>
              <MenuItem icon={<FaList />}>Category</MenuItem>
              <MenuItem icon={<FaRegHeart />}>Favourite</MenuItem>
              <MenuItem icon={<RiPencilLine />}>Author</MenuItem>
              <MenuItem icon={<BiCog />}>Settings</MenuItem>
            </Menu>

            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
            </Menu>
          </Sidebar>
        ))}
      </div>

      {patientToDisplay ? (
        <div className="dashboard">
          {patientToDisplay.map((patient) => (
            <div>
              <div key={patient.id} className="patient">
                <h4>Patient:{patient.patient} </h4>
                <h4>Age:{patient.age} </h4>
              </div>

              <div className="patient">
                <h4>Health status: {patient.status} </h4>
              </div>

              <div className="patient">
                <h4>Health goals: {patient.goals} </h4>
              </div>

              <div className="patient">
                <h4>Active conditions: </h4>
                <li>
                  <ul key={1}>{patient.condition}</ul>
                  <ul key={2}> {patient.condition1}</ul>
                  <ul> {patient.condition2}</ul>
                  <ul> {patient.condition3}</ul>
                  <ul> {patient.condition4}</ul>
                </li>
                <button>
                  <Link to="/conditions">Add</Link>
                </button>
              </div>

              <div className="patient">
                <h4>Active interventions: </h4>
                <li>
                  <ol>{patient.intervention}</ol>
                  <ol>{patient.intervention1}</ol>
                  <ol>{patient.intervention2}</ol>
                  <ol>{patient.intervention3}</ol>
                  <ol>{patient.intervention4}</ol>
                </li>
                <button>
                  <Link to="/interventions">Add</Link>
                </button>
              </div>
            </div>
          ))}
          <div>
            <div className="patient">
              <h4>BP monitoring </h4>

              <table>
                <tr>
                  <th>date </th>
                  <th>Blood pressure</th>
                </tr>
                {bpDisplay.map((bps) => (
                  <tr key={bps.id}>
                    <td>{bps.dueDate.slice(0, 17)}</td>
                    <td>{bps.pressure}</td>
                  </tr>
                ))}
              </table>

              <br />
              <button>
                <Link to="/blood">Add</Link>
              </button>
            </div>

            <div className="patient">
              <h4>Clinical apointments: </h4>

              <table>
                <tr>
                  <th>date </th>
                  <th>Hospital</th>
                </tr>
                {clinicDisplay.map((cln) => (
                  <tr key={cln.id}>
                    <td>{cln.dueDate.slice(0, 17)}</td>
                    <td>{cln.clinic}</td>
                  </tr>
                ))}
              </table>

              <br />

              <button>
                <Link to="/clinic">Add</Link>
              </button>
            </div>
            <div className="patient">
              <h4>Prescriptions: </h4>

              <table>
                <tr>
                  <th>date </th>
                  <th>Prescription</th>
                </tr>
                {prescDisplay.map((presc) => (
                  <tr>
                    <td>{presc.dueDate.slice(0, 17)}</td>
                    <td>{presc.prescription}</td>
                  </tr>
                ))}
              </table>

              <br />

              <button>
                <Link to="/prescription">Add</Link>
              </button>
            </div>
            <div className="patient">
              <h4>Interaction log: </h4>

              <table>
                <tr>
                  <th>date </th>
                  <th>Message</th>
                </tr>
                {intDisplay.map((int) => (
                  <tr>
                    <td>{int.dueDate}</td>
                    <td>{int.interaction}</td>
                  </tr>
                ))}
              </table>

              <br />

              <button>
                <Link to="/interaction">Add</Link>
              </button>
            </div>
          </div>
          <div>
            {patientToDisplay.map((patient) => (
              <b key={patient.id} style={{ textAlign: "center" }}>
                Tasks to do for {patient.patient}
              </b>
            ))}
            <table>
              <tr>
                <th>Task</th>

                <th>due</th>

                <th>status</th>
              </tr>
              {patientTasksDisplay.map((patient) => (
                <>
                  {patient ? (
                    <tr>
                      <td>{patient.task}</td>

                      <td>{patient.dueDate.slice(0, 17)}</td>

                      <td>
                        <input
                          type="checkbox"
                          id={patient.id}
                          name="done"
                          value={patient.id}
                          checked={selectedIds.includes(patient.id)}
                          onChange={handleOnChange}
                        />
                      </td>
                    </tr>
                  ) : (
                    " "
                  )}
                </>
              ))}

              <br />
              <button>
                <Link to="/task">New</Link>
              </button>
            </table>
          </div>
        </div>
      ) : (
        " "
      )}
    </div>
  );
};

export default Dashboard;
