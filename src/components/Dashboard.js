import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { get, ref, update } from "firebase/database";
import { database, auth } from "./Firebase";
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
import { onAuthStateChanged } from "firebase/auth";

const Dashboard = () => {
  const [patientData, setPatientData] = useState([]);
  const [search, setSearch] = useState("");
  const [optionValue, setOptionValue] = useState("");
  const [patientToDisplay, setPatientToDisplay] = useState([]);
  const [patientTasks, setPatientTasks] = useState([]);
  const [patientTasksDisplay, setPatientTasksDisplay] = useState([]);
  const [bp, setBp] = useState([]);
  const [bpDisplay, setBpDisplay] = useState([]);
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
  const [sugar, setSugar] = useState([]);
  const [sugarDisplay, setSugarDispaly] = useState([]);
  const [status, setStatus] = useState("");
  const [user, setUser] = useState(null);
  const [assignee, setAssignee] = useState("");
  const progress = ['Not started','Inprogress','Incomplete','complete'];

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
  const dbRef9 = ref(database, "Bloodsugar");

  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false);

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  //Sort by date
  const dateSort = (x) => {
    x.sort(function(a, b) {
      var awords = a.dueDate.slice(5, 17).split(" ");
      var bwords = b.dueDate.slice(5, 17).split(" ");

      var aNewdate = awords[0] + "/" + awords[1] + "/" + awords[2];
      var bNewdate = bwords[0] + "/" + bwords[1] + "/" + bwords[2];

      var strToDatea = new Date(aNewdate);
      var strToDateb = new Date(bNewdate);

      return strToDatea - strToDateb;
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const email = user.email;

        setUser(email);
      }
    });

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

          //Sort by date
          dateSort(taskArray);

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
          //Sort by date
          dateSort(bpArray);

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
          //Sort by date
          dateSort(clinicArray);

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
          //Sort by date
          dateSort(intArray);

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
          //Sort by date
          dateSort(prescArray);

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
          //Sort by date
          dateSort(fileArray);

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
          //Sort by date
          dateSort(bmiArray);

          setBmi(bmiArray);
          setBmiDispaly([bmiArray[bmiArray.length - 1]]);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    //read blood sugar
    get(dbRef9)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const sugarArray = Object.entries(snapshot.val()).map(
            ([id, data]) => ({
              id,
              ...data,
            })
          );
          //Sort by date
          dateSort(sugarArray);

          setSugar(sugarArray);
          setSugarDispaly([sugarArray[sugarArray.length - 1]]);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

  // const handleOnChange = (e) => {
  //   console.log(e.target.value);
  //   const checkedId = e.target.value;
  //   const updates = {};

  //   if (e.target.checked) {
  //     setSelectedIds([...selectedIds, checkedId]);

  //     updates[checkedId + "/completed"] = true;

  //     update(dbRef2, updates);
  //   } else {
  //     setSelectedIds(selectedIds.filter((id) => id !== checkedId));

  //     updates[checkedId + "/completed"] = false;

  //     update(dbRef2, updates);
  //   }
  // };

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
    let sugarArray = sugar.filter((name) => name.patient === patient.id);

    const dataArray = [obj];

    setPatientToDisplay(dataArray);
    setAssignee(dataArray[0].hc);
    setPatientTasksDisplay(taskArray);

    setBpDisplay(Bps);
    setClinicDisplay(clncArray);
    setIntDisplay(intArray);
    setPrescDisplay(prescArray);
    setFileDispaly(fileArray);
    setBmiDispaly(bmiArray);
    setSugarDispaly(sugarArray);

    Cookies.set("patient", patient.id);
    Cookies.set("userName", patient.patient);

    // //calculate age
    const bornyr = dataArray[0].age.slice(12, 17);
    const yr = new Date().getFullYear();
    setAge(yr - bornyr);
  };

  const handleStatus = (e) => {
    setStatus(e.target.value);
    console.log(e.target.id);

    //Update tasks progress
    const updates = {};
    updates[e.target.id + "/completed"] = e.target.value;
    update(dbRef2, updates);

  };

  const allTasks = () => {
    navigate("/alltasks");
  };
  const Logout = () => {
    //remove all cookies first
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

        <button className="App-info" onClick={New}>
          New member
        </button>

        <button className="App-info" onClick={allTasks}>
          All tasks
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
                  <div style={{textAlign:"center"}} key={patient.id}>
                    <p key={1}>{patient.intervention}</p>
                    <p key={2}>{patient.intervention1}</p>
                    <p key={3}>{patient.intervention2}</p>
                    <p key={4}>{patient.intervention3}</p>
                    <p key={5}>{patient.intervention4}</p>
                  </div>
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

            <h4> Blood sugar </h4>

            <table className="customers">
              <tr>
                <th>date </th>
                <th>Fasting</th>
                <th>Random</th>
                <th>HBA1C</th>
              </tr>
              {sugarDisplay.map((sug) => (
                <tr key={sug.id}>
                  {parseFloat(sug.fasting) > 10 ||
                  parseFloat(sug.fasting) < 4 ||
                  parseFloat(sug.random) < 4 ||
                  parseFloat(sug.random) > 10 ||
                  parseFloat(sug.HBA1C) > 5.7 ? (
                    <>
                      <td>{sug.dueDate.slice(0, 17)}</td>
                      <td style={{ color: "red" }}>{sug.fasting}</td>
                      <td style={{ color: "red" }}>{sug.random}</td>
                      <td style={{ color: "red" }}>{sug.HBA1C}</td>
                    </>
                  ) : (
                    <>
                      <td>{sug.dueDate.slice(0, 17)}</td>
                      <td>{sug.fasting}</td>
                      <td>{sug.random}</td>
                      <td>{sug.HBA1C}</td>
                    </>
                  )}
                </tr>
              ))}
            </table>
            <button>
              <Link className="link" to="/sugar">
                Add
              </Link>
            </button>
            <br />

            <h4>Clinical appointments </h4>

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

                <th>Assignee</th>

                <th>status</th>
              </tr>
              {patientTasksDisplay.map((patient) => (
                <>
                  {patient ? (
                    <tr>
                      <td>{patient.task}</td>

                      <td>{patient.dueDate.slice(0, 17)}</td>

                      <td>{assignee.slice(0, 7) + "..."}</td>
                      <td>
                        <form>
                          <label htmlFor="status">
                            <select onChange={handleStatus} id={patient.id} >
                            <option className="App-info" value="progress">
                                {patient.completed}
                              </option>                        
                              <option className="App-info" value={progress[0]}>
                                Not started
                              </option>
                              <option className="App-info" value={progress[1]}>
                                Inprogress
                              </option>
                              <option className="App-info" value={progress[2]}>
                                Incomplete
                              </option>
                              <option className="App-info" value={progress[3]}>
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
              <button>
                <Link className="link" to="/task">
                  New
                </Link>
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
