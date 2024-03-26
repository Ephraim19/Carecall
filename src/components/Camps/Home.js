import React from "react";
import carecall from "../carecall.png";
import Registration from "./Registration";
import Triage from "./Triage";
import Cookies from "js-cookie";
import { ref, push, get, update, set } from "firebase/database";
import { database } from "../Firebase";
import Doctor from "./Doctor";
import Nutritionist from "./Nutritionist";
const Home = () => {
  const [member, setMember] = React.useState("");
  const [camp, setCamp] = React.useState("");
  const [campData, setCampData] = React.useState([]);

  React.useEffect(() => {
    const camp1 = Cookies.get("camp");
    if (camp1) {
      setCamp(camp1);

      const dbRef = ref(database, "camps/" + camp);
      get(dbRef)
        .then((snapshot) => {
          if (snapshot.exists()) {

            const data = Object.entries(snapshot.val()).map(([id, data]) => ({
              id,
              ...data,
            }));
            setCampData(data);
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });

  const Reg = (e) => {
    if (e.target.innerText === "Registration") {
      setMember("Registration");
    }
    if (e.target.innerText === "Triage") {
      setMember("Triage");
    }
    if (e.target.innerText === "Doctor") {
      setMember("Doctor");
    }
    if (e.target.innerText === "Nutritionist") {
      setMember("Nutritionist");
    }
  };

  const submit = () => {
    Cookies.set("camp", camp);
    setMember("Registration");
  };

  return (
    <div>
      <nav className="App-nav">
        <img src={carecall} alt="logo" className="App-logo" />
        <button className="App-info" onClick={Reg}>
          Registration
        </button>
        <button className="App-info" onClick={Reg}>
          Triage
        </button>
        <button className="App-info" onClick={Reg}>
          Doctor
        </button>{" "}
        <button className="App-info" onClick={Reg}>
          Nutritionist
        </button>
        <button className="App-info" onClick={Reg}>
          Optical
        </button>
        <button className="App-info" onClick={Reg}>
          Dental
        </button>
        <button className="App-info" onClick={Reg}>
          Pharmacy
        </button>
        
      </nav>

      {!member ? (
        <form className="dashboard">
          <div>
            <h4
              style={{ color: "purple", fontSize: "23px", textAlign: "center" }}
            >
              Camp Details
            </h4>
            <label>
              <b>Medical camp name*</b> <br />
              <input
                type="text"
                value={camp}
                onChange={(e) => setCamp(e.target.value)}
              />
            </label>
            <br />
            <br />
            <button onClick={submit}>Submit</button>
          </div>
        </form>
      ) : (
        " "
      )}
      {member === "Registration" && <Registration campData = {campData} />}
      {member === "Triage" && <Triage />}
      {member === "Doctor" && <Doctor />}
      {member === "Nutritionist" && <Nutritionist />}

    </div>
  );
};

export default Home;
