import React from "react";

const Optical = () => {
  return (
    <div className="dashboard">
      <form>
        <h4 style={{ color: "purple", fontSize: "23px", textAlign: "center" }}>
          Optician
        </h4>
        <label for="userInput">Enter diagnosis</label>
        <br />
        <input
          type="text"
          id="userInput"
          name="userInput"
          style={{ "font-size": "16px", width: "400px", height: "100px" }}
        ></input>
      </form>
    </div>
  );
};

export default Optical;
