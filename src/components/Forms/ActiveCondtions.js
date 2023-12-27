import React, { useState } from "react";

export const ActiveCondtions = () => {
  const [condition, setCondition] = useState("");
  const [condition1, setCondition1] = useState("");
  const [condition2, setCondition2] = useState("");
  const [condition3, setCondition3] = useState("");
  const [condition4, setCondition4] = useState("");

  return (
    <div>
      <h4>Conditions</h4>
      <form>
        <label>
          Condition 1:
          <input
            type="text"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          />
        </label>
        <br />
        <label>
          Condition 2:
          <input
            type="text"
            value={condition1}
            onChange={(e) => setCondition1(e.target.value)}
          />
        </label>

        <br />
        <label>
          Condition 3:
          <input
            type="text"
            value={condition2}
            onChange={(e) => setCondition2(e.target.value)}
          />
        </label>
        <br />

        <label>
          Condition 4:
          <input
            type="text"
            value={condition3}
            onChange={(e) => setCondition3(e.target.value)}
          />
        </label>

        <br />
        <label>
          Condition 5:
          <input
            type="text"
            value={condition4}
            onChange={(e) => setCondition4(e.target.value)}
          />
        </label>
        <br />
      </form>
    </div>
  );
};
