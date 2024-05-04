import React from "react";
import { CChart } from "@coreui/react-chartjs";

const BloodPressureGraph = (bpDisplay) => {
  return (
    <div>
      <CChart
        type="line"
        data={{
          labels: bpDisplay.bpDisplay.map((b) => b.dueDate.slice(0, 17)),
          datasets: [
            {
              label: "Systolic",
              backgroundColor: "transparent",
              borderColor: "#0090af",
              pointBackgroundColor: "rgba(220, 220, 220, 1)",
              pointBorderColor: "#fff",
              data: bpDisplay.bpDisplay.map((b) => b.pressure.split("/")[0]),
            },
            {
              label: "Diastolic",
              backgroundColor: "rgba(151, 187, 205, 0.2)",
              borderColor: "rgba(151, 187, 205, 1)",
              pointBackgroundColor: "rgba(151, 187, 205, 1)",
              pointBorderColor: "#fff",
              data: bpDisplay.bpDisplay.map((b) => b.pressure.split("/")[1]),
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
      <CChart
        type="line"
        data={{
          labels: bpDisplay.bpDisplay.map((b) => b.dueDate.slice(0, 17)),
          datasets: [
            {
              label: "Pulse",
              backgroundColor: "transparent",
              borderColor: "#0090af",
              pointBackgroundColor: "rgba(220, 220, 220, 1)",
              pointBorderColor: "#fff",
              data: bpDisplay.bpDisplay.map((b) => b.pulse),
            },
            // {
            //   label: "Diastolic",
            //   backgroundColor: "rgba(151, 187, 205, 0.2)",
            //   borderColor: "rgba(151, 187, 205, 1)",
            //   pointBackgroundColor: "rgba(151, 187, 205, 1)",
            //   pointBorderColor: "#fff",
            //   data: bpDisplay.bpDisplay.map((b) => b.pressure.split("/")[1]),
            // },
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

export default BloodPressureGraph;
