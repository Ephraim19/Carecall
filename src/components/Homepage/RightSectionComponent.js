import React from "react";
import FrameComponent from "./FrameComponent";
import "./FrameComponent.css";

const RightSectionComponent = () => {
  const [state, setState] = React.useState("engagement");
  return (
    <div>
      <div className="frame-parent26">
        <div className="engagement-parent">
          <h3 className="engagement" onClick={(e) => setState("engagement")}>Engagement</h3>
          <div className="line-wrapper">
            <hr className="line-icon" />
          </div>
        </div>
        <h3 className="forms" onClick={(e) => setState("forms")} >Forms</h3>
        <div className="workflow-wrapper">
          <h3 className="workflow" onClick={(e) => setState("workflow")}>Workflow</h3>
        </div>
        <h1 className="h11">{`>`}</h1>
      </div>
      <FrameComponent />
    </div>
  );
};

export default RightSectionComponent;
