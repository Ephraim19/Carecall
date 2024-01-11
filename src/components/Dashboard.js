import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { get, push, ref, update } from "firebase/database";
import { database, auth } from "./Firebase";
import carecall from "./carecall.png";
import { useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { FileId } from "./services/firebaseapi";

import {
  FaBomb,
  FaCartPlus,
  FaHome,
  FaImages,
  FaMale,
  FaPhone,
  FaPlusSquare,
  FaRegAddressBook,
  FaSmile,
  FaUserGraduate,
} from "react-icons/fa";
import {
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle,
  FiCalendar,
  FiAlertCircle,
  FiAlertTriangle,
  FiActivity,
  FiEdit,
} from "react-icons/fi";
//ffjjn,vtdyygkvv
import { RiAlarmWarningLine } from "react-icons/ri";
import { BiAlarmExclamation } from "react-icons/bi";
import { onAuthStateChanged } from "firebase/auth";

const Dashboard = () => {
  const [patientData, setPatientData] = useState([]);
  const [search, setSearch] = useState("");
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
  const progress = ["Not started", "Inprogress", "cancelled", "complete"];
  const [visibleRows, setVisibleRows] = useState(5);
  const [healthS, setHealthS] = useState([]);
  const [healthSDisplay, setHealthSDisplay] = useState([]);

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
  const dbRef10 = ref(database, "HealthStatus");

  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false);

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  //Sort by date
  const dateSort = (x) => {
    x.sort(function (a, b) {
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
    if (!Cookies.get("name")) {
      navigate("/");
    }

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
          //setPatientToDisplay([dataArray[dataArray.length - 1]]);
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

          //Sort by date & status
          const completetaskArray = taskArray.filter(
            (name) => name.completed === "complete"
          );

          const cancelledtaskArray = taskArray.filter(
            (name) => name.completed === "cancelled"
          );

          const IncompletetaskArray = taskArray
            .filter((name) => name.completed !== "complete")
            .filter((name) => name.completed !== "cancelled");

          dateSort(IncompletetaskArray);

          const a1 = cancelledtaskArray.concat(completetaskArray);
          const allTasksInorder = IncompletetaskArray.concat(a1);

          setPatientTasks(allTasksInorder);
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

    //read health status
    get(dbRef10)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const statusArray = Object.entries(snapshot.val()).map(
            ([id, data]) => ({
              id,
              ...data,
            })
          );

          setHealthS(statusArray);
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
    let healthArray = healthS.filter((name) => name.patient === patient.id);

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
    setHealthSDisplay(healthArray);

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
    Cookies.remove("user");
    Cookies.remove("userName");
    Cookies.remove("patient");
    navigate("/");
  };

  const New = () => {
    navigate("/new");
  };

  const Edit = () => {
    navigate("/edit");
  };

  const EditStatus = () => {
    navigate("/edit/status");
  };

  const addMoreRows = () => {
    setVisibleRows(visibleRows + 5);
  };

  return (
    <div>
      <nav style={{ position: "fixed" }} className="App-nav">
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
                  {patient.patient} - ({patient.gender})
                </div>
              ))}
            </ul>
          ) : (
            " "
          )}
        </div>

        {patientToDisplay.length > 0 && (
          <div>
            {patientToDisplay.map((patient) => (
              <h3 style={{ color: "purple", fontSize: "23px" }}>
                {patient.patient} ({age})-({patient.gender})
              </h3>
            ))}
          </div>
        )}

        <button className="App-info" onClick={New}>
          New member
        </button>

        <button className="App-info" onClick={allTasks}>
          All tasks
        </button>
      </nav>

      {patientToDisplay ? (
        <div className="dashboard">
          <Sidebar
            collapsed={menuCollapse}
            style={{ marginTop: "7%", marginLeft: "0" }}
          >
            <div className="logotext">
              {/* small and big change using menucollapse state */}
              {healthSDisplay.length === 0 ? (
                <h3 style={{ color: "purple", fontSize: "23px" }}>
                  {menuCollapse ? (
                    " "
                  ) : (
                    <button>
                      <Link className="link" to="/forms/status">
                        Health Status
                      </Link>
                    </button>
                  )}
                </h3>
              ) : (
                ""
              )}
            </div>
            <div className="closemenu" onClick={menuIconClick}>
              {/* changing menu collapse icon on click */}
              {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
            </div>
            {patientToDisplay.map((patient) => (
              <div key={patient.key}>
                <Menu iconShape="square" className="menuItems">
                  <MenuItem active={true} icon={<FaMale />}>
                    Name: {patient.patient}
                  </MenuItem>
                  <MenuItem active={true} icon={<FiCalendar />}>
                    DOB: {patient.age.slice(4, 17)}
                  </MenuItem>
                  <MenuItem icon={<FaMale />}>
                    Gender:<b>{patient.gender}</b>
                  </MenuItem>
                  <MenuItem icon={<FaPhone />}>
                    Phone:<b>{patient.Phone}</b>
                  </MenuItem>
                  <MenuItem icon={<FaHome />}>
                    Home:<b>{patient.Address}</b>
                  </MenuItem>
                  <MenuItem icon={<FaRegAddressBook />}>
                    Office:<b>{patient.Address1}</b>
                  </MenuItem>
                  <MenuItem icon={<FaPlusSquare />}>
                    Status:<b>{patient.status}</b>
                  </MenuItem>
                  <MenuItem icon={<FaCartPlus />}>
                    Goals: <b>{patient.goals}</b>
                  </MenuItem>
                  <MenuItem icon={<FaCartPlus />}>
                    Hospital: <b>{patient.hospital}</b>
                  </MenuItem>
                  <MenuItem icon={<RiAlarmWarningLine />}>
                    Diagnosis: {patient.condition}
                  </MenuItem>
                </Menu>
              </div>
            ))}

            <Menu iconShape="square">
              <MenuItem icon={<FiEdit />}>
                <button className="App-info" onClick={Edit}>
                  <b>Edit</b>
                </button>
              </MenuItem>
            </Menu>

            {healthSDisplay.map((hs) => (
              <div key={hs.key}>
                <Menu iconShape="square" className="menuItems">
                  <MenuItem icon={<FiActivity />}>
                    <u>Current conditions</u>
                  </MenuItem>
                  <MenuItem>
                    {hs.cConditions.map((c) => (
                      <ul>
                        <li>{c.condition}</li>
                      </ul>
                    ))}
                  </MenuItem>
                  <MenuItem icon={<FaImages />}>
                    <u>Family conditions</u>
                  </MenuItem>

                  <MenuItem>
                    {hs.FConditions.map((c) => (
                      <ul>
                        <li>{c.condition}</li>
                      </ul>
                    ))}
                  </MenuItem>

                  <MenuItem icon={<FiAlertCircle />}>
                    Drugs:<b>{hs.drugUse[0].condition}</b>
                  </MenuItem>
                  <MenuItem icon={<FaSmile />}>
                    Improve:<b>{hs.improve}</b>
                  </MenuItem>
                  <MenuItem icon={<FaBomb />}>
                    activities:<b>{hs.activity[0].condition}</b>
                  </MenuItem>
                  <MenuItem icon={<FaSmile />}>
                    Sleep:<b>{hs.sleep} Hrs</b>
                  </MenuItem>
                </Menu>
              </div>
            ))}

            <Menu iconShape="square">
              {healthSDisplay.length > 0 && (
                <MenuItem icon={<FiEdit />}>
                  <button className="App-info" onClick={EditStatus}>
                    <b>Edit</b>
                  </button>
                </MenuItem>
              )}

              <MenuItem icon={<FaUserGraduate />}>{cookie}</MenuItem>

              <MenuItem icon={<FiLogOut />}>
                <button className="App-info" onClick={Logout}>
                  <b>Logout</b>
                </button>
              </MenuItem>
            </Menu>
          </Sidebar>

          <div style={{ marginTop: "6%" }}>
            <h4>Interaction log: </h4>

            <table className="customers">
              <tr>
                <th>Date </th>
                <th>Conversation </th>
              </tr>
              {intDisplay.slice(0, visibleRows).map((int) => (
                <tr>
                  <td>{int.dueDate}</td>
                  <td>
                    {int.interaction} ({int.Hc})
                  </td>
                </tr>
              ))}
              {visibleRows < intDisplay.length && (
                <button
                  style={{ alignItems: "left" }}
                  className="App-info"
                  onClick={addMoreRows}
                >
                  <b>More..</b>
                </button>
              )}

              <br />
              <br />

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
                <th>Date </th>
                <th>Blood pressure</th>
              </tr>

              {bpDisplay.slice(0, visibleRows).map((bps) => (
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

              {visibleRows < bpDisplay.length && (
                <button
                  style={{ alignItems: "left" }}
                  className="App-info"
                  onClick={addMoreRows}
                >
                  <b>More..</b>
                </button>
              )}

              <br />
              <br />
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
                <th>Date </th>
                <th>Weight</th>
                <th>Height</th>
                <th>BMI</th>
              </tr>
              {bmiDisplay.slice(0, visibleRows).map((b) => (
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

            {visibleRows < bmiDisplay.length && (
              <button
                style={{ alignItems: "left" }}
                className="App-info"
                onClick={addMoreRows}
              >
                <b>More..</b>
              </button>
            )}

            <br />
            <br />

            <button>
              <Link className="link" to="/bmi">
                Add
              </Link>
            </button>
            <br />

            <h4> Blood sugar </h4>

            <table className="customers">
              <tr>
                <th>Date </th>
                <th>Fasting</th>
                <th>Random</th>
                <th>HBA1C</th>
              </tr>
              {sugarDisplay.slice(0, visibleRows).map((sug) => (
                <tr key={sug.id}>
                  {/* {parseFloat(sug.random) < 10 &&
                    parseFloat(sug.random) > 4 &&
                    parseFloat(sug.HBA1C) > 5.7 &&
                    parseFloat(sug.fasting) < 10 &&
                    parseFloat(sug.fasting) >
                      4( */}
                  <>
                    <td>{sug.dueDate.slice(0, 17)}</td>

                    {parseFloat(sug.fasting) < 10 &&
                    parseFloat(sug.fasting) > 4 ? (
                      <td>{sug.fasting}</td>
                    ) : (
                      <td style={{ color: "red" }}>
                        <td>{sug.fasting}</td>
                      </td>
                    )}

                    {parseFloat(sug.random) < 10 &&
                    parseFloat(sug.random) > 4 ? (
                      <td>{sug.random}</td>
                    ) : (
                      <td style={{ color: "red" }}>
                        <td>{sug.random}</td>
                      </td>
                    )}

                    {parseFloat(sug.HBA1C) < 5.7 ? (
                      <td>{sug.HBA1C}</td>
                    ) : (
                      <td style={{ color: "red" }}>
                        <td>{sug.HBA1C}</td>
                      </td>
                    )}
                  </>
                </tr>
              ))}
            </table>
            {visibleRows < sugarDisplay.length && (
              <button
                style={{ alignItems: "left" }}
                className="App-info"
                onClick={addMoreRows}
              >
                <b>More..</b>
              </button>
            )}

            <br />
            <br />

            <button>
              <Link className="link" to="/sugar">
                Add
              </Link>
            </button>
            <br />

            <h4>Clinical appointments </h4>

            <table className="customers">
              <tr>
                <th>Date </th>
                <th>Hospital</th>
                <th>Diagnosis</th>
              </tr>
              {clinicDisplay.slice(0, visibleRows).map((cln) => (
                <tr key={cln.id}>
                  <td>{cln.dueDate.slice(0, 17)}</td>
                  <td>{cln.clinic}</td>
                  <td>{cln.diagnosis}</td>
                </tr>
              ))}
            </table>

            {visibleRows < clinicDisplay.length && (
              <button
                style={{ alignItems: "left" }}
                className="App-info"
                onClick={addMoreRows}
              >
                <b>More..</b>
              </button>
            )}

            <br />
            <br />
            <button>
              <Link className="link" to="/clinic">
                Add
              </Link>
            </button>
            <br />

            <h4>Prescriptions: </h4>

            <table className="customers">
              <tr>
                <th>Date </th>
                <th>Prescription</th>
                <th>Days</th>
              </tr>
              {prescDisplay.slice(0, visibleRows).map((presc) => (
                <tr>
                  <td>{presc.dueDate.slice(0, 17)}</td>
                  <td>{presc.prescription}</td>
                  <td>{presc.daysTaken}</td>
                </tr>
              ))}
            </table>
            {visibleRows < prescDisplay.length && (
              <button
                style={{ alignItems: "left" }}
                className="App-info"
                onClick={addMoreRows}
              >
                <b>More..</b>
              </button>
            )}

            <br />
            <br />

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
              {fileDisplay.slice(0, visibleRows).map((f) => (
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
            {visibleRows < fileDisplay.length && (
              <button
                style={{ alignItems: "left" }}
                className="App-info"
                onClick={addMoreRows}
              >
                <b>More..</b>
              </button>
            )}

            <br />
            <br />

            <button>
              <Link className="link" to="/file">
                Add
              </Link>
            </button>

            <br />
          </div>
          <div style={{ marginTop: "6%" }}>
            {patientToDisplay.map((patient) => (
              <h4 key={patient.id} style={{ textAlign: "center" }}>
                Tasks to do for {patient.patient}
              </h4>
            ))}
            <table className="customers">
              <tr>
                <th>Task</th>

                <th>Due</th>

                <th>Assignee</th>

                <th>Status</th>
              </tr>
              {patientTasksDisplay.slice(0, visibleRows).map((patient) => (
                <>
                  {patient ? (
                    <tr>
                      <td>{patient.task}</td>

                      <td>{patient.dueDate.slice(0, 17)}</td>

                      <td>{assignee.slice(0, 7) + "..."}</td>
                      <td>
                        <form>
                          <label htmlFor="status">
                            <select onChange={handleStatus} id={patient.id}>
                              <option className="App-info" value={progress[0]}>
                                {patient.completed
                                  ? patient.completed
                                  : "Not started"}
                              </option>
                              <option className="App-info" value={progress[1]}>
                                Inprogress
                              </option>
                              <option className="App-info" value={progress[2]}>
                                Cancelled
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
              {visibleRows < patientTasksDisplay.length && (
                <button
                  style={{ alignItems: "left" }}
                  className="App-info"
                  onClick={addMoreRows}
                >
                  <b>More..</b>
                </button>
              )}
              <br />

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
