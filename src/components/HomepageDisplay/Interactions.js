import React from "react";
import "./Interactions.css";

const Interactions = (interactionDisplay) => {
  return (
    <div className="frame-parent2525">
      <table id="interaction">
        <tr>
          <th>DATE</th>
          <th>INTERACTION</th>
        </tr>
        {interactionDisplay.interactionDisplay.map((interaction) => (
          <tr>
            <td>{interaction.dueDate}</td>
            <td>
              {interaction.interaction} ({interaction.Hc}) ({interaction.mode})
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Interactions;
