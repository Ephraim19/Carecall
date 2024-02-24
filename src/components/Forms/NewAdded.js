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
        <img src={carecall} alt="logo" className="App-logo" />
        <form className="App-info"></form>
      </nav>
      <h3>Member succesfully added</h3>
      <button onClick={Push}>Add More </button>
    </div>
  );
};

export default NewAdded;
