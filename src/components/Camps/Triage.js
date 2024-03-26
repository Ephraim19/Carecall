import React, { useState } from "react";
import { get, push, ref, update } from "firebase/database";
import { database } from "../Firebase";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";

const Triage = (props) => {
  const [member, setMember] = React.useState("");
  const [member1, setMember1] = React.useState("");

  const [height, setHeight] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [bp, setBp] = React.useState("");
  const [bs, setBs] = React.useState("");
  const [bmi, setBmi] = React.useState("");
  const [searched, setSearched] = useState([]);
  const [searchId, setSearchId] = useState("");

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
    setMember("Triage");
    //Update triage data
    const updates = {};
    updates["/weight"] = weight;
    updates["/height"] = height;
    updates["/bp"] = bp;
    updates["/bs"] = bs;

    const dbRef = ref(database, "camps/" + Cookies.get("camp") + "/" + searchId);
    update(dbRef, updates).then(() => {
      toast.success("Triage data saved successfully");
      setWeight("");
      setHeight("");
      setBp("");
      setBs("");
      setMember1("");
    }
    ).catch((error) => {
      toast.error("Triage data not saved");
    });

  };

  return (
    <div className="dashboard">
      <section>
        <form>
          <h4
            style={{ color: "purple", fontSize: "23px", textAlign: "center" }}
          >
            Triage
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
          <label>
            <b>Weight*</b> <br />
            <input
              type="text"
              placeholder="Enter weight in kg"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </label>
          <br />
          <br />

          <label>
            <b>Height*</b> <br />
            <input
              type="text"
              value={height}
              placeholder="Enter height in meters"
              onChange={(e) => setHeight(e.target.value)}
            />
          </label>
          <br />
          <br />

          <label>
            <b>Blood pressure*</b> <br />
            <input
              type="text"
              value={bp}
              onChange={(e) => setBp(e.target.value)}
            />
          </label>
          <br />
          <br />
          <label>
            <b>Blood sugar*</b> <br />
            <input
              type="text"
              value={bs}
              onChange={(e) => setBs(e.target.value)}
            />
          </label>
          <br />
          <br />
          <button onClick={Push}>Submit</button>
        </form>
      </section>
      <div>
        <h4 style={{ color: "purple", fontSize: "23px", textAlign: "center" }}>
          Triage data
        </h4>

        {weight && height && (
          <p>BMI: {(weight / (height * height)).toFixed(2)}</p>
        )}
        <p>Blood pressure:{bp}</p>
        <p>Blood sugar:{bs}</p>
      </div>
      <ToastContainer />

    </div>
  );
};

export default Triage;
