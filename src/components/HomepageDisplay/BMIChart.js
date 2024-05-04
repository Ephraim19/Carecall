import React, { useEffect } from "react";
import { CChart } from "@coreui/react-chartjs";
import "@coreui/coreui/dist/css/coreui.min.css";
// import {getStyle} from "@coreui/coreui/dist/js/coreui-utilities";
const BMIChart = (bmiDisplay1) => {
  useEffect(() => {
    console.log(bmiDisplay1.bmiDisplay1);
  },[]);

  return (
    <div>
      <CChart
        type="line"
        data={{
          labels: bmiDisplay1.bmiDisplay1.map((b) => b.dueDate.slice(0, 17)),
          datasets: [
            {
              label: "BMI",
              backgroundColor: "transparent",
              borderColor: "#0090af",
              pointBackgroundColor: "rgba(220, 220, 220, 1)",
              pointBorderColor: "#fff",
              data: bmiDisplay1.bmiDisplay1.map((b) =>
                (parseInt(b.weight) / parseInt(b.height ^ 2)).toFixed(0)
              ),
            },
            // {
            //   label: "Diastolic",
            //   backgroundColor: "rgba(151, 187, 205, 0.2)",
            //   borderColor: "rgba(151, 187, 205, 1)",
            //   pointBackgroundColor: "rgba(151, 187, 205, 1)",
            //   pointBorderColor: "#fff",
            //   data: [50, 12, 28, 29, 7, 25, 12, 70, 60],
            // },
          ],
        }}
        options={{
          plugins: {
            legend: {
              labels: {
                color: '#060074',
              },
            },
          },
          scales: {
            x: {
              grid: {
                color: "#404040",
              },
              ticks: {
                color: "#404040",
              },
            },
            y: {
              grid: {
                color: "#404040",
              },
              ticks: {
                color: "#404040",
              },
            },
          },
        }}
      />
    </div>
  );
};

export default BMIChart;
