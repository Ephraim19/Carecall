import { FOCUSABLE_SELECTOR } from "@testing-library/user-event/dist/utils";
import React, { useState } from "react";
import { get, push, ref, update } from "firebase/database";
import { database } from "../Firebase";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";

const Doctor = (props) => {
  const [member, setMember] = React.useState("");
  const [member1, setMember1] = React.useState("");
  const [searched, setSearched] = React.useState([]);
  const [searchId, setSearchId] = useState("");
  const [doctor, setDoctor] = React.useState("");

  const searchMember = (e) => {
    setMember1(e.target.value);

    var searches = props.campData.filter((name) =>
      name.member.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearched(searches);
  };

  const handleResultClick = (patient) => {
    setSearched([]);
    setMember1(patient.member);
    setSearchId(patient.id);
  };

  const Push = (e) => {
    e.preventDefault();
    setMember("Doctor");
    //Update triage data
    const updates = {};
    updates["/doctor"] = doctor;

    const dbRef = ref(
      database,
      "camps/" + Cookies.get("camp") + "/" + searchId
    );
    update(dbRef, updates)
      .then(() => {
        toast.success("Doctor's data saved successfully");
        setDoctor("");
        setMember1("");
      })
      .catch((error) => {
        toast.error("Doctor's data not saved");
      });
  };

  return (
    <div className="dashboard">
      <section>
        <form>
          <h4
            style={{ color: "purple", fontSize: "23px", textAlign: "center" }}
          >
            Doctor's Diagnosis
          </h4>

          <label>
            <b>Member's name</b> <br />
            <input
              placeholder="Search member's name"
              type="text"
              value={member1}
              onChange={searchMember}
            />
          </label>
        </form>
        {searched ? (
          <ul className="searchable">
            {searched.map((patient) => (
              <div key={patient.id} onClick={() => handleResultClick(patient)}>
                <li>{patient.member}</li>
              </div>
            ))}
          </ul>
        ) : (
          " "
        )}
        <br />
        <br />

        <form>
          <label for="userInput">Enter diagnosis</label>
          <br />
          <input
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
            type="text"
            id="userInput"
            name="userInput"
            style={{ "font-size": "16px", width: "400px", height: "100px" }}
          ></input>
          <br />
          <br />
          <button onClick={Push}>Submit</button>
        </form>
      </section>
      <ToastContainer />
    </div>
  );
};

export default Doctor;
