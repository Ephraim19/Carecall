import "./FrameComponent.css";
import { useNavigate } from "react-router-dom";
import React from "react";
import { FiExternalLink } from "react-icons/fi";
import Tasks from "../HomepageDisplay/Tasks";
const FrameComponent = (taskDisplay) => {
  const navigate = useNavigate();

  const allTasks = () => {
    navigate("/alltasks");
  };
  return (
    <div className="frame-parent25">
      <div className="tasks-parent">
        <Tasks />
      </div>
      <div>
        <table id="task-table">
          <tr>
            <th>DATE</th>
            <th>Task</th>
          </tr>
        </table>
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
