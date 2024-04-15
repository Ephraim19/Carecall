import React, { useState, useEffect } from "react";
import Bpanalytics from "./Bpanalytics";
import { get, push, ref, update } from "firebase/database";
import { database } from "../Firebase";

const Analytic = () => {
  const dbAll = ref(database);
  const [allData, setAllData] = useState([]);

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
      {allData.length > 0 ? (
        <div>
          <Bpanalytics allData={allData} />
        </div>
      ) : (
        <div>
          <h1>Loading...</h1>
        </div>
      )}
    </div>
  );
};

export default Analytic;
