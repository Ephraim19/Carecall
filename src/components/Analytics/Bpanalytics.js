import React, { useEffect, useState } from "react";
import { get, push, ref, update } from "firebase/database";
import { database } from "../Firebase";
import { Pie } from "react-chartjs-2";
import { ArcElement, Tooltip, Legend } from "chart.js";
import { Chart } from "chart.js";
import carecall from "../carecall.png";

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
    //Members
    console.log(allData.allData);
    var MemberS = allData.allData.filter((data) => data.id === "EQA_South_B");
    var MemberK = allData.allData.filter((data) => data.id === "EQA_Kitengela");
    var MemberW = allData.allData.filter(
      (data) => data.id === "EQA_Nairobi_West_Hospital"
    );

    var SArray = Object.entries(MemberS[0].clients).map(([id, data]) => ({
      id,
      ...data,
    }));
    var KArray = Object.entries(MemberK[0].clients).map(([id, data]) => ({
      id,
      ...data,
    }));
    var WArray = Object.entries(MemberW[0].clients).map(([id, data]) => ({
      id,
      ...data,
    }));

    var a1 = SArray.concat(KArray)
    var a2 = a1.concat(WArray)
    console.log(a2)

    //blood pressure
    var dbBp = allData.allData.filter((data) => data.id === "bloodPressure");

    var bpArray = Object.entries(dbBp[0]).map(([id, data]) => ({
      id,
      ...data,
    }));

    bpArray.shift();
    console.log(bpArray);


    setBp(bpArray);

    //const realData = 

    
    bpArray.forEach((element) => {
      console.log(element.id);
      let data = [];
      let realData = a2.find((data) => data.id === element.id);
      realData ? console.log(realData) : console.log("");
      data.push(realData);
      
    }
    );

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
        bps.pressure.split("/")[1] > 60 &&
        bps.pressure.split("/")[1] < 90
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

  const handleHospital = (e) =>{
    console.log(e.target.value)

    //hospital specific
    
  }

  return (
    <div>
      <nav className="App-nav">
        <img src={carecall} alt="logo" className="App-logo" />
        <form className="App-info"></form>
      </nav>
      <div className="dashboard">
        <div>
        <h4>Bp pie chart</h4> <br />

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

        <Pie
          style={{ maxHeight: "400px", maxWidth: "350px" }}
          data={data}
          options={options}
        />
      </div>
    </div>
  );
};

export default Bpanalytics;
