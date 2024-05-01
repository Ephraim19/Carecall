import React, { useEffect } from "react";
import "./Interactions.css";
import { FiExternalLink } from "react-icons/fi";

const Interactions = (interactionDisplay) => {
  useEffect(() => {
    console.log(interactionDisplay.interactionDisplay);
  }, []);
  return (
    <div className="frame-parent2525">

      {interactionDisplay.interactionDisplay.map((interaction) => (
        <div>
        <p>{interaction.dueDate}</p>
        <p>{interaction.interaction}  ({interaction.Hc})</p>
        </div>
      ))}
    </div>
  );
};

export default Interactions;
