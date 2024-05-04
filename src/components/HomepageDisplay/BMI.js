import React from "react";
import "./Interactions.css";

const BMI = (bmiDisplay) => {
  return (
    <div>
      <table id="pressure">
        <tr>
          <th>DATE</th>
          <th>WEIGHT</th>
          <th>HEIGHT</th>
          <th>BMI</th>
        </tr>
        {bmiDisplay.bmiDisplay.map((bmi) => (
          <tr>
            <td>{bmi.dueDate.slice(0, 17)}</td>
            <td>{bmi.weight}</td>
            <td>{bmi.height}</td>
            <td>
              {" "}
              {bmi.height < 100
                ? (parseInt(bmi.weight) / parseInt(bmi.height ^ 2)).toFixed(2)
                : (
                    parseInt(bmi.weight) / parseInt((bmi.height / 100) ^ 2)
                  ).toFixed(2)}
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default BMI;
