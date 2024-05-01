import React, { useEffect } from "react";
import "./Interactions.css";

const BloodPressure = (bpDisplay) => {

  return (
    <div className="frame-parent2525">
      <table id="pressure">
        <tr>
          <th>DATE</th>
          <th>BLOOD PRESSURE</th>
          <th>PULSE</th>
        </tr>
        {bpDisplay.bpDisplay.map((bp) => (
          <tr>
            <td>{bp.dueDate.slice(0, 17)}</td>
            <td>{bp.pressure}</td>
            <td>{bp.pulse}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default BloodPressure;
