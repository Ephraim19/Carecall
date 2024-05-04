import React from "react";
import "./Interactions.css";

const BloodSugar = (sugarDisplay) => {

  return (
    <div >
      <table id="pressure">
        <tr>
          <th>DATE</th>
          <th>FASTING</th>
          <th>RANDOM</th>
          <th>HBA1C</th>

        </tr>
        {sugarDisplay.sugarDisplay.map((bs) => (
          <tr>
            <td>{bs.dueDate.slice(0, 17)}</td>
            <td>{bs.fasting}</td>
            <td>{bs.random}</td>
            <td>{bs.HBA1C}</td>

          </tr>
        ))}
      </table>
    </div>
  );
};

export default BloodSugar;
