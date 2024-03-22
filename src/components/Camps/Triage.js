import React from "react";

const Triage = () => {
  const [member, setMember] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [bp, setBp] = React.useState("");
  const [bs, setBs] = React.useState("");
  const [bmi, setBmi] = React.useState("");

  return (
    <div className="dashboard">
      <form>
        <h4 style={{ color: "purple", fontSize: "23px", textAlign: "center" }}>
          Triage
        </h4>
        <label>
          <b>Member's name</b> <br />
          <input
            placeholder="Search member's name"
            type="text"
            value={member}
            onChange={(e) => setMember(e.target.value)}
          />
        </label>
        <br />
        <br />

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
      </form>
      <div>
        <h4 style={{ color: "purple", fontSize: "23px", textAlign: "center" }}>
          Triage data
        </h4>
        
        {weight && height && <p>BMI: { (weight / (height * height)).toFixed(2)}</p>}
        <p>Blood pressure:{bp}</p>
        <p>Blood sugar:{bs}</p>
      </div>
    </div>
  );
};

export default Triage;
