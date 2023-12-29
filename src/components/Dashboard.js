import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { push, get, ref, update } from "firebase/database";
import { database } from "./Firebase";
import carecall from "./carecall.png";
import { useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import {
  FaCartPlus,
  FaMale,
  FaPhone,
  FaPlusSquare,
  FaUserGraduate,
} from "react-icons/fa";
import {
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle,
  FiCalendar,
} from "react-icons/fi";
//ffjjn,vtdyygkvv
import { RiAlarmWarningLine } from "react-icons/ri";
import { BiAlarmExclamation } from "react-icons/bi";

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
  const [age, setAge] = useState("");
  const [searched, setSearched] = useState([]);
  const [file, setFile] = useState([]);
  const [fileDisplay, setFileDispaly] = useState([]);
  const [bmi, setBmi] = useState([]);
  const [bmiDisplay, setBmiDispaly] = useState([]);

  const cookie = Cookies.get("name");
  const navigate = useNavigate();

  const dbRef = ref(database, "clients");
  const dbRef2 = ref(database, "tasks");
  const dbRef3 = ref(database, "bloodPressure");
  const dbRef4 = ref(database, "Clinic");
  const dbRef5 = ref(database, "Interaction");
  const dbRef6 = ref(database, "Prescription");
  const dbRef7 = ref(database, "Files");
  const dbRef8 = ref(database, "Bmi");

  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false);

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  const dateStrip = (numOfHours, date) => {
    const dateCopy = new Date(date.getTime());
    dateCopy.setTime(dateCopy.getTime() + numOfHours * 60 * 60 * 1000);
    const stringDate = JSON.stringify(dateCopy.toUTCString().toString()).slice(
      1,
      -5
    );
    return stringDate;
  };

  useEffect(() => {
    let dataArray = [];
    //read user
    get(dbRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          dataArray = Object.entries(snapshot.val()).map(([id, data]) => ({
            id,
            ...data,
          }));
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
          var taskArray = Object.entries(snapshot.val()).map(([id, data]) => ({
            id,
            ...data,
          }));
          //sort according to date

          //var allDates = prescArray[i].dueDate.slice(5, 17);
          //   var words = tody.split(" ");
          //   var newdate = words[0] + "/" + words[1] + "/" + words[2];
          //   var strToDate = new Date(newdate);

          //   strToDate.setDate(
          //     strToDate.getDate() + parseInt(prescArray[i].daysTaken)
          //   );

          taskArray.sort(function(a, b) {
            var awords = a.dueDate.slice(5, 17).split(" ");
            var bwords = b.dueDate.slice(5, 17).split(" ");

            var aNewdate = awords[0] + "/" + awords[1] + "/" + awords[2];
            var bNewdate = bwords[0] + "/" + bwords[1] + "/" + bwords[2];

            var strToDatea = new Date(aNewdate);
            var strToDateb = new Date(bNewdate);

            return strToDatea - strToDateb;
          });

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

    //read files
    get(dbRef7)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const fileArray = Object.entries(snapshot.val()).map(
            ([id, data]) => ({
              id,
              ...data,
            })
          );

          setFile(fileArray);
          setFileDispaly([fileArray[fileArray.length - 1]]);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    //read BMI
    get(dbRef8)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const bmiArray = Object.entries(snapshot.val()).map(([id, data]) => ({
            id,
            ...data,
          }));

          setBmi(bmiArray);
          setBmiDispaly([bmiArray[bmiArray.length - 1]]);
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
    let fileArray = file.filter((name) => name.patient === obj.id);
    let bmiArray = bmi.filter((name) => name.patient === obj.id);

    const dataArray = [obj];

    setPatientToDisplay(dataArray);
    setPatientTasksDisplay(taskArray);
    setBpDisplay(Bps);
    setClinicDisplay(clncArray);
    setIntDisplay(intArray);
    setPrescDisplay(prescArray);
    setFileDispaly(fileArray);
    setBmiDispaly(bmiArray);

    Cookies.set("patient", obj.id);
    Cookies.set("userName", obj.patient);

    //calculate age
    const bornyr = dataArray[0].age.slice(12, 17);
    const yr = new Date().getFullYear();
    setAge(yr - bornyr);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);

    if (search.length > 1) {
      var searches = patientData.filter((name) =>
        name.patient.toLowerCase().includes(e.target.value.toLowerCase())
      );

      setSearched(searches);
    } else {
      setSearched([]);
    }
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

  const handleResultClick = (patient) => {
    setSearch(patient.patient);
    setSearched([]);

    let obj = patientData.find((name) => name.id === patient.id);
    let taskArray = patientTasks.filter((name) => name.patient === patient.id);
    let Bps = bp.filter((name) => name.patient === patient.id);
    let clncArray = clinic.filter((name) => name.patient === patient.id);
    let intArray = interaction.filter((name) => name.patient === patient.id);
    let prescArray = prescription.filter((name) => name.patient === patient.id);
    let fileArray = file.filter((name) => name.patient === patient.id);
    let bmiArray = bmi.filter((name) => name.patient === patient.id);

    const dataArray = [obj];

    setPatientToDisplay(dataArray);
    setPatientTasksDisplay(taskArray);
    setBpDisplay(Bps);
    setClinicDisplay(clncArray);
    setIntDisplay(intArray);
    setPrescDisplay(prescArray);
    setFileDispaly(fileArray);
    setBmiDispaly(bmiArray);
    console.log(bmiArray);

    Cookies.set("patient", patient.id);
    Cookies.set("userName", patient.patient);

    // //calculate age
    const bornyr = dataArray[0].age.slice(12, 17);
    const yr = new Date().getFullYear();
    setAge(yr - bornyr);
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
        <div>
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

          {searched ? (
            <ul className="searchable">
              {searched.map((patient) => (
                <div
                  key={patient.id}
                  onClick={() => handleResultClick(patient)}
                >
                  {patient.patient}
                </div>
              ))}
            </ul>
          ) : (
            " "
          )}
        </div>
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

        <button className="App-info" onClick={New}>
          New member
        </button>
      </nav>

      {patientToDisplay ? (
        <div className="dashboard">
          {patientToDisplay.map((patient) => (
            <Sidebar key={patient.id} collapsed={menuCollapse}>
              <div className="logotext">
                {/* small and big change using menucollapse state */}
                <h3 style={{ color: "purple", fontSize: "23px" }}>
                  {menuCollapse
                    ? patient.patient.split(" ")[0]
                    : patient.patient}{" "}
                  ({age})-({patient.gender})
                </h3>
              </div>
              <div className="closemenu" onClick={menuIconClick}>
                {/* changing menu collapse icon on click */}
                {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
              </div>

              <Menu iconShape="square" className="menuItems">
                <MenuItem active={true} icon={<FiCalendar />}>
                  DOB: {patient.age.slice(4, 17)}
                </MenuItem>
                <MenuItem icon={<FaMale />}>
                  Gender:<b>{patient.gender}</b>
                </MenuItem>
                <MenuItem icon={<FaPhone />}>
                  Phone:<b>{patient.Phone}</b>
                </MenuItem>
                <MenuItem icon={<FaPlusSquare />}>
                  Status:<b>{patient.status}</b>
                </MenuItem>
                <MenuItem icon={<FaCartPlus />}>
                  Goals: <b>{patient.goals}</b>
                </MenuItem>
                <MenuItem icon={<RiAlarmWarningLine />}>
                  <b>Active conditions</b>
                  <li key={patient.id}>
                    <ul key={1}>{patient.condition}</ul>
                    <ul key={2}> {patient.condition1}</ul>
                    <ul key={3}> {patient.condition2}</ul>
                    <ul key={4}> {patient.condition3}</ul>
                    <ul key={5}> {patient.condition4}</ul>
                  </li>
                </MenuItem>
                <MenuItem icon={<BiAlarmExclamation />}>
                  <b>Active Interventions</b>
                  <li key={patient.id}>
                    <ol key={1}>{patient.intervention}</ol>
                    <ol key={2}>{patient.intervention1}</ol>
                    <ol key={3}>{patient.intervention2}</ol>
                    <ol key={4}>{patient.intervention3}</ol>
                    <ol key={5}>{patient.intervention4}</ol>
                  </li>
                </MenuItem>
                <MenuItem icon={<FaUserGraduate />}>{cookie}</MenuItem>
              </Menu>

              <Menu iconShape="square">
                <MenuItem icon={<FiLogOut />}>
                  {" "}
                  <button className="App-info" onClick={Logout}>
                    <b>Logout</b>
                  </button>
                </MenuItem>
              </Menu>
            </Sidebar>
          ))}

          <div>
            <h4>Interaction log: </h4>

            <table className="customers">
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

              <button>
                <Link className="link" to="/interaction">
                  Add
                </Link>
              </button>
            </table>

            <br />

            <h4>BP monitoring </h4>

            <table className="customers">
              <tr>
                <th>date </th>
                <th>Blood pressure</th>
              </tr>

              {bpDisplay.map((bps) => (
                <tr key={bps.id}>
                  {bps.pressure.split("/")[0] > 120 ||
                  bps.pressure.split("/")[0] < 60 ||
                  bps.pressure.split("/")[1] < 60 ||
                  bps.pressure.split("/")[1] > 80 ? (
                    <>
                      <td>{bps.dueDate.slice(0, 17)}</td>
                      <td style={{ color: "red" }}>{bps.pressure}</td>
                    </>
                  ) : (
                    <>
                      <td>{bps.dueDate.slice(0, 17)}</td>
                      <td>{bps.pressure}</td>
                    </>
                  )}
                </tr>
              ))}

              <button>
                <Link className="link" to="/blood">
                  Add
                </Link>
              </button>
            </table>

            <br />

            <h4>Weight & Height </h4>

            <table className="customers">
              <tr>
                <th>date </th>
                <th>weight</th>
                <th>Height</th>
                <th>BMI</th>
              </tr>
              {bmiDisplay.map((b) => (
                <tr key={b.id}>
                  {parseInt(b.weight) / parseInt(b.height ^ 2) < 18.5 ||
                  parseInt(b.weight) / parseInt(b.height ^ 2) > 25 ? (
                    <>
                      <td>{b.dueDate.slice(0, 17)}</td>
                      <td>{b.weight}</td>
                      <td>{b.height}</td>
                      <td style={{ color: "red" }}>
                        {(parseInt(b.weight) / parseInt(b.height ^ 2)).toFixed(
                          2
                        )}
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{b.dueDate.slice(0, 17)}</td>
                      <td>{b.weight}</td>
                      <td>{b.height}</td>
                      <td>
                        {(parseInt(b.weight) / parseInt(b.height ^ 2)).toFixed(
                          2
                        )}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </table>
            <button>
              <Link className="link" to="/bmi">
                Add
              </Link>
            </button>
            <br />

            <h4>Clinical appointments: </h4>

            <table className="customers">
              <tr>
                <th>date </th>
                <th>Hospital</th>
                <th>Diagnosis</th>
              </tr>
              {clinicDisplay.map((cln) => (
                <tr key={cln.id}>
                  <td>{cln.dueDate.slice(0, 17)}</td>
                  <td>{cln.clinic}</td>
                  <td>{cln.diagnosis}</td>
                </tr>
              ))}
            </table>
            <button>
              <Link className="link" to="/clinic">
                Add
              </Link>
            </button>
            <br />

            <h4>Prescriptions: </h4>

            <table className="customers">
              <tr>
                <th>date </th>
                <th>Prescription</th>
                <th>Days</th>
              </tr>
              {prescDisplay.map((presc) => (
                <tr>
                  <td>{presc.dueDate.slice(0, 17)}</td>
                  <td>{presc.prescription}</td>
                  <td>{presc.daysTaken}</td>
                </tr>
              ))}
            </table>
            <button>
              <Link to="/prescription">Add</Link>
            </button>

            <br />
            <br />

            <h4>Files: </h4>

            <table className="customers">
              <tr>
                <th>Description </th>
                <th>Date</th>
                <th>File</th>
              </tr>
              {fileDisplay.map((f) => (
                <tr>
                  <td>{f.description}</td>
                  <td>{f.dueDate.slice(0, 17)}</td>
                  <td>
                    {" "}
                    <a href={f.url}>file</a>
                  </td>
                </tr>
              ))}
            </table>
            <button>
              <Link className="link" to="/file">
                Add
              </Link>
            </button>

            <br />
          </div>
          <div>
            {patientToDisplay.map((patient) => (
              <h4 key={patient.id} style={{ textAlign: "center" }}>
                Tasks to do for {patient.patient}
              </h4>
            ))}
            <table className="customers">
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
                <Link className="link" to="/task">
                  New
                </Link>
              </button>
            </table>

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
