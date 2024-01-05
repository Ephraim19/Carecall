import React, { useEffect, useState } from "react";
import { database, storage } from "../Firebase";
import { ref, push, get, update, set } from "firebase/database";
import carecall from "../carecall.png";
import DatePicker from "react-datepicker";
import {
  ref as sRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const ExternalForm = () => {

  const [patient, setPatient] = useState("");
  const [Phone, setPhone] = useState(0);
  const [gender, setGender] = useState("");
  const [condition, setCondition] = useState("");
  const [condition1, setCondition1] = useState("");
  const [condition2, setCondition2] = useState("");
  const [condition3, setCondition3] = useState("");
  const [condition4, setCondition4] = useState("");
  const [file, setFile] = useState([]);
  const [file1, setFile1] = useState([]);
  const [file2, setFile2] = useState([]);

  const [percent, setPercent] = useState(0);
  const [Save, setSave] = useState("Save");
  const [duration, setDuration] = useState("");
  const [hospital, setHospital] = useState("");


  const [dueDates, setDueDates] = useState(new Date());
  const [hc, setHc] = useState();

  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [medication, setMedication] = useState("");
  const [blood, setBlood] = useState("");

  const dbRef = ref(database, "HealthCordinator");

  const dateStrip = (numOfHours, date) => {
    const dateCopy = new Date(date.getTime());
    dateCopy.setTime(dateCopy.getTime() + numOfHours * 60 * 60 * 1000);
    const stringDate = JSON.stringify(dateCopy.toUTCString().toString()).slice(
      1,
      -5
    );
    return stringDate;
  };

  const assignedHN = () => {
    let dataArray;
    get(dbRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          dataArray = Object.entries(snapshot.val()).map(([id, data]) => ({
            id,
            ...data,
          }));

          const valuesArray = dataArray.map((obj) => obj.tasks);

          const min = valuesArray.reduce((a, b) => Math.min(a, b));
          const HealthCord = dataArray.find((name) => name.tasks === min);
          setHc(HealthCord);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return dataArray;
  };

  useEffect(() => {
    assignedHN();
  }, []);

  const Push = (event) => {
    event.preventDefault();
    if (patient && Phone) {
      //push data to firebase client
      setSave("saving...");
      push(ref(database, "clients"), {
        patient,
        age: dateStrip(3, dueDates),
        blood,
        Phone,
        medication,
        condition,
        condition1,
        condition2,
        condition3,
        condition4,
        hospital,
        gender,
        hc: hc.user,
      }).then((data) => {
        var strToDate = new Date();

        //Push to prescription
        if (medication) {
          push(ref(database, "Prescription"), {
            patient: data.key,
            prescription: medication,
            daysTaken: duration,
            dueDate: dateStrip(3, strToDate),
          }).then(() => {
            //Create a task

            var strToDate1 = new Date();
    
            strToDate1.setDate(strToDate1.getDate() + parseInt(duration));

            push(ref(database, "tasks"), {
              patient: data.key,
              task:
                patient +
                " has finished " +
                medication +
                " on " +
                dateStrip(3, strToDate1).slice(0, 17),
              dueDate: dateStrip(3, strToDate1),
              completed: "Not started",
            });
          });
        }

        //push to bp
        if (blood) {
          push(ref(database, "bloodPressure"), {
            patient: data.key,
            pressure: blood,
            dueDate: dateStrip(3, strToDate),
          }).then(() => {
            //Create a task if bp is high or low
            if (blood.split("/")[0] > 120 || blood.split("/")[1] > 80) {
              push(ref(database, "tasks"), {
                patient: data.key,
                task:
                  patient +
                  " had a high blood pressure on " +
                  dateStrip(3, strToDate).slice(0, 17),
                dueDate: dateStrip(3, new Date()),
                completed: "Not started",
              });
            } else if (
              blood.split("/")[1] < 60 ||
              blood.split("/")[0] < 60
            ) {
              push(ref(database, "tasks"), {
                patient: data.key,
                task:
                  patient +
                  " had a low blood pressure on " +
                  dateStrip(3, strToDate).slice(0, 17),
                dueDate: dateStrip(3, new Date()),
                completed: "Not started",
              });
            }
          });
        }

        //Push weight & height
        if (weight && height) {
          push(ref(database, "Bmi"), {
            patient: data.key,
            weight,
            height,
            dueDate: dateStrip(3, strToDate),
          }).then(()=>{
                    //Create a task if user has abnormal BMI

        if (parseInt(weight) / parseInt(height ^ 2) < 18.5) {
            push(ref(database, "tasks"), {
              patient: data.key,
              task:
                patient +
                " is under weight on " +
                dateStrip(3, strToDate).slice(0, 17),
              dueDate: dateStrip(3, new Date()),
              completed: "Not started",
            });
          } else if (parseInt(weight) / parseInt(height ^ 2) > 25) {
            push(ref(database, "tasks"), {
              patient: data.key,
              task:
                patient +
                " is over weight on " +
                dateStrip(3, strToDate).slice(0, 17),
              dueDate: dateStrip(3, new Date()),
              completed: "Not started",
            });
          }

          })
        }

        //Upload document if available
        if (!file) {
          console.log("fail");
        } else {
          const storageRef = sRef(storage, `/files/${file.name}`);
          console.log("success");
          // progress can be paused and resumed. It also exposes progress updates.
          // Receives the storage reference and the file to upload.
          var allUploads = [];
          const uploadTask = uploadBytesResumable(storageRef, file);
          const uploadTask1 = uploadBytesResumable(storageRef, file1);
          const uploadTask2 = uploadBytesResumable(storageRef, file2);

          allUploads.push(uploadTask);
          allUploads.push(uploadTask1);
          allUploads.push(uploadTask2);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const percent = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );

              // update progress
              setPercent(percent);
            },
            (err) => console.log(err),
            () => {
              // download url
              getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                push(ref(database, "Files"), {
                  patient: data.key,
                  description: "Lab results",
                  url,
                  dueDate: dateStrip(3, strToDate),
                }).then((data) => {
                  setSave("saved");
                  setBlood("");
                  setCondition("");
                  setCondition1("");
                  setCondition2("");
                  setCondition3("");
                  setCondition4("");
                  setFile("");
                  setGender("");
                  setHeight("");
                  setMedication(" ");
                  setPatient("");
                  setPhone("");
                  setWeight("");
                  console.log(data);
                });
              });
            }
          );
        }

        //Add a welcoming task
        strToDate.setDate(strToDate.getDate() + 1);
        push(ref(database, "tasks"), {
          patient: data.key,
          task: "Call " + patient + " for welcoming",
          dueDate: dateStrip(3, strToDate),
          completed: "Not started",
        });

        //Add +1 tasks to HC
        const updates = {};
        updates[hc.id + "/tasks"] = parseInt(hc.tasks) + 1;
        update(dbRef, updates);

        if (!file){
        setSave("Saved")

        setBlood("");
        setCondition("");
        setCondition1("");
        setCondition2("");
        setCondition3("");
        setCondition4("");
        setFile("");
        setGender("");
        setHeight("");
        setMedication(" ");
        setPatient("");
        setPhone("");
        setHospital("");
        setWeight("");
        }
      });
    }
  };

  const handleSelect = (e) => {
    setGender(e.target.value);
    console.log(e.target.value);
  };

  // Handle file upload event and update state
  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  function handleChange2(event) {
    setFile1(event.target.files[0]);
  }

  function handleChange3(event) {
    setFile2(event.target.files[0]);
  }

  return (
    <div>
      <nav className="App-nav">
        <img src={carecall} alt="logo" className="App-logo" />
        <form className="App-info"></form>
      </nav>
      <div>
        <h3 style={{ color: "purple", fontSize: "23px", marginLeft: "10%" }}>
          Member Registaration Form
        </h3>
        <form className="newForm">
        <label>
            <b>Hospital name</b> <br />
            <input
              type="text"
              value={hospital}
              onChange={(e) => setHospital(e.target.value)}
            />
          </label>
          <br />
          <br />

          <label>
            <b>Enter the patient's full name:</b> <br />
            <input
              type="text"
              value={patient}
              onChange={(e) => setPatient(e.target.value)}
            />
          </label>
          <br />
          <br />
          <b>Date of birth</b>
          <br />
          <DatePicker
            selected={dueDates}
            onChange={(date) => setDueDates(date)}
          />
          <br />
          <br />
          <b>Gender</b> <br />
          <label htmlFor="Gender">
            <select onChange={handleSelect}>
              <option className="App-info" value="MF" key={"MF"}>
                Select Gender
              </option>
              <option className="App-info" value="M" key={"M"}>
                Male
              </option>
              <option className="App-info" value="F" key={"F"}>
                Female
              </option>
            </select>
          </label>
          <br />
          <br />
          <label>
            <b>Phone number:</b> <br />
            <input
              type="number"
              value={Phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>
          <br />
          <br />
          <b>Diagnosis</b> <br />
          <br />
          <label>
            Diagnosis 1: <br />
            <input
              type="text"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            />
          </label>
          <br />
          <label>
            Diagnosis 2: <br />
            <input
              type="text"
              value={condition1}
              onChange={(e) => setCondition1(e.target.value)}
            />
          </label>
          <br />
          <label>
            Diagnosis 3: <br />
            <input
              type="text"
              value={condition2}
              onChange={(e) => setCondition2(e.target.value)}
            />
          </label>
          <br />
          <label>
            Diagnosis 4: <br />
            <input
              type="text"
              value={condition3}
              onChange={(e) => setCondition3(e.target.value)}
            />
          </label>
          <br />
          <label>
            Diagnosis 5: <br />
            <input
              type="text"
              value={condition4}
              onChange={(e) => setCondition4(e.target.value)}
            />
          </label>
          <br />
          <br />
          <label>
            <b>Medication (Include dosage, frequency and duration)</b> <br />
            <input
              type="text"
              value={medication}
              onChange={(e) => setMedication(e.target.value)}
            />
          </label>
          <br />
          <br />
          <label>
            <b>Medication duration</b> <br />
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </label>
          <br />
          <br />
          <label>
            <b>Blood pressure:</b> <br />
            <input
              type="text"
              value={blood}
              onChange={(e) => setBlood(e.target.value)}
            />
          </label>
          <br />
          <br />
          <label>
            <b>Height(meters)</b> <br />
            <input
              type="text"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </label>
          <br />
          <br />
          <label>
            <b>Weight(kgs)</b> <br />
            <input
              type="text"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </label>
          <br />
          <br />
          <b>Lab results1 (file)</b>
          <br />
          <input type="file" onChange={handleChange} accept="media_type" />{" "}
          <br />
          <b>Lab results2 (file)</b>
          <br />
          <input type="file" onChange={handleChange2} accept="media_type" />{" "}
          <br />
          <b>Lab results3 (file)</b>
          <br />
          <input type="file" onChange={handleChange3} accept="media_type" />{" "}
          <br />

          <p>Progress: {percent}</p>
          <br />
          <button onClick={Push}>{Save}</button>
        </form>
      </div>
    </div>
  );
};

export default ExternalForm;
