import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { database } from "../Firebase";
import { ref, push, get, update } from "firebase/database";
import Cookies from "js-cookie";
import carecall from "../carecall.png";
import DatePicker from "react-datepicker";

const EditStatus = () => {
  const [patient, setPatient] = useState("");
  const [hospital, setHospital] = useState("");

  const [Phone, setPhone] = useState(0);
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("Healthy");
  const [goals, setGoals] = useState("");
  const [condition, setCondition] = useState("");
  const [condition1, setCondition1] = useState("");
  const [condition2, setCondition2] = useState("");
  const [condition3, setCondition3] = useState("");
  const [condition4, setCondition4] = useState("");
  const [intervention, setIntervention] = useState("");
  const [intervention1, setIntervention1] = useState("");
  const [intervention2, setIntervention2] = useState("");
  const [intervention3, setIntervention3] = useState("");
  const [intervention4, setIntervention4] = useState("");
  const [dueDates, setDueDates] = useState(new Date());
  const [hc, setHc] = useState("");
  const [Address, setAddress] = useState("");
  const [Address1, setAddress1] = useState("");
  const [patientData, setPatientData] = useState([]);

  const [prefDay, setPrefDay] = useState("");
  const [prefTime, setPrefTime] = useState("");
  const [prefLang, setPrefLang] = useState("");

  const hs = Cookies.get("hos_admin");
  const cl = hs + "/" + "clients";
  const dbRef = ref(database, cl);
  const navigate = useNavigate();

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
          const obj = dataArray.find(
            (name) => name.id === Cookies.get("patient")
          );
          setPatient(obj.patient);
          setPhone(obj.Phone);
          setAddress(obj.Address);
          setAddress1(obj.Address1);
          setCondition(obj.condition);
          setCondition1(obj.condition1);

          setCondition2(obj.condition2);
          setCondition3(obj.condition3);
          setCondition4(obj.condition4);

          //setDueDates(obj.age);

          setGender(obj.gender);
          setStatus(obj.status);
          setGoals(obj.goals);

          setIntervention(obj.intervention);
          setIntervention1(obj.intervention1);
          setIntervention2(obj.intervention2);
          setIntervention3(obj.intervention3);
          setIntervention4(obj.intervention4);
          setPatientData(obj);
          
          setPrefLang(obj.language);
          setPrefDay(obj.day);
          setPrefTime(obj.time);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const Push = (e) => {
    e.preventDefault();
    //Update user data
    const updates = {};
    updates[Cookies.get("patient") + "/Phone"] = Phone;
    //updates[Cookies.get("patient") + "/age"] = dueDates;
    updates[Cookies.get("patient") + "/condition"] = condition;
    updates[Cookies.get("patient") + "/condition1"] = condition1;
    updates[Cookies.get("patient") + "/condition2"] = condition2;
    updates[Cookies.get("patient") + "/condition3"] = condition3;
    updates[Cookies.get("patient") + "/condition4"] = condition4;
    //updates[Cookies.get("patient") + "/gender"] = gender;

    updates[Cookies.get("patient") + "/goals"] = goals;
    updates[Cookies.get("patient") + "/intervention"] = intervention;
    updates[Cookies.get("patient") + "/intervention1"] = intervention1;
    updates[Cookies.get("patient") + "/intervention2"] = intervention2;
    updates[Cookies.get("patient") + "/intervention3"] = intervention3;
    updates[Cookies.get("patient") + "/intervention4"] = intervention4;

    updates[Cookies.get("patient") + "/patient"] = patient;
    //updates[Cookies.get("patient") + "/status"] = status;

    updates[Cookies.get("patient") + "/Address"] = Address;
    updates[Cookies.get("patient") + "/Address1"] = Address1;

    updates[Cookies.get("patient") + "/language"] = prefLang;
    updates[Cookies.get("patient") + "/day"] = prefDay;
    updates[Cookies.get("patient") + "/time"] = prefTime;

    update(dbRef, updates);
    navigate("/dashboard");
  };

  const onOptionChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSelect = (e) => {
    setGender(e.target.value);
    console.log(e.target.value);
  };
  return (
    <div>
      <nav className="App-nav">
        <img src={carecall} alt="logo" className="App-logo" />
        <h3 style={{ color: "purple", fontSize: "23px", textAlign: "center" }}>
          Member Information Update
        </h3>
      </nav>

      <form className="newForm">
        <div className="dashboard">
          <div>
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
            <label>
              Home Address <br />
              <input
                type="text"
                value={Address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </label>
            <br />
            <br />
            <label>
              Office Address <br />
              <input
                type="text"
                value={Address1}
                onChange={(e) => setAddress1(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Preferred Language <br />
              <input
                type="text"
                value={prefLang}
                onChange={(e) => setPrefLang(e.target.value)}
              />
            </label>

            <br />
            <br />
            <label>
              Preferred Day
              <br />
              <input
                type="text"
                value={prefDay}
                onChange={(e) => setPrefDay(e.target.value)}
              />
            </label>

            <br />
            <br />
            <label>
              Preferred Time <br />
              <input
                type="text"
                value={prefTime}
                onChange={(e) => setPrefTime(e.target.value)}
              />
            </label>
          </div>
        </div>
        <div className="dashboard">
        <button onClick={Push}>Save</button>

        </div>
      </form>
    </div>
  );
};

export default EditStatus;
