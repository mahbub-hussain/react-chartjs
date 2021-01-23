import React, { useContext, useEffect, useRef } from "react";
import { TotalContext } from "../context/providers/totalStatsProvider";
import Style from "../components/chart.module.css";
import Chart from "chart.js";
import Loader from "./loader";
import "./loader.css";
const DailyTotalStats = () => {
  const { state } = useContext(TotalContext);
  const { total, error, loading, countryName } = state;
  const canvasRef2 = useRef();
  useEffect(() => {
    const canvas = canvasRef2.current.getContext("2d");
    const { newcases, newdeaths, newrecovered } = total;
    const chart = {
      type: "bar",
      data: {
        labels: ["Deaths", "Confirmed", "Recovered"],
        datasets: [
          {
            data: [newdeaths, newcases, newrecovered],
            backgroundColor: ["#FF6060", "#FFE27A", "#5CFF8A"],
            minBarLength: 20,
          },
        ],
      },

      options: {
        scales: {
          xAxes: [
            {
              ticks: {
                fontSize: 14,
                fontColor: "#858585",
              },
              gridLines: {
                lineWidth: 0,
              },
            },
          ],
        },
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: countryName + " (Today)",
          fontSize: 16,
          fontColor: "#6B857B",
        },
        responsive: true,
      },
    };
    const mychart = new Chart(canvas, chart);
    return () => mychart.destroy();
  }, [total, countryName]);
  let updateUi = "";
  if (loading) {
    updateUi = <Loader />;
  } else if (error) {
    updateUi = <div className="errorwrap">{error}</div>;
  }
  return (
    <div className={Style.dailystats}>
      {updateUi ? updateUi : <canvas ref={canvasRef2} />}
    </div>
  );
};

export default DailyTotalStats;
