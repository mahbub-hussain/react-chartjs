import React, { useContext, useEffect, useRef } from "react";
import { TotalContext } from "../context/providers/totalStatsProvider";
import Style from "../components/chart.module.css";
import Chart from "chart.js";
import Loader from "./loader";
import "./loader.css";
const TimeSeries = () => {
  const { state, getHistoricData } = useContext(TotalContext);
  const { timeSeries, loading, error, countryName } = state;
  useEffect(() => {
    getHistoricData();
  }, [getHistoricData]);

  const canvasRef3 = useRef();
  useEffect(() => {
    const canvas = canvasRef3.current.getContext("2d");
    const chart = {
      type: "line",
      data: {
        datasets: [
          {
            label: "Deaths",
            data: timeSeries.map((item) => {
              return {
                t: new Date(item.date).getTime(),
                y: item.deaths,
              };
            }),
            backgroundColor: "#ff000040",
            borderColor: "#CC3B27",
            pointRadius: 0,
            lineTension: 0,
            borderWidth: 1,
          },

          {
            label: "Recovered",
            data: timeSeries.map((item) => {
              return {
                t: new Date(item.date).getTime(),
                y: item.recovered,
              };
            }),
            backgroundColor: "#27ff002a",
            borderColor: "#12CC71",
            pointRadius: 0,
            lineTension: 0,
            borderWidth: 1,
          },
          {
            label: "Confirmed",
            data: timeSeries.map((item) => {
              return {
                t: new Date(item.date).getTime(),
                y: item.cases,
              };
            }),
            backgroundColor: "#ffe00020",
            borderColor: "#CCB93B",
            pointRadius: 0,
            lineTension: 0,
            borderWidth: 1,
          },
        ],
      },

      options: {
        responsive: true,

        animation: {
          duration: 1000,
        },
        title: {
          display: true,
          text: countryName + " (TimeSeries)",
          fontSize: 16,
        },
        legend: {
          display: true,
          position: "bottom",
        },
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                unit: "day",
              },
              offset: false,
              distribution: "series",
              gridLines: {
                lineWidth: 0,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                drawBorder: true,
              },
              scaleLabel: {
                display: true,
                labelString: "Last 30 Days ",
              },
            },
          ],
        },
        tooltips: {
          intersect: false,
          mode: "index",
        },
      },
    };

    let myChart = new Chart(canvas, chart);
    return () => myChart.destroy();
  }, [timeSeries, countryName]);

  let updateUi = "";
  if (loading) {
    updateUi = <Loader />;
  } else if (error) {
    updateUi = <div className="errorwrap">{error}</div>;
  }

  return (
    <div className={Style.timeserise}>
      {updateUi ? (
        updateUi
      ) : (
        <canvas
          ref={canvasRef3}
          style={{ width: "100%", minHeight: "500px" }}
        />
      )}
    </div>
  );
};

export default TimeSeries;
