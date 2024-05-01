import "./FrameComponent.css";
import { useNavigate } from "react-router-dom";
import React from "react";
import { FiExternalLink } from "react-icons/fi";

const FrameComponent = () => {
  const navigate = useNavigate();

  const allTasks = () => {
    navigate("/alltasks");
  };
  return (
    <div className="frame-parent25">
      <div className="tasks-parent">
        <div className="tasks1">Tasks</div>
        <div
          className="tasks1"
          style={{ cursor: "pointer" }}
          onClick={allTasks}
        >
          all Tasks
        </div>
        <div className="frame-wrapper15">
          <div className="rectangle-parent8">
            <div className="frame-child11" />
            <FiExternalLink className="expand-svgrepocom-icon" />
          </div>
        </div>
      </div>
      <div className="member-journey-parent">
        <b className="member-journey">Member Journey</b>
        <div className="rectangle-parent9">
          <div className="frame-child12" />
          <FiExternalLink className="expand-svgrepocom-icon1" />
        </div>
      </div>
      <div className="frame-parent27">
        <div className="rectangle-parent10">
          <div className="frame-child13" />
          <FiExternalLink className="expand-svgrepocom-icon2" />
        </div>
        <h3 className="appointments">Appointments</h3>
      </div>
      <div className="frame-parent27">
        <div className="rectangle-parent10">
          <div className="frame-child13" />
          <FiExternalLink className="expand-svgrepocom-icon2" />
        </div>
        <h3 className="appointments">Engagement Panel</h3>
      </div>
    </div>
  );
};

export default FrameComponent;
