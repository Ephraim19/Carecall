import React, { useEffect, useState } from "react";
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

const Bmianalytics = (allData) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hospital, setHospital] = useState("");
  const [bmi, setBmi] = useState([]);
  const [Hbmi, setHbmi] = useState(0);
  const [Nbmi, setNbmi] = useState(0);
  const [Lbmi, setLbmi] = useState(0);

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

  //pie chart
  const data = {
    labels: ["Overweight", "Normal weight", "Underweight"],
    datasets: [
      {
        label: "BMI",

        data: [Hbmi, Nbmi, Lbmi],
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
    labels: bmi.map((b) => b.dueDate.slice(0, 17)),
    datasets: [
      {
        label: "BMI",
        data: bmi.map((b) => parseFloat(b.weight) / parseFloat(b.height ^ 2)),
        //data: [33, 53, 85, 41, 44, 65],
        fill: true,
        backgroundColor: "red",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  useEffect(() => {
    var dbBmi = allData.allData.filter((data) => data.id === "Bmi");

    var bmiArray = Object.entries(dbBmi[0]).map(([id, data]) => ({
      id,
      ...data,
    }));
    bmiArray.shift();
    setBmi(bmiArray);

    var Hbmi = bmiArray.filter(
      (b) => parseFloat(b.weight) / parseFloat(b.height ^ 2) > 25
    ).length;
    var Nbmi = bmiArray.filter(
      (b) =>
        parseFloat(b.weight) / parseFloat(b.height ^ 2) >= 18.5 &&
        parseFloat(b.weight) / parseFloat(b.height ^ 2) <= 25
    ).length;
    var Lbmi = bmiArray.filter(
      (b) => parseFloat(b.weight) / parseFloat(b.height ^ 2) < 18.5
    ).length;
    console.log(Hbmi, Nbmi, Lbmi);
    setHbmi(Hbmi);
    setNbmi(Nbmi);
    setLbmi(Lbmi);
  }, []);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleHospital = (e) => {
    var Members = allData.allData.filter((data) => data.id === e.target.value);

    var mArray = Object.entries(Members[0].clients).map(([id, data]) => ({
      id,
      ...data,
    }));

    //get the bmi
    let data = [];

    mArray.forEach((element) => {
      let realData = bmi.find((data) => data.patient === element.id);

      realData !== undefined ? data.push(realData) : (realData = null);
    });

    setBmi(data);
    var Hbmi = data.filter(
      (b) => parseFloat(b.weight) / parseFloat(b.height ^ 2) > 25
    ).length;
    var Nbmi = data.filter(
      (b) =>
        parseFloat(b.weight) / parseFloat(b.height ^ 2) >= 18.5 &&
        parseFloat(b.weight) / parseFloat(b.height ^ 2) <= 25
    ).length;
    var Lbmi = data.filter(
      (b) => parseFloat(b.weight) / parseFloat(b.height ^ 2) < 18.5
    ).length;
    console.log(Hbmi, Nbmi, Lbmi);
    setHbmi(Hbmi);
    setNbmi(Nbmi);
    setLbmi(Lbmi);
  };

  return (
    <div>
      <h4>BMI Analytics</h4>
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

export default Bmianalytics;
