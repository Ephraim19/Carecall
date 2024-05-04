import React from "react";
import "./Interactions.css";
import BMI from "./BMI";
import BloodPressure from "./BloodPressure";
import BloodSugar from "./BloodSugar";
import Collapsible from "react-collapsible";
import BMIChart from "./BMIChart";
import BloodPressureGraph from "./BloodPressureGraph";
import BloodSugarChart from "./BloodSugarChart";

const Overview = (datas) => {
  return (
    <div className="frame-parent2525">
      <div style={{ cursor: "pointer" }}>
        <Collapsible trigger="BMI DATA">
          <p>
            <Collapsible trigger="Data">
              <BMI bmiDisplay={datas.datas[2]} />
            </Collapsible>
          </p>
          <p>
            <Collapsible trigger="Charts & Graphs">
              <BMIChart bmiDisplay1={datas.datas[2]} />{" "}
            </Collapsible>
          </p>
        </Collapsible>
        <div style={{ cursor: "pointer" }}></div>

        <Collapsible style={{ cursor: "pointer" }} trigger="BLOODPRESSURE DATA">
          <p>
            <Collapsible trigger="Data">
              <BloodPressure bpDisplay={datas.datas[0]} />
            </Collapsible>
          </p>
          <p>
            <Collapsible trigger="Charts & Graphs">
              <BloodPressureGraph bpDisplay={datas.datas[0]} />
            </Collapsible>
          </p>
        </Collapsible>
      </div>

      <div style={{ cursor: "pointer" }}>
        <Collapsible trigger="BLOODSUGAR DATA">
          <p>
            <Collapsible trigger="Data">
              <BloodSugar sugarDisplay={datas.datas[1]} />
            </Collapsible>
          </p>
          <p>
            <Collapsible trigger="Charts & Graphs">
              <BloodSugarChart sugarDisplay={datas.datas[1]} />
            </Collapsible>
          </p>
        </Collapsible>
      </div>
      <div style={{ cursor: "pointer" }}>
        <Collapsible trigger="APPOINTMENT">
          <BloodSugar sugarDisplay={datas.datas[1]} />
        </Collapsible>
      </div>
      <div style={{ cursor: "pointer" }}>
        <Collapsible trigger="DOCTOR CONSULTATION">
          <BloodSugar sugarDisplay={datas.datas[1]} />
        </Collapsible>
      </div>
      <div style={{ cursor: "pointer" }}>
        <Collapsible trigger="NUTRITION CONSULTATION">
          <BloodSugar sugarDisplay={datas.datas[1]} />
        </Collapsible>
      </div>
      <div style={{ cursor: "pointer" }}>
        <Collapsible trigger="PHYCHOLOGY CONSULTATION">
          <BloodSugar sugarDisplay={datas.datas[1]} />
        </Collapsible>
      </div>
      <div style={{ cursor: "pointer" }}>
        <Collapsible trigger="LIVER FUNCTION">
          <BloodSugar sugarDisplay={datas.datas[1]} />
        </Collapsible>
        <div style={{ cursor: "pointer" }}>
          <Collapsible trigger="UECS">
            <BloodSugar sugarDisplay={datas.datas[1]} />
          </Collapsible>
        </div>
        <div style={{ cursor: "pointer" }}>
          <Collapsible trigger="URINALYSIS">
            <BloodSugar sugarDisplay={datas.datas[1]} />
          </Collapsible>
        </div>
        <div style={{ cursor: "pointer" }}>
          <Collapsible trigger="TSH">
            <BloodSugar sugarDisplay={datas.datas[1]} />
          </Collapsible>
        </div>
        <div style={{ cursor: "pointer" }}>
          <Collapsible trigger="LIPID">
            <BloodSugar sugarDisplay={datas.datas[1]} />
          </Collapsible>
        </div>
        <div style={{ cursor: "pointer" }}>
          <Collapsible trigger="HIV">
            <BloodSugar sugarDisplay={datas.datas[1]} />
          </Collapsible>
        </div>
        <div style={{ cursor: "pointer" }}>
          <Collapsible trigger="LOGISTICS">
            <BloodSugar sugarDisplay={datas.datas[1]} />
          </Collapsible>
        </div>
      </div>
    </div>
  );
};

export default Overview;
