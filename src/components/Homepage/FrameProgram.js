import React from "react";
import "./HOMEPAGE.css";
import { FiActivity, FiScissors, FiEyeOff } from "react-icons/fi";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Program from "../HomepageForms/Program";

const FrameProgram = (programStatusDisplay) => {
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
                  <div className="vitalcare360">
                    {programStatusDisplay.programStatusDisplay
                      ? programStatusDisplay.programStatusDisplay.program
                      : "--"}
                  </div>
                  <div className="stage">STAGE</div>
                </div>
                <div className="pen-tool">
                  <div className="eraser-tool">
                    <div className="active">
                      {programStatusDisplay.programStatusDisplay
                        ? programStatusDisplay.programStatusDisplay.status
                        : "--"}
                    </div>
                    <div className="data-hub-wrapper">
                      {programStatusDisplay.programStatusDisplay
                        ? (programStatusDisplay.programStatusDisplay.status ===
                          "Active" ? (
                            <FiActivity className="data-hub-icon" />
                          ) : (
                            " "
                          ),
                          programStatusDisplay.programStatusDisplay.status ===
                          "inactive" ? (
                            <FiEyeOff className="data-hub-icon" />
                          ) : (
                            " "
                          ),
                          programStatusDisplay.programStatusDisplay.status ===
                          "Discharged" ? (
                            <FiScissors className="data-hub-icon" />
                          ) : (
                            " "
                          ))
                        : " "}
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
                <button className="rectangle-container">
                  <div className="frame-inner" />
                  <div className="edit">
                    {programStatusDisplay.programStatusDisplay ? "EDIT" : "ADD"}
                  </div>
                </button>
              }
              position="right center"
              contentStyle={{ width: "auto", maxWidth: "600px" }}
            >
              <Program programStatusDisplay={programStatusDisplay} />
            </Popup>
          </div>
        </div>
        <div className="frame-parent4">
          <div className="frame-wrapper1">
            <div className="onboarded-parent">
              <div className="onboarded">
                {programStatusDisplay.programStatusDisplay
                  ? programStatusDisplay.programStatusDisplay.stage
                  : "--"}
              </div>
              <div className="nutritionist-parent">
                <div className="nutritionist">NUTRITIONIST</div>
                <div className="alice-akoth">
                  {programStatusDisplay.programStatusDisplay
                    ? programStatusDisplay.programStatusDisplay.nutritionist
                    : "--"}
                </div>
              </div>
            </div>
          </div>
          <div className="ebenezer-mokamba-parent">
            <div className="ebenezer-mokamba">
              {programStatusDisplay.programStatusDisplay
                ? programStatusDisplay.programStatusDisplay.careManager
                : "--"}
            </div>
            <div className="engagement-lead-parent">
              <div className="engagement-lead">ENGAGEMENT LEAD</div>
              <div className="aaron-macharia">
                {programStatusDisplay.programStatusDisplay
                  ? programStatusDisplay.programStatusDisplay.engagementLead
                  : "--"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameProgram;
