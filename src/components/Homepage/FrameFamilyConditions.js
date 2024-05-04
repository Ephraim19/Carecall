
import React from "react";
import "./HOMEPAGE.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const FrameConditions = (patientData) => {
  return (
    <div>
      <div className="frame-div">
        <div className="frame-parent1">
          <div className="program-status-assignees-parent">
            <h3 className="program-status">{`Health Goals`}</h3>
            <div className="frame-parent2">
              <div className="program-parent">
                <table>
                  {/* <tr>
                    <th>Health goal</th>
                  </tr> */}
                  <tr>
                    <td>{patientData.patientData.patient}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameConditions;
// Path: src/components/Homepage/FrameInterventions.js
