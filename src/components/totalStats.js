import React, { useContext, useEffect, useRef } from "react";
import Chart from "chart.js";
import { TotalContext } from "../context/providers/totalStatsProvider";
import Style from "../components/chart.module.css";
import Loader from "./loader";
import "./loader.css";
const TotalStats = () => {
  const { state } = useContext(TotalContext);
  const { total, loading, error, countryName } = state;
  const canvasRef = useRef();
  useEffect(() => {
    const canvas = canvasRef.current.getContext("2d");
    const { cases, deaths, recovered } = total;
    const chart = {
      type: "pie",
      data: {
        labels: ["Deaths", "Confirmed", "Recovered"],
        datasets: [
          {
            data: [deaths, cases, recovered],
            borderWidth: 0,
            backgroundColor: ["#FF6060", "#FFE27A", "#5CFF8A"],
            weight: 3,
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: countryName + " (Total)",
          fontColor: " #D1D1D1",
          fontSize: 16,
        },
        legend: {
          display: true,
          position: "bottom",
          labels: {
            fontColor: "#D1D1D1",
            fontSize: 14,
          },
        },

        rotation: -0.4 * Math.PI,
        responsive: true,
      },
    };
    let mychart = new Chart(canvas, chart);

    return () => mychart.destroy();
  }, [total, countryName]);
  let updateUi = "";
  if (loading) {
    updateUi = <Loader />;
  } else if (error) {
    updateUi = <div className="errorwrap">{error}</div>;
  }
  return (
    <div className={Style.totalstats}>
      {updateUi ? updateUi : <canvas ref={canvasRef} />}
    </div>
  );
};

export default TotalStats;
