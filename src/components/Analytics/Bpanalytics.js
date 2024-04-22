import React, { useEffect, useState } from "react";
import { get, push, ref, update } from "firebase/database";
import { database } from "../Firebase";
import { Pie, Line } from "react-chartjs-2";
import { ArcElement, Tooltip, Legend } from "chart.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from "chart.js";


const Bpanalytics = (allData) => {
  Chart.register(
    ArcElement,
    Tooltip,
    Legend,
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    CategoryScale
  );

  const dbRef3 = ref(database, "bloodPressure");
  const [bp, setBp] = useState([]);
  const [bp1, setBp1] = useState([]);

  const [Hbp, setHpb] = useState(0);
  const [Nbp, setNpb] = useState(0);
  const [Lbp, setLpb] = useState(0);

  const [Sbp, setSbp] = useState([]);
  const [Kbp, setKbp] = useState([]);
  const [Wbp, setWbp] = useState([]);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  //pie chart
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

  const options = {
    responsive: true,
  };

  const datasi1 = {
    labels: Wbp.map((b) => b.dueDate.slice(0, 17)),
    datasets: [
      {
        label: "BP high",
        data: Wbp.map((b) => b.pressure.split("/")[0]),
        //data: [33, 53, 85, 41, 44, 65],
        fill: true,
        backgroundColor: "red",
        borderColor: "rgba(75,192,192,1)",
      },

      {
        label: "BP low",
        data: Wbp.map((b) => b.pressure.split("/")[1]),
        fill: true,
        backgroundColor: "green",
        borderColor: "purple",
      },
    ],
  };

  useEffect(() => {
    //blood pressure
    var dbBp = allData.allData.filter((data) => data.id === "bloodPressure");

    var bpArray = Object.entries(dbBp[0]).map(([id, data]) => ({
      id,
      ...data,
    }));

    bpArray.shift();

    setBp(bpArray);

    const Hbp1 = bpArray.filter(
      (bps) =>
        bps.pressure.split("/")[0] >= 130 &&
        //bps.pressure.split("/")[0] < 60 ||
        //bps.pressure.split("/")[1] < 60 ||
        bps.pressure.split("/")[1] >= 80
    );
    const Nbp1 = bpArray.filter(
      (bps) =>
        bps.pressure.split("/")[0] > 80 ||
        bps.pressure.split("/")[0] < 130 ||
        (bps.pressure.split("/")[1] > 60 && bps.pressure.split("/")[1] < 90)
    );

    const Lbp1 = bpArray.filter(
      (bps) =>
        bps.pressure.split("/")[0] < 90 &&
        //bps.pressure.split("/")[0] < 60 ||
        //bps.pressure.split("/")[1] < 60 ||
        bps.pressure.split("/")[1] < 60
    );
    setHpb(Hbp1.length);
    setNpb(Nbp1.length);
    setLpb(Lbp1.length);
  }, []);

  const handleHospital = (e) => {
    var Members = allData.allData.filter((data) => data.id === e.target.value);

    var mArray = Object.entries(Members[0].clients).map(([id, data]) => ({
      id,
      ...data,
    }));
    setSbp(mArray);

    //get the bp
    let data = [];

    mArray.forEach((element) => {
      let realData = bp.find((data) => data.patient === element.id);

      realData !== undefined ? data.push(realData) : (realData = null);
    });
    setWbp(data);

    const Hbp1 = data.filter(
      (bps) =>
        bps.pressure.split("/")[0] >= 130 || bps.pressure.split("/")[1] >= 80
    );
    const Nbp1 = data.filter(
      (bps) =>
        bps.pressure.split("/")[0] > 80 ||
        (bps.pressure.split("/")[0] < 130 && bps.pressure.split("/")[1] > 60) ||
        bps.pressure.split("/")[1] < 90
    );

    const Lbp1 = data.filter(
      (bps) =>
        bps.pressure.split("/")[0] < 90 ||
        //bps.pressure.split("/")[0] < 60 ||
        //bps.pressure.split("/")[1] < 60 ||
        bps.pressure.split("/")[1] < 60
    );
    setHpb(Hbp1.length);
    setNpb(Nbp1.length);
    setLpb(Lbp1.length);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  return (
    <div>
      <h4>Blood Pressure Analytics </h4>

      <div className="dashboard">
        <div>
          <label htmlFor="Gender">
            <select onChange={handleHospital}>
              <option className="App-info" value="HS" key={"HS"}>
                Select Hospital
              </option>
              <option
                className="App-info"
                value="EQA_Nairobi_West_Hospital"
                key={"EQA_Nairobi_West_Hospital"}
              >
                EQA Nairobi West
              </option>
              <option
                className="App-info"
                value="EQA_South_B"
                key={"EQA_South_B"}
              >
                EQA South B
              </option>
              <option
                className="App-info"
                value="EQA_Kitengela"
                key={"EQA_Kitengela"}
              >
                EQA Kitengela
              </option>
            </select>
          </label>
        </div>

        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Start Date"
        />

        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          placeholderText="End Date"
          minDate={startDate}
        />
      </div>

      <div className="dashboard">
        <Pie
          style={{ maxHeight: "350PX", maxWidth: "300PX" }}
          data={data}
          options={options}
        />

        <Line data={datasi1} options={options} style={{ maxWidth: "30%" }} />
      </div>
    </div>
  );
};

export default Bpanalytics;
