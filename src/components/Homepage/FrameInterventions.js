import React from "react";
import "./HOMEPAGE.css";
import { FiActivity, FiScissors, FiEyeOff } from "react-icons/fi";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Program from "../HomepageForms/Program";

const FrameConditions = (patientData) => {
  return (
    <div>
      <div className="frame-div">
        <div className="frame-parent1">
          <div className="program-status-assignees-parent">
            <h3 className="program-status">{`Interventions`}</h3>
            <div className="frame-parent2">
              <div className="program-parent">
                <table>
                  <tr>
                  
                    <th>CONDITION</th>
                    <th>INTERVENTION</th>

                    <th>STATUS</th>
                    <th>TRACKER</th>
                  
                  </tr>
                  <tr>
                  
                    <td>{patientData.patientData.patient}</td>
                    <td>{patientData.patientData.condition}</td>
                    <td>{patientData.patientData.risk}</td>
                  
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
