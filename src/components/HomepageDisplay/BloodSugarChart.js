import React from "react";
import { CChart } from "@coreui/react-chartjs";

const BloodSugarChart = (sugarDisplay) => {
  return (
    <div>
      <CChart
        type="line"
        data={{
          labels: sugarDisplay.sugarDisplay.map((b) => b.dueDate.slice(0, 17)),
          datasets: [
            {
              label: "Random",
              backgroundColor: "transparent",
              borderColor: "#0090af",
              pointBackgroundColor: "rgba(220, 220, 220, 1)",
              pointBorderColor: "#fff",
              data: sugarDisplay.sugarDisplay.map((b) => b.random),
            },
            {
              label: "Fasting",
              backgroundColor: "rgba(151, 187, 205, 0.2)",
              borderColor: "rgba(151, 187, 205, 1)",
              pointBackgroundColor: "rgba(151, 187, 205, 1)",
              pointBorderColor: "#fff",
              data: sugarDisplay.sugarDisplay.map((b) => b.fasting),
            },
            {
              label: "HBA1C",
              backgroundColor: "transparent",
              borderColor: "#3a02b1",
              pointBackgroundColor: "rgba(151, 187, 205, 1)",
              pointBorderColor: "#fff",
              data: sugarDisplay.sugarDisplay.map((b) => b.HBA1C),
            },
          ],
        }}
        options={{
          plugins: {
            legend: {
              labels: {
                color: "#060074",
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

export default BloodSugarChart;
