import React, { useEffect, useState } from "react";
import "./HOMEPAGE.css";
import { FiActivity } from "react-icons/fi";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Program from "../HomepageForms/Program";

const FrameProgram = (patientData) => {
  const [patientDataId, setPatientDataId] = useState([]);
  useEffect(() => {
    setPatientDataId(patientData.patientData.id);
  }, [patientData]);

  const handleAddEdit = () => {
    console.log("Add/Edit button clicked");
  };

  return (
    <div>
      <div className="frame-div">
        <div className="frame-parent1">
          <div className="program-status-assignees-parent">
            <h3 className="program-status">{`Program, Status & Assignees`}</h3>
            <div className="frame-parent2">
              <div className="program-parent">
                <div className="program">PROGRAM</div>
                <div className="status">STATUS</div>
              </div>
              <div className="frame-parent3">
                <div className="vitalcare360-parent">
                  <div className="vitalcare360">VitalCare360</div>
                  <div className="stage">STAGE</div>
                </div>
                <div className="pen-tool">
                  <div className="eraser-tool">
                    <div className="active">Active</div>
                    <div className="data-hub-wrapper">
                      <FiActivity className="data-hub-icon" />
                    </div>
                  </div>
                  <div className="care-manager">CARE MANAGER</div>
                </div>
              </div>
            </div>
          </div>
          <div className="frame-wrapper">
            <Popup
              trigger={
                <button onClick={handleAddEdit} className="rectangle-container">
                  <div className="frame-inner" />
                  <div className="edit">ADD/EDIT</div>
                </button>
              }
              position="right center"
              contentStyle={{ width: "auto", maxWidth: "600px" }}
            >
              <Program />
            </Popup>
          </div>
        </div>
        <div className="frame-parent4">
          <div className="frame-wrapper1">
            <div className="onboarded-parent">
              <div className="onboarded">Onboarded</div>
              <div className="nutritionist-parent">
                <div className="nutritionist">NUTRITIONIST</div>
                <div className="alice-akoth">Alice Akoth</div>
              </div>
            </div>
          </div>
          <div className="ebenezer-mokamba-parent">
            <div className="ebenezer-mokamba">Ebenezer Mokamba</div>
            <div className="engagement-lead-parent">
              <div className="engagement-lead">ENGAGEMENT LEAD</div>
              <div className="aaron-macharia">Aaron Macharia</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameProgram;
