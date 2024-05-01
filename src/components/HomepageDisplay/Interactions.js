import React, { useEffect } from "react";
import "./Interactions.css";
import { FiExternalLink } from "react-icons/fi";

const Interactions = (interactionDisplay) => {
  useEffect(() => {
    console.log(interactionDisplay.interactionDisplay);
  }, []);
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
