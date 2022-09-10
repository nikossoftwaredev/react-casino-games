import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import {
  allBets,
  depositAmount,
  withdrawalsAmount,
} from "../utils/convertData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: "y" as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right" as const,
    },
    title: {
      display: true,
      text: "Bets",
    },
  },
};

const labels = Object.keys(allBets);

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: Object.keys(allBets).map((key) => allBets[key].profit),
      borderColor: "black",
      backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    },
  ],
};

const BarChart = () => {
  return (
    <div>
      <p>Deposits: {depositAmount}</p>
      <p>Withdrawals: {withdrawalsAmount}</p>
      <p>Total Profit: {withdrawalsAmount - depositAmount}</p>
      <p>Months of work: {(withdrawalsAmount - depositAmount) / -1630}</p>
      <Bar options={options} data={data} />
    </div>
  );
};

export default BarChart;
