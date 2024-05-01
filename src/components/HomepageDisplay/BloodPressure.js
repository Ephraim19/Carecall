import React, { useEffect } from "react";
import "./Interactions.css";

const BloodPressure = (bpDisplay) => {
  useEffect(() => {
    console.log(bpDisplay.bpDisplay);
  }, []);
  return (
    <div className="frame-parent2525">
      {bpDisplay.bpDisplay.map((bp) => (
        <div>
          <p>{bp.dueDate.slice(0, 17)}</p>
          <p>{bp.pressure}</p>
          <p>{bp.pulse}</p>
        </div>
      ))}
    </div>
  );
};

export default BloodPressure;
