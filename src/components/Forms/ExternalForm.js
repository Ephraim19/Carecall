import React, { useEffect, useState } from "react";
import { database, storage } from "../Firebase";
import { ref, push, get, update, set } from "firebase/database";
import carecall from "../carecall.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  ref as sRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useNavigate } from "react-router-dom";

const ExternalForm = () => {
  const [patient, setPatient] = useState("");
  const [Phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [condition, setCondition] = useState("");
  const [file, setFile] = useState("");
  const [file1, setFile1] = useState("");
  const [file2, setFile2] = useState("");
  const [note, setNote] = useState("");

  const [percent, setPercent] = useState(0);
  const [Save, setSave] = useState("Save");
  const [duration, setDuration] = useState("");
  const [duration1, setDuration1] = useState("");
  const [duration2, setDuration2] = useState("");
  const [duration3, setDuration3] = useState("");
  const [duration4, setDuration4] = useState("");

  const [hospital, setHospital] = useState("");

  const [dueDates, setDueDates] = useState("");
  const [hc, setHc] = useState();

  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [medication, setMedication] = useState("");
  const [medication2, setMedication2] = useState("");
  const [medication3, setMedication3] = useState("");
  const [medication4, setMedication4] = useState("");
  const [medication5, setMedication5] = useState("");

  const [patientData, setPatientData] = useState([]);

  const [blood, setBlood] = useState("");
  const [phoneErr, setPhoneErr] = useState("");

  const dbRef = ref(database, "HealthCordinator");
  const dbRef1 = ref(database, "clients");

  const navigate = useNavigate();

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

    //read user
    get(dbRef1)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const dataArray = Object.entries(snapshot.val()).map(
            ([id, data]) => ({
              id,
              ...data,
            })
          );
          setPatientData(dataArray);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const Push = (event) => {
    event.preventDefault();

    if (!hospital) {
      toast.error("Please input hospital name");
      return;
    }
    if (!patient) {
      toast.error("Please input member's name");
      return;
    }

    if (!Phone) {
      toast.error("Please input member's phone number");
      return;
    }
    const membr = patientData.find((name) => name.Phone === Phone.toString());

    if (patient && Phone && membr) {
      //push data to firebase client
      setSave("saving...");

      var strToDate = new Date();

      //Push to prescription
      if (medication) {
        push(ref(database, "Prescription"), {
          patient: membr.id,
          prescription: medication,
          prescription1: medication2,
          prescription2: medication3,
          prescription3: medication4,
          prescription4: medication5,

          daysTaken: duration,
          daysTaken2: duration2,
          daysTaken1: duration1,
          daysTaken3: duration3,
          daysTaken4: duration4,

          dueDate: dateStrip(3, strToDate),
        }).then(() => {
          //Create a task for prescription

          var strToDate1 = new Date();

          strToDate1.setDate(strToDate1.getDate() + parseInt(duration));

          push(ref(database, "tasks"), {
            patient: membr.id,
            task:
              "Member has finished " +
              medication +
              " on " +
              dateStrip(3, strToDate1).slice(0, 17),
            dueDate: dateStrip(3, strToDate1),
            completed: "Not started",
          });

          var strToDate2 = new Date();
          strToDate2.setDate(strToDate2.getDate() + parseInt(duration1));
          if (medication2) {
            push(ref(database, "tasks"), {
              patient: membr.id,
              task:
                "Member has finished " +
                medication2 +
                " on " +
                dateStrip(3, strToDate2).slice(0, 17),
              dueDate: dateStrip(3, strToDate2),
              completed: "Not started",
            });
          }

          var strToDate3 = new Date();
          strToDate3.setDate(strToDate3.getDate() + parseInt(duration2));

          if (medication3) {
            push(ref(database, "tasks"), {
              patient: membr.id,
              task:
                "Member has finished " +
                medication3 +
                " on " +
                dateStrip(3, strToDate3).slice(0, 17),
              dueDate: dateStrip(3, strToDate3),
              completed: "Not started",
            });
          }

          var strToDate4 = new Date();
          strToDate4.setDate(strToDate4.getDate() + parseInt(duration3));
          if (medication4) {
            push(ref(database, "tasks"), {
              patient: membr.id,
              task:
                "Member has finished " +
                medication4 +
                " on " +
                dateStrip(3, strToDate4).slice(0, 17),
              dueDate: dateStrip(3, strToDate4),
              completed: "Not started",
            });
          }

          var strToDate5 = new Date();
          strToDate5.setDate(strToDate5.getDate() + parseInt(duration4));
          if (medication5) {
            push(ref(database, "tasks"), {
              patient: membr.id,
              task:
                "Member has finished " +
                medication5 +
                " on " +
                dateStrip(3, strToDate5).slice(0, 17),
              dueDate: dateStrip(3, strToDate5),
              completed: "Not started",
            });
          }
        });
      }
      //Push to clinical
      if (hospital && condition) {
        push(ref(database, "Clinic"), {
          patient: membr.id,
          dueDate: dateStrip(3, strToDate),
          clinic: hospital,
          diagnosis: condition,
        }).then(() => {
          //Create a task for appointment followup
          var strToDatey = new Date();
          strToDatey.setDate(strToDatey.getDate() + 1);

          push(ref(database, "tasks"), {
            patient: membr.id,
            task: "Follow up on member about " + hospital + " appointment ",
            dueDate: dateStrip(3, strToDatey),
            completed: "Not started",
          });
        });
      }

      //push to bp
      if (blood) {
        push(ref(database, "bloodPressure"), {
          patient: membr.id,
          pressure: blood,
          dueDate: dateStrip(3, strToDate),
        }).then(() => {
          //Create a task if bp is high or low
          if (blood.split("/")[0] > 120 || blood.split("/")[1] > 80) {
            push(ref(database, "tasks"), {
              patient: membr.id,
              task:
                " Member had a high blood pressure on " +
                dateStrip(3, strToDate).slice(0, 17),
              dueDate: dateStrip(3, new Date()),
              completed: "Not started",
            });
          } else if (blood.split("/")[1] < 60 || blood.split("/")[0] < 60) {
            push(ref(database, "tasks"), {
              patient: membr.id,
              task:
                " Member had a low blood pressure on " +
                dateStrip(3, strToDate).slice(0, 17),
              dueDate: dateStrip(3, new Date()),
              completed: "Not started",
            });
          }
        });
      }
      //push note interaction
      if (note) {
        push(ref(database, "Interaction"), {
          hc: hospital,
          interaction: note,
          dueDate: dateStrip(3, strToDate),
          patient: membr.id,
        });
      }
      //Push weight & height
      if (weight && height) {
        push(ref(database, "Bmi"), {
          patient: membr.id,
          weight,
          height,
          dueDate: dateStrip(3, strToDate),
        }).then(() => {
          //Create a task if user has abnormal BMI

          if (parseInt(weight) / parseInt(height ^ 2) < 18.5) {
            push(ref(database, "tasks"), {
              patient: membr.id,
              task:
                " Member is under weight on " +
                dateStrip(3, strToDate).slice(0, 17),
              dueDate: dateStrip(3, new Date()),
              completed: "Not started",
            });
          } else if (parseInt(weight) / parseInt(height ^ 2) > 25) {
            push(ref(database, "tasks"), {
              patient: membr.id,
              task:
                " Member is over weight on " +
                dateStrip(3, strToDate).slice(0, 17),
              dueDate: dateStrip(3, new Date()),
              completed: "Not started",
            });
          }
        });
      }
      //Upload document if available
      const storageRef = sRef(storage, `/files/${file.name}`);

      if (!file) {
        console.log("fail");
      } else {
        console.log("success");
        // progress can be paused and resumed. It also exposes progress updates.
        // Receives the storage reference and the file to upload.
        const uploadTask = uploadBytesResumable(storageRef, file);

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
            strToDate = new Date();
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              push(ref(database, "Files"), {
                patient: membr.id,
                description: "Lab results",
                url,
                dueDate: dateStrip(3, strToDate),
              }).then((data) => {
                setSave("saved");
                setBlood("");
                setCondition("");
                setGender("");
                setHeight("");
                setMedication(" ");
                setMedication2(" ");
                setMedication3(" ");

                setPatient("");
                setPhone("");
                setWeight("");
                setDuration("");

                navigate("/new/added");
              });
            });
          }
        );

        if (file1) {
          const uploadTask1 = uploadBytesResumable(storageRef, file1);
          uploadTask1.on(
            "state_changed",
            (snapshot) => {
              const percent = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
            },
            (err) => console.log(err),
            () => {
              // download url1
              getDownloadURL(uploadTask1.snapshot.ref).then((url) => {
                push(ref(database, "Files"), {
                  patient: membr.id,
                  description: "Lab results1",
                  url,
                  dueDate: dateStrip(3, strToDate),
                }).then((data) => {
                  console.log(data);
                });
              });
            }
          );
        }

        if (file2) {
          const uploadTask2 = uploadBytesResumable(storageRef, file2);

          uploadTask2.on(
            "state_changed",
            (snapshot) => {
              const percent = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
            },
            (err) => console.log(err),
            () => {
              // download url1
              getDownloadURL(uploadTask2.snapshot.ref).then((url) => {
                push(ref(database, "Files"), {
                  patient: membr.id,
                  description: "Lab results1",
                  url,
                  dueDate: dateStrip(3, strToDate),
                }).then((data) => {
                  console.log(data);
                });
              });
            }
          );
        }
      }

      if (!file) {
        setSave("Saved");

        setBlood("");

        setCondition("");
        setGender("");
        setHeight("");
        setMedication(" ");
        setMedication2(" ");
        setMedication3(" ");

        setPatient("");
        setPhone("");
        setHospital("");
        setWeight("");
        navigate("new/added");
      }
      //});
    }

    if (patient && Phone && !membr) {
      //push data to firebase client
      setSave("saving...");
      push(ref(database, "clients"), {
        patient,
        gender,
        age: dueDates,
        blood,
        Phone,
        medication,
        medication2,
        medication3,
        medication4,
        medication5,
        condition,
        hospital,
        gender,
        joinDate: new Date().toDateString(),
        //hc: hc.user,
        Address1: "",
        Address: "",
        condition: "",
        condition1: "",
        condition2: "",
        condition3: "",
        condition4: "",

        intervention: "",
        intervention1: "",
        intervention2: "",
        intervention3: "",
        intervention4: "",

        goals: "",
      }).then((data) => {
        var strToDate = new Date();

        //push to clinicals
        if (hospital && condition) {
          push(ref(database, "Clinic"), {
            patient: data.key,
            dueDate: dateStrip(3, strToDate),
            clinic: hospital,
            diagnosis: condition,
          }).then(() => {
            //Create a task for appointment followup
            var strToDatey = new Date();
            strToDatey.setDate(strToDatey.getDate() + 1);

            push(ref(database, "tasks"), {
              patient: data.key,
              task: "Follow up on member about " + hospital + " appointment ",
              dueDate: dateStrip(3, strToDatey),
              completed: "Not started",
            });
          });
        }

        //Push to prescription
        if (medication) {
          push(ref(database, "Prescription"), {
            patient: data.key,
            prescription: medication,
            prescription1: medication2,
            prescription2: medication3,
            prescription3: medication3,
            prescription4: medication4,
            daysTaken: duration,
            daysTaken2: duration2,
            daysTaken1: duration1,
            daysTaken3: duration3,
            daysTaken4: duration4,
            dueDate: dateStrip(3, strToDate),
          }).then(() => {
            //Create a task for prescription

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

            var strToDate2 = new Date();
            strToDate2.setDate(strToDate2.getDate() + parseInt(duration1));
            if (medication2) {
              push(ref(database, "tasks"), {
                patient: data.key,
                task:
                  patient +
                  " has finished " +
                  medication2 +
                  " on " +
                  dateStrip(3, strToDate2).slice(0, 17),
                dueDate: dateStrip(3, strToDate2),
                completed: "Not started",
              });
            }

            var strToDate3 = new Date();
            strToDate3.setDate(strToDate3.getDate() + parseInt(duration2));

            if (medication3) {
              push(ref(database, "tasks"), {
                patient: data.key,
                task:
                  patient +
                  " has finished " +
                  medication3 +
                  " on " +
                  dateStrip(3, strToDate3).slice(0, 17),
                dueDate: dateStrip(3, strToDate3),
                completed: "Not started",
              });
            }

            if (medication4) {
              push(ref(database, "tasks"), {
                patient: data.key,
                task:
                  patient +
                  " has finished " +
                  medication4 +
                  " on " +
                  dateStrip(3, strToDate3).slice(0, 17),
                dueDate: dateStrip(3, strToDate3),
                completed: "Not started",
              });
            }

            if (medication5) {
              push(ref(database, "tasks"), {
                patient: data.key,
                task:
                  patient +
                  " has finished " +
                  medication5 +
                  " on " +
                  dateStrip(3, strToDate3).slice(0, 17),
                dueDate: dateStrip(3, strToDate3),
                completed: "Not started",
              });
            }
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
            } else if (blood.split("/")[1] < 60 || blood.split("/")[0] < 60) {
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
          }).then(() => {
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
          });
        }
        //Upload document if available
        const storageRef = sRef(storage, `/files/${file.name}`);

        if (!file) {
          console.log("fail");
        } else {
          console.log("success");
          // progress can be paused and resumed. It also exposes progress updates.
          // Receives the storage reference and the file to upload.
          const uploadTask = uploadBytesResumable(storageRef, file);

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
              strToDate = new Date();
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
                  setGender("");
                  setHeight("");
                  setMedication(" ");
                  setMedication2(" ");
                  setMedication3(" ");

                  setPatient("");
                  setPhone("");
                  setWeight("");
                  setDuration("");

                  navigate("/new/added");
                });
              });
            }
          );

          if (file1) {
            const uploadTask1 = uploadBytesResumable(storageRef, file1);
            uploadTask1.on(
              "state_changed",
              (snapshot) => {
                const percent = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
              },
              (err) => console.log(err),
              () => {
                // download url1
                getDownloadURL(uploadTask1.snapshot.ref).then((url) => {
                  push(ref(database, "Files"), {
                    patient: data.key,
                    description: "Lab results1",
                    url,
                    dueDate: dateStrip(3, strToDate),
                  }).then((data) => {
                    console.log(data);
                  });
                });
              }
            );
          }

          if (file2) {
            const uploadTask2 = uploadBytesResumable(storageRef, file2);

            uploadTask2.on(
              "state_changed",
              (snapshot) => {
                const percent = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
              },
              (err) => console.log(err),
              () => {
                // download url1
                getDownloadURL(uploadTask2.snapshot.ref).then((url) => {
                  push(ref(database, "Files"), {
                    patient: data.key,
                    description: "Lab results1",
                    url,
                    dueDate: dateStrip(3, strToDate),
                  }).then((data) => {
                    console.log(data);
                  });
                });
              }
            );
          }
        }

        //Add a welcoming task
        strToDate.setDate(strToDate.getDate() + 1);
        push(ref(database, "tasks"), {
          patient: data.key,
          task:
            "Call " + patient + " for welcoming and fill health status form ",
          dueDate: dateStrip(3, strToDate),
          completed: "Not started",
        });

        //Add 30 day check status task
        var today = new Date();
        today.setDate(today.getDate() + 30);

        strToDate.setDate(strToDate.getDate() + 1);
        push(ref(database, "tasks"), {
          patient: data.key,
          task: "Update " + patient + " health status ",
          dueDate: dateStrip(3, today),
          completed: "Not started",
        });

        //Add +1 tasks to HC
        const updates = {};
        // updates[hc.id + "/tasks"] = parseInt(hc.tasks) + 1;
        update(dbRef, updates);

        if (!file) {
          setSave("Saved");

          setBlood("");
          setCondition("");
          setGender("");
          setHeight("");
          setMedication(" ");
          setMedication2(" ");
          setMedication3(" ");

          setPatient("");
          setPhone("");
          setHospital("");
          setWeight("");
          navigate("/new/added");
        }
      });
    }
  };

  const handleSelect = (e) => {
    setGender(e.target.value);
    console.log(e.target.value);
  };

  const handleHospital = (e) => {
    setHospital(e.target.value);
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

  //handlephone change
  const phoneNo = (e) => {
    setPhone(e.target.value);
    if (e.target.value.length > 0 && e.target.value.length < 10) {
      setPhoneErr("Phone number should be 10 digits");
    } else if (e.target.value.length === 10) {
      setPhoneErr(" ");
    } else {
      setPhoneErr("Please input a valid phone number");
    }
  };

  return (
    <div>
      <nav className="App-nav">
        <img
          // style={{ display: "block", margin: "0 auto" }}
          src={carecall}
          alt="logo"
          className="App-logo"
        />
        <h3 style={{ color: "purple", fontSize: "23px", textAlign: "center" }}>
          Member Registration Portal
        </h3>
      </nav>

      <div className="dashboard">
        <form>
          <h4
            style={{ color: "purple", fontSize: "23px", textAlign: "center" }}
          >
            Member Information
          </h4>
          {/* <label>
            <b>Hospital name*</b> <br />
            <input
              type="text"
              value={hospital}
              onChange={(e) => setHospital(e.target.value)}
            />
          </label> */}
          <b>Hospital name*</b> <br />
          <label htmlFor="Gender">
            <select onChange={handleHospital}>
              <option className="App-info" value="HS" key={"HS"}>
                Select Hospital
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
          <br />
          <br />
          <label>
            <b>Member's full name*</b> <br />
            <input
              type="text"
              value={patient}
              onChange={(e) => setPatient(e.target.value)}
            />
          </label>
          <br />
          <br />
          <label>
            <b>Age</b> <br />
            <input
              type="number"
              value={dueDates}
              onChange={(e) => setDueDates(e.target.value)}
            />
          </label>
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
            <b>Phone number*</b> <br />
            <input
              type="text"
              value={Phone}
              onChange={phoneNo}
              // onChange={(e) => setPhone(e.target.value)}
            />
          </label>
          <br />
          <b style={{ color: "red" }}>{phoneErr}</b>
          <br />
          <br />
        </form>

        <form>
          <h4
            style={{ color: "purple", fontSize: "23px", textAlign: "center" }}
          >
            Diagnosis and Medication
          </h4>
          <br />
          <label>
            Diagnosis (Separate diagnosis with a comma) <br />
            <input
              type="text"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            />
          </label>
          <br />
          <br />
          <label>
            <b>Medication-1 </b> <br />
            <input
              placeholder="Include dosage and frequency)"
              type="text"
              value={medication}
              onChange={(e) => setMedication(e.target.value)}
            />
          </label>
          <br />
          <label>
            <b>Medication duration(in days)</b> <br />
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </label>
          <br />
          <br />
          <label>
            <b>Medication-2 </b> <br />
            <input
              placeholder="Include dosage and frequency)"
              type="text"
              value={medication2}
              onChange={(e) => setMedication2(e.target.value)}
            />
          </label>
          <br />
          <label>
            <b>Medication duration(in days)</b> <br />
            <input
              type="text"
              value={duration1}
              onChange={(e) => setDuration1(e.target.value)}
            />
          </label>
          <br />
          <br />
          <label>
            <b>Medication-3 </b> <br />
            <input
              placeholder="Include dosage and frequency)"
              type="text"
              value={medication3}
              onChange={(e) => setMedication3(e.target.value)}
            />
          </label>
          <br />
          <label>
            <b>Medication duration(in days)</b> <br />
            <input
              type="text"
              value={duration2}
              onChange={(e) => setDuration2(e.target.value)}
            />
          </label>
          <br />
          <br />

          <label>
            <b>Medication-4 </b> <br />
            <input
              placeholder="Include dosage and frequency)"
              type="text"
              value={medication4}
              onChange={(e) => setMedication4(e.target.value)}
            />
          </label>
          <br />
          <label>
            <b>Medication duration(in days)</b> <br />
            <input
              type="text"
              value={duration3}
              onChange={(e) => setDuration3(e.target.value)}
            />
          </label>
          <br />
          <br />

          <label>
            <b>Medication-5 </b> <br />
            <input
              placeholder="Include dosage and frequency)"
              type="text"
              value={medication5}
              onChange={(e) => setMedication5(e.target.value)}
            />
          </label>
          <br />
          <label>
            <b>Medication duration(in days)</b> <br />
            <input
              type="text"
              value={duration4}
              onChange={(e) => setDuration4(e.target.value)}
            />
          </label>
          <br />
          <br />
        </form>

        <form>
          <h4
            style={{ color: "purple", fontSize: "23px", textAlign: "center" }}
          >
            BP,BMI and Lab results
          </h4>
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
          <input
            type="file"
            onChange={handleChange2}
            accept="media_type"
          />{" "}
          <br />
          <b>Lab results3 (file)</b>
          <br />
          <input
            type="file"
            onChange={handleChange3}
            accept="media_type"
          />{" "}
          <br />
          <br />
          <label>
            <b>Important note*</b> <br />
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </label>
        </form>
      </div>
      <div className="dashboard">
        <div>
          <p>File upload progress: {percent}%</p>
          <br />
          <button onClick={Push}>{Save}</button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ExternalForm;
