import React from "react";
import FrameComponent from "./FrameComponent";
import "./FrameComponent.css";
import Forms from "../HomepageForms/Forms";

const RightSectionComponent = () => {
  const [state, setState] = React.useState("engagement");

  return (
    // This is the JSX code for the RightSectionComponent
    <div>
      <div className="frame-parent26">
        <div className="engagement-parent">
          <h3 className="engagement" onClick={(e) => setState("engagement")}>
            Engagement
          </h3>
            <div className="line-wrapper">
              <hr className="line-icon" />
            </div>
       
        </div>
        {state === "forms" ? (
          <h3 style={{color:'#060074'}} className="forms" onClick={(e) => setState("forms")}>
            Forms
          </h3>
        ) : (
          <h3 className="forms" onClick={(e) => setState("forms")}>
            Forms
          </h3>
        )}
        <div className="workflow-wrapper">
          <h3 className="workflow" onClick={(e) => setState("workflow")}>
            Workflow
          </h3>
        </div>
        <h1 className="h11">{`>`}</h1>
      </div>
      
      {state === "engagement" ? <FrameComponent /> : ""}
      {state === "forms" ? <Forms /> : ""}
      {state === "workflow" ? "workflow" : ""}
    </div>
  );
};

export default RightSectionComponent;
