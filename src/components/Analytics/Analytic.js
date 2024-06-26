import React, { useState, useEffect } from "react";
import Bpanalytics from "./Bpanalytics";
import { get, push, ref, update } from "firebase/database";
import { database } from "../Firebase";
import Bmianalytics from "./Bmianalytics";
import carecall from "../carecall.svg";
import Tasksanalytics from "./Tasksanalytics";

const Analytic = () => {
  const dbAll = ref(database);
  const [allData, setAllData] = useState([]);
  const [hospital, setHospital] = useState("");

  const handleHospital = (e) => {
    setHospital(e.target.value);
  };

  useEffect(() => {
    get(dbAll).then((snapshot) => {
      if (snapshot.exists()) {
        const allDataArray = Object.entries(snapshot.val()).map(
          ([id, data]) => ({
            id,
            ...data,
          })
        );
        setAllData(allDataArray);
      }
    });
  }, []);

  return (
    <div>
      <nav className="App-nav">
        <img src={carecall} alt="logo" className="App-logo" />
        <h4>Analytics</h4>
      </nav>
      {allData.length > 0 ? (
        <>
          <div>
            <Tasksanalytics allData={allData} />
          </div>
          <div>
            <Bpanalytics allData={allData} />
          </div>
          <div>
            <Bmianalytics allData={allData} />
          </div>
        </>
      ) : (
        <div>
          <h1>Loading...</h1>
        </div>
      )}
    </div>
  );
};

export default Analytic;
