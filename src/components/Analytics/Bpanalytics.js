import React, { useEffect, useState } from "react";
import { get, push, ref, update } from "firebase/database";
import { database } from "../Firebase";
import { Pie } from "react-chartjs-2";
import { ArcElement, Tooltip, Legend } from "chart.js";
import { Chart } from "chart.js";
import LoadingIcons from "react-loading-icons";
import { FaUpload } from "react-icons/fa";

const Bpanalytics = (allData) => {
  Chart.register(ArcElement, Tooltip, Legend);
  const dbRef3 = ref(database, "bloodPressure");
  const [bp, setBp] = useState([]);
  const [bp1, setBp1] = useState([]);

  const [Hbp, setHpb] = useState(0);
  const [Nbp, setNpb] = useState(0);
  const [Lbp, setLpb] = useState(0);

  const data = {
    labels: [
      "High blood pressure",
      "Normal blood pressure",
      "Low blood pressure",
    ],
    datasets: [
      {
        label: "Blood pressure",

        data: [Hbp, Nbp, Lbp],
        backgroundColor: ["red", "blue", "green"],
        // hoverBackgroundColor: [
        //   "rgba(255, 99, 132, 1)",
        //   "rgba(54, 162, 235, 1)",
        //   "rgba(255, 206, 86, 1)",
        // ],
      },
    ],
  };

  const options = {};

  useEffect(() => {
    var aa1 = allData.allData
    const dbBp = aa1.filter((data) => data.bloodPressure);
    console.log(aa1);
    //read bp
    get(dbRef3)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const bpArray = Object.entries(snapshot.val()).map(([id, data]) => ({
            id,
            ...data,
          }));
          setBp(bpArray);

          //filter data
          const Hbp1 = bpArray.filter(
            (bps) =>
              bps.pressure.split("/")[0] > 120 ||
              //bps.pressure.split("/")[0] < 60 ||
              //bps.pressure.split("/")[1] < 60 ||
              bps.pressure.split("/")[1] > 80
          );
          const Nbp1 = bpArray.filter(
            (bps) =>
              bps.pressure.split("/")[0] > 80 ||
              bps.pressure.split("/")[0] < 120 ||
              bps.pressure.split("/")[1] > 60 ||
              bps.pressure.split("/")[1] < 80
          );

          const Lbp1 = bpArray.filter(
            (bps) =>
              bps.pressure.split("/")[0] < 90 ||
              //bps.pressure.split("/")[0] < 60 ||
              //bps.pressure.split("/")[1] < 60 ||
              bps.pressure.split("/")[1] < 60
          );
          setHpb(Hbp1.length);
          setNpb(Nbp1.length);
          setLpb(Lbp1.length);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h4>Bp pie chart</h4>

      <Pie
        style={{ maxHeight: "400px", maxWidth: "350px" }}
        data={data}
        options={options}
      />
    </div>
  );
};

export default Bpanalytics;
