import React from "react";
import carecall from "../carecall.png";
import { useNavigate } from "react-router-dom";

const NewAdded = () => {
  const navigate = useNavigate();

  const Push = () => {
    navigate("/new");
  };

  return (
    <div>
      <nav className="App-nav">
        <img style={{display: "block", margin: "0 auto"}} src={carecall} alt="logo" className="App-logo" />
        <form className="App-info"></form>
      </nav>
      <h3 style={{ color: "purple", fontSize: "23px", textAlign: "center" }}>
        Member added successfully
      </h3>
      <button style={{display: "block", margin: "0 auto"}} onClick={Push}>Add More... </button>
    </div>
  );
};

export default NewAdded;
