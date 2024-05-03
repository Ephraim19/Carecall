import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { FiExternalLink } from "react-icons/fi";
import "./Tasks.css";
const FrameComponent = (taskDisplay) => {
  const [state, setState] = React.useState("tasks");
  const navigate = useNavigate();

  const allTasks = () => {
    navigate("/alltasks");
  };
  return (
    <div className="frame-parent25">
      <div className="tasks-parent">
        <div
          className="tasks1"
          style={{ cursor: "pointer", marginLeft: "4%" }}
          onClick={() => setState("tasks")}
        >
          Tasks
        </div>

        <div
          className="tasks1"
          style={{ cursor: "pointer", marginLeft: "4%" }}
          onClick={() => setState("all")}
        >
          all
        </div>
        <div
          className="tasks1"
          style={{ cursor: "pointer", marginLeft: "-6%" }}
          onClick={() => setState("0D")}
        >
          0D
        </div>
        <div
          className="tasks1"
          style={{ cursor: "pointer", marginLeft: "-6%" }}
          onClick={() => setState("7D")}
        >
          7D
        </div>
        <div
          className="tasks1"
          style={{ cursor: "pointer", marginLeft: "-6%" }}
          onClick={() => setState("30D")}
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
          <table id="task-table">
            <tr>
              <th>DATE</th>
              <th>Task</th>
            </tr>
            {state === "tasks" && (
              <>
                {taskDisplay.taskDisplay[0].map((task) => (
                  <tr key={task.id}>
                    <td>{task.dueDate.slice(0, 17)}</td>
                    <td>{task.task}</td>
                  </tr>
                ))}
              </>
            )}
            {state === "all" && (
              <>
                {taskDisplay.taskDisplay[1].map((task) => (
                  <tr key={task.id}>
                    <td>{task.dueDate.slice(0, 17)}</td>
                    <td>{task.task}</td>
                  </tr>
                ))}
              </>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default FrameComponent;
