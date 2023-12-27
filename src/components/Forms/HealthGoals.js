import React, { useState } from "react";

export const HealthGoals = () => {
  const [goals, setGoals] = useState("");

  return (
    <div>
      <form>
        <label>
          <b>Enter the patients health goals:</b>
          <input
            type="text"
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
          />
        </label>
        <br />
      </form>
    </div>
  );
};
