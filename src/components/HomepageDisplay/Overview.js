import React from "react";
import "./Interactions.css";
import BMI from "./BMI";
import BloodPressure from "./BloodPressure";
import BloodSugar from "./BloodSugar";
import Collapsible from "react-collapsible";

const Overview = (datas) => {
  return (
    <div className="frame-parent2525">
      <div style={{ cursor: "pointer" }}>
        <Collapsible trigger="BMI DATA">
          <BMI bmiDisplay={datas.datas[2]} />
        </Collapsible>
        <div style={{ cursor: "pointer" }}></div>

        <Collapsible style={{ cursor: "pointer" }} trigger="BLOODPRESSURE DATA">
          <BloodPressure bpDisplay={datas.datas[0]} />
        </Collapsible>
      </div>

      <div style={{ cursor: "pointer" }}>
        <Collapsible trigger="BLOODSUGAR DATA">
          <BloodSugar sugarDisplay={datas.datas[1]} />
        </Collapsible>
      </div>
    </div>

    // <div className="frame-parent2525">
    //   <table id="pressure">
    //     <tr>
    //       <th>DATE</th>
    //       <th>WEIGHT</th>
    //       <th>HEIGHT</th>
    //       <th>BMI</th>
    //     </tr>
    //     {bmiDisplay.bmiDisplay.map((bmi) => (
    //       <tr>
    //         <td>{bmi.dueDate.slice(0, 17)}</td>
    //         <td>{bmi.weight}</td>
    //         <td>{bmi.height}</td>
    //         <td>
    //           {" "}
    //           {bmi.height < 100
    //             ? (parseInt(bmi.weight) / parseInt(bmi.height ^ 2)).toFixed(2)
    //             : (
    //                 parseInt(bmi.weight) / parseInt((bmi.height / 100) ^ 2)
    //               ).toFixed(2)}
    //         </td>
    //       </tr>
    //     ))}
    //   </table>
    // </div>
  );
};

export default Overview;
