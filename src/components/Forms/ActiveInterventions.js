import React, { useState } from "react";

export const ActiveInterventions = () => {
  const [intervention, setIntervention] = useState("");
  const [intervention1, setIntervention1] = useState("");
  const [intervention2, setIntervention2] = useState("");
  const [intervention3, setIntervention3] = useState("");
  const [intervention4, setIntervention4] = useState("");

  return (
    <div>
      <h4>Interventions</h4>
      <form>
        <label>
        Intervention 1:
          <input
            type="text"
            value={intervention}
            onChange={(e) => setIntervention(e.target.value)}
          />
        </label>
        <br />
        <label>
        Intervention 2:
          <input
            type="text"
            value={intervention1}
            onChange={(e) => setIntervention1(e.target.value)}
          />
        </label>

        <br />
        <label>
        Intervention 3:
          <input
            type="text"
            value={intervention2}
            onChange={(e) => setIntervention2(e.target.value)}
          />
        </label>
        <br />

        <label>
        Intervention 4:
          <input
            type="text"
            value={intervention3}
            onChange={(e) => setIntervention3(e.target.value)}
          />
        </label>

        <br />
        <label>
        Intervention 5:
          <input
            type="text"
            value={intervention4}
            onChange={(e) => setIntervention4(e.target.value)}
          />
        </label>
        <br />
      </form>
    </div>
  );
};
