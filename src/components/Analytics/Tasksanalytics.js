import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Tasksanalytics = (allData) => {
  const [tsArray, setTsArray] = useState([]);
  const [intArray, setIntArray] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hospital, setHospital] = useState([]);
  const [hospital1, setHospital1] = useState([]);
  const [dateM, setDateM] = useState([]);
  const [dateM1, setDateM1] = useState([]);


  useEffect(() => {
    //tasks
    var tsDb = allData.allData.filter((data) => data.id === "tasks");
    var tsArray1 = Object.entries(tsDb[0]).map(([id, data]) => ({
      id,
      ...data,
    }));
    tsArray1.shift();
    setTsArray(tsArray1);

    //Interactions
    var intDb = allData.allData.filter((data) => data.id === "Interaction");
    var intArray1 = Object.entries(intDb[0]).map(([id, data]) => ({
      id,
      ...data,
    }));
    intArray1.shift();
    setIntArray(intArray1);

    setHospital(tsArray1);
    setHospital1(intArray1);
  }, []);

  const handleStartDateChange = (date) => {
    setStartDate(date);

    // let currentDate = new Date(startDate);
    // var dates = [];
    // while (currentDate <= endDate) {
    //   dates.push(new Date(currentDate).toDateString());
    //   currentDate.setDate(currentDate.getDate() + 1);
    // }
    // var searches = hospital.filter((name) => dates.includes(name.dueDate));
    // console.log(searches);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);

    
    let currentDate = new Date(startDate);
    var dates = [];
    while (currentDate <= date) {
      dates.push(new Date(currentDate).toDateString());
      currentDate.setDate(currentDate.getDate() + 1);
    }

    //tasks
    let FilteredDates = [];
    dates.forEach((element) => {
      var searches = dateM.filter((name) =>
        new Date(name.dueDate.slice(0, 17)).toDateString().includes(element)
      );
      FilteredDates.push(searches);
    });

    let FilteredDates1 = [];
    for (let i = 0; i < FilteredDates.length; i++) {
      FilteredDates[i].forEach((element) => {
        FilteredDates1.push(element);
      });
    }
    setTsArray(FilteredDates1);

    //Interactions
    let FilteredDates2 = [];
    dates.forEach((element) => {
      var searches = dateM1.filter((name) =>
        new Date(name.dueDate.slice(0, 17)).toDateString().includes(element)
      );
      FilteredDates2.push(searches);
    });

    let FilteredDates3 = [];
    for (let i = 0; i < FilteredDates2.length; i++) {
      FilteredDates2[i].forEach((element) => {
        FilteredDates3.push(element);
      });
    }
    setIntArray(FilteredDates3);
  };

  const handleHospital = (e) => {
    //Specific facility mbrs
    var Members = allData.allData.filter((data) => data.id === e.target.value);
    var mArray = Object.entries(Members[0].clients).map(([id, data]) => ({
      id,
      ...data,
    }));

    //tasks
    let data = [];
    let data2 = [];
    mArray.forEach((element) => {
      let realData = hospital.filter((data) => data.patient === element.id);
      realData !== undefined ? data.push(realData) : (realData = null);
    });

    for (let i = 0; i < data.length; i++) {
      data[i].forEach((element) => {
        data2.push(element);
      });
    }

    setDateM(data2);
    setTsArray(data2);

    //Interactions
    let data1 = [];
    let data3 = [];
    mArray.forEach((element) => {
      let realData = hospital1.filter((data) => data.patient === element.id);

      realData !== undefined ? data1.push(realData) : (realData = null);
    });

    for (let i = 0; i < data1.length; i++) {
      data1[i].forEach((element) => {
        data3.push(element);
      });
    }
    setDateM1(data3);
    setIntArray(data3);
  };

  return (
    <div>
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
        <div>
          <p style={{fontWeight:"bold",fontSize:"33"}}>Total tasks: {tsArray.length}</p>
          <h5>
            Total tasks Completed:
            {tsArray.filter((t) => t.completed === "complete").length}
          </h5>

          <h5>
            Total tasks in progress:
            {tsArray.filter((t) => t.completed === "Inprogress").length}
          </h5>
          <h5>
            Total tasks cancelled:
            {tsArray.filter((t) => t.completed === "Cancelled").length}
          </h5>
          <h5>
            Total appointment follow ups:
            {
              tsArray.filter(
                (name) =>
                  name.task.toLowerCase().includes("appointment") &&
                  name.task.toLowerCase().includes("follow up")
              ).length
            }
          </h5>
          <h5>
            Blood pressure tasks:
            {
              tsArray.filter((name) =>
                name.task.toLowerCase().includes("blood pressure")
              ).length
            }
          </h5>
          <h5>
            Prescription tasks:
            {
              tsArray.filter((name) =>
                name.task.toLowerCase().includes("has finished")
              ).length
            }
          </h5>
          <h5>
            BMI tasks:
            {
              tsArray.filter((name) =>
                name.task.toLowerCase().includes("weight")
              ).length
            }
          </h5>
        </div>
        <div>
          <h5>
            Total interactions:
            {intArray.length}
          </h5>
          <h5>Interaction methods:</h5>
          <h5>
            Calls:{" "}
            {intArray.filter((name) => name.mode === "Phone call").length}
          </h5>
          <h5>SMS: {intArray.filter((name) => name.mode === "SMS").length}</h5>
          <h5>
            WhatsApp:{" "}
            {intArray.filter((name) => name.mode === "WhatsApp").length}
          </h5>
          <h5>
            Email: {intArray.filter((name) => name.mode === "Email").length}
          </h5>
          <h5>Health Navigator:</h5>
          <h5>
            abnermauti20@gmail.com:{" "}
            {
              intArray.filter((name) => name.Hc === "abnermauti20@gmail.com")
                .length
            }
          </h5>
          <h5>
            ebemokamba@gmail.com:{" "}
            {
              intArray.filter((name) => name.Hc === "ebemokamba@gmail.com")
                .length
            }
          </h5>
          <h5>
            irenewanza91@gmail.com:{" "}
            {
              intArray.filter((name) => name.Hc === "irenewanza91@gmail.com")
                .length
            }
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Tasksanalytics;
