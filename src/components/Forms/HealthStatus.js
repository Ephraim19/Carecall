import React, { useState } from "react";

export const HealthStatus = () => {
  const [status, setStatus] = useState("Healthy");

  const onOptionChange = (e) => {
    setStatus(e.target.value);
  };

  return (
    <div>
      <form>
        <label>
          <b>Enter the patients health status:</b> <br />
          <input
            type="radio"
            value="Healthy"
            name="status"
            checked={status === "Healthy"}
            onChange={onOptionChange}
          />{" "}
          Healthy <br />
          <input
            type="radio"
            value="At risk"
            name="status"
            checked={status === "At risk"}
            onChange={onOptionChange}
          />{" "}
          At risk <br />
          <input
            type="radio"
            value="Chronic"
            name="status"
            checked={status === "Chronic"}
            onChange={onOptionChange}
          />{" "}
          Chronic <br />
        </label>
      </form>
    </div>
  );
};
