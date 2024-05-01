import "./FrameComponent1.css";
import React,{useEffect} from "react";

const FrameComponent1 = (interactionDisplay) => {
  const [state, setState] = React.useState("conditions");

  useEffect(() => {
    console.log(interactionDisplay);
  }, []);
  return (
    <div className="frame-parent24">
      <div className="frame-wrapper14">
        <div className="overview-parent">
          <h3 className="overview">Overview</h3>
          <div className="data-processor-wrapper">
            <img className="data-processor-icon" loading="lazy" alt="" />
          </div>
        </div>
      </div>
      <div className="conditions-wrapper" onClick={(e) => setState("conditions")}>
        <h3 className="conditions">Conditions</h3>
      </div>
      <div className="interventions-wrapper" onClick={(e) => setState("interventions")}>
        <h3 className="interventions">Interventions</h3>
      </div>
      <div className="input-filter" onClick={(e) => setState("interactions")}>
        <h3 className="interactions">Interactions</h3>
      </div>
      {/* if (state === "conditions") {
        
      }
      if (state === "interventions") {

      }
      if (state === "interactions") {
  
      } */}
      <h1 className="h1">{`>`}</h1>
    </div>
  );
};

export default FrameComponent1;
