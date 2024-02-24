import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { get, push, ref, update } from "firebase/database";
import { database, auth } from "./Firebase";
import carecall from "./carecall.png";
import { useNavigate } from "react-router-dom";
import { FileId } from "./services/firebaseapi";
import EditClinicals from "./Forms/EditClinicals";
import { Line } from "react-chartjs-2";
import PatientData from "./dashboardData/PatientData";
//ffjjn,vtdyygkvv
import { onAuthStateChanged } from "firebase/auth";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from "chart.js";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale
);
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
  const [state, setState] = useState("");

  const cookie = Cookies.get("name");
  const navigate = useNavigate();

  const dbRef2 = ref(database, "tasks");
  const dbRef4 = ref(database, "Clinic");
  const dbRef6 = ref(database, "Prescription");

  //Sort by date
  const dateSort = (x) => {
    x.sort(function (a, b) {
      if (a.dueDate !== undefined && b.dueDate !== undefined) {
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

  //Line chart data

  const datasi = {
    labels: bmiDisplay.map((b) => b.dueDate.slice(0, 17)),
    datasets: [
      {
        label: "BM1",
        data: bmiDisplay.map((b) =>
          (parseInt(b.weight) / parseInt(b.height ^ 2)).toFixed(0)
        ),
        //data: [33, 53, 85, 41, 44, 65],
        fill: true,
        backgroundColor: "black",
        borderColor: "PURPLE",
        borderWidth: 3,
      },
    ],
  };

  const datasi1 = {
    labels: bpDisplay.map((b) => b.dueDate.slice(0, 17)),
    datasets: [
      {
        label: "BP high",
        data: bpDisplay.map((b) => b.pressure.split("/")[0]),
        //data: [33, 53, 85, 41, 44, 65],
        fill: true,
        backgroundColor: "black",
        borderColor: "rgba(75,192,192,1)",
      },

      {
        label: "BP low",
        data: bpDisplay.map((b) => b.pressure.split("/")[1]),
        fill: true,
        backgroundColor: "black",
        borderColor: "purple",
      },
    ],
  };

  const datasi2 = {
    labels: sugarDisplay.map((b) => b.dueDate.slice(0, 17)),
    datasets: [
      {
        label: "BS fasting",
        data: sugarDisplay.map((b) => b.fasting),
        fill: true,
        backgroundColor: "black",
        borderColor: "rgba(75,192,192,1)",
      },

      {
        label: "BS random",
        data: sugarDisplay.map((b) => b.random),
        fill: true,
        backgroundColor: "black",
        borderColor: "purple",
      },

      {
        label: "BS random",
        data: sugarDisplay.map((b) => b.HBA1C),
        fill: true,
        backgroundColor: "Yellow",
        borderColor: "blue",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        min: 0,
        responsive: true,
        maintainAspectRatio: false,

        // grid: {
        //   display: false,
        // },
      },

      x: {
        // min: 0,
        // responsive: true,
        // maintainAspectRatio: false,
        // grid: {
        //   display: false,
        // },
      },
    },
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

    //Read the whole database
    get(ref(database))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setState(snapshot.val());

          //clients data
          const dataArray = Object.entries(snapshot.child("clients").val()).map(
            ([id, data]) => ({
              id,
              ...data,
            })
          );

          setPatientData(dataArray);
          setPatientToDisplay([dataArray[dataArray.length - 1]]);

          //tasks data
          var taskArray = Object.entries(snapshot.child("tasks").val()).map(
            ([id, data]) => ({
              id,
              ...data,
            })
          );

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

          //BP data
          const bpArray = Object.entries(
            snapshot.child("bloodPressure").val()
          ).map(([id, data]) => ({
            id,
            ...data,
          }));
          //Sort by date
          dateSort(bpArray);

          setBp(bpArray);
          setBpDisplay([bpArray[bpArray.length - 1]]);

          //Clinical data
          var clinicArray = Object.entries(snapshot.child("Clinic").val()).map(
            ([id, data]) => ({
              id,
              ...data,
            })
          );
          //Sort by date
          dateSort(clinicArray);

          //Move Inactive to the bottom
          const Inactive = clinicArray.filter(
            (item) => item.status === "Inactive"
          );
          const Active = clinicArray.filter((item) => item.status === "Active");

          clinicArray = Active.concat(Inactive);
          setClinic(clinicArray);
          setClinicDisplay([clinicArray[clinicArray.length - 1]]);

          //Interaction data
          const intArray = Object.entries(
            snapshot.child("Interaction").val()
          ).map(([id, data]) => ({
            id,
            ...data,
          }));
          //Sort by date
          dateSort(intArray);

          setInteraction(intArray);
          setIntDisplay([intArray[intArray.length - 1]]);

          //Prescription data
          var prescArray = Object.entries(
            snapshot.child("Prescription").val()
          ).map(([id, data]) => ({
            id,
            ...data,
          }));
          //Sort by date
          dateSort(prescArray);

          //Move complete to the bottom
          const complete = prescArray.filter(
            (item) => item.status === "Complete"
          );
          const ongoing = prescArray.filter(
            (item) => item.status === "Ongoing"
          );

          prescArray = ongoing.concat(complete);
          setPrescription(prescArray);
          setPrescDisplay([prescArray[prescArray.length - 1]]);

          //File data
          const fileArray = Object.entries(snapshot.child("Files").val()).map(
            ([id, data]) => ({
              id,
              ...data,
            })
          );
          //Sort by date
          dateSort(fileArray);

          setFile(fileArray);
          setFileDispaly([fileArray[fileArray.length - 1]]);

          //BMI data
          const bmiArray = Object.entries(snapshot.child("Bmi").val()).map(
            ([id, data]) => ({
              id,
              ...data,
            })
          );
          //Sort by date
          dateSort(bmiArray);

          setBmi(bmiArray);
          setBmiDispaly([bmiArray[bmiArray.length - 1]]);

          //Blood sugar data
          const sugarArray = Object.entries(
            snapshot.child("BloodSugar").val()
          ).map(([id, data]) => ({
            id,
            ...data,
          }));
          //Sort by date
          dateSort(sugarArray);

          setSugar(sugarArray);
          setSugarDispaly([sugarArray[sugarArray.length - 1]]);

          //Health status data
          const statusArray = Object.entries(snapshot.child("HealthStatus").val()).map(
            ([id, data]) => ({
              id,
              ...data,
            }));

          setHealthS(statusArray);
          setHealthSDisplay([statusArray[statusArray.length - 1]]);
          
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

  //Handle clicks on search results
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
    console.log(healthArray);
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


  const handleStatus1 = (e) => {
    print(e.target.value);
    
    setStatus(e.target.value);

    //Update tasks progress
    const updates = {};
    updates[e.target.id + "/status"] = e.target.value;
    update(dbRef4, updates);
  };

  //Update prescription status
  const handleStatus2 = (e) => {
    setStatus(e.target.value);

    //Update tasks progress
    const updates = {};
    updates[e.target.id + "/status"] = e.target.value;
    update(dbRef6, updates);
  };

  const EditClinic = (e) => {
    //const eph = clinicDisplay.find((name) => name.id === e.target.id);
    //setClnc(eph);

    Cookies.set("editC", e.target.id);

    navigate("/editclinical");
  };

  const allTasks = () => {
    navigate("/alltasks");
  };
  //Add new patient to the database and redirect to new page to add more details.

  const New = () => {
    navigate("/new");
  };

  //Show more rows
  const addMoreRows = () => {
    setVisibleRows(visibleRows + 5);
  };

  //return jsx
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
          <PatientData
            patientToDisplay={patientToDisplay}
            healthSDisplay={healthSDisplay}
          />

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
                <th>Status</th>
              </tr>
              {clinicDisplay.slice(0, visibleRows).map((cln) => (
                <tr key={cln.id}>
                  <td>{cln.dueDate.slice(0, 17)}</td>
                  <td>{cln.clinic}</td>
                  {cln.diagnosis.length > 0 ? (
                    <td>{cln.diagnosis}</td>
                  ) : (
                    <td>
                      {" "}
                      <button id={cln.id} onClick={EditClinic}>
                        edit
                      </button>{" "}
                    </td>
                  )}
                  <td>
                    <form>
                      <label htmlFor="status">
                        <select onChange={handleStatus1} id={cln.id}>
                          <option className="App-info" value="progress">
                            {cln.status ? cln.status : "Active"}
                          </option>
                          <option className="App-info" value="Active">
                            Active
                          </option>
                          <option className="App-info" value="Inactive">
                            Inactive
                          </option>
                        </select>
                      </label>
                    </form>
                  </td>
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
                <th>Status</th>
              </tr>
              {prescDisplay.slice(0, visibleRows).map((presc) => (
                <tr>
                  <td>{presc.dueDate.slice(0, 17)}</td>
                  <td>{presc.prescription}</td>
                  <td>{presc.daysTaken}</td>
                  <td>
                    <form>
                      <label htmlFor="status">
                        <select onChange={handleStatus2} id={presc.id}>
                          <option className="App-info" value="progress">
                            {presc.status ? presc.status : "Ongoing"}
                          </option>
                          <option className="App-info" value="Ongoing">
                            Ongoing
                          </option>
                          <option className="App-info" value="Complete">
                            Complete
                          </option>
                        </select>
                      </label>
                    </form>
                  </td>
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

            <h4>Files </h4>

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

            {bmiDisplay.length > 1 ? (
              <>
                <h4>BMI</h4>
                <div>
                  <Line
                    data={datasi}
                    options={options}
                    style={{ maxWidth: "100%" }}
                  />
                </div>
              </>
            ) : (
              ""
            )}

            {bpDisplay.length > 1 ? (
              <>
                <h4>Blood pressure</h4>
                <div>
                  <Line
                    data={datasi1}
                    options={options}
                    style={{ maxWidth: "100%" }}
                  />
                </div>
              </>
            ) : (
              ""
            )}

            {sugarDisplay.length > 1 ? (
              <>
                <h4>Blood sugar</h4>

                <div>
                  <Line
                    data={datasi2}
                    options={options}
                    style={{ maxWidth: "100%" }}
                  />
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        " "
      )}
      {/* < EditClinicals data = {state.data} /> */}
    </div>
  );
};

export default Dashboard;
