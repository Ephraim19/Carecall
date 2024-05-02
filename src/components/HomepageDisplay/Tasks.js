import { useNavigate } from "react-router-dom";
import React from "react";
import { FiExternalLink } from "react-icons/fi";
import "./Tasks.css";
const FrameComponent = (taskDisplay) => {
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
          style={{ cursor: "pointer", marginLeft: "4%" }}
          onClick={allTasks}
        >
          all
        </div>
        <div
          className="tasks1"
          style={{ cursor: "pointer", marginLeft: "-6%" }}
          onClick={allTasks}
        >
          1D
        </div>
        <div
          className="tasks1"
          style={{ cursor: "pointer", marginLeft: "-6%" }}
          onClick={allTasks}
        >
          7D
        </div>
        <div
          className="tasks1"
          style={{ cursor: "pointer", marginLeft: "-6%" }}
          onClick={allTasks}
        >
          30D
        </div>

        <div className="frame-wrapper15">
          <div className="rectangle-parent8">
            <div className="frame-child11" />
            <FiExternalLink
              className="expand-svgrepocom-icon"
              style={{ cursor: "pointer", marginLeft: "-4%" }}
            />
          </div>
        </div>
      </div>
      <div>
        <div>
          <table id="task-table" >
            <tr>
              <th>DATE</th>
              <th>Task</th>
            </tr>
            {taskDisplay.taskDisplay.map((task) => (
            <tr key={task.id}>
                <td>{task.dueDate}</td>
                <td>{task.task}</td>
            </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default FrameComponent;
