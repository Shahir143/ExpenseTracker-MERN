import React from "react";
import {
  chart as ChartJs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugin: {
    legend: {
      position: "top",
    },
    title: {
      display: "true",
      text: "some dummy text",
    },
  },
  scales: {
    x: {
      beginAtZero: true,
    },
    y: {
      beginAtZero: true,
    },
  },
};

const data = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Present 1",
      data: [11, 22, 33, 44, 55, 66, 77, 88, 99, 120, 22, 33],
      backgroundColor: "#e8e8e8",
      barThickness: 10,
    },
    {
      label: "Present 2",
      data: [11, 22, 33, 44, 55, 66, 77, 88, 99, 11, 22, 33],
      backgroundColor: "#439D91",
      barThickness: 10,
    },
  ],
};
export const chart = () => {
  return (
    <div className="chart-container">
      <Bar options={options} data={data} />
    </div>
  );
};
