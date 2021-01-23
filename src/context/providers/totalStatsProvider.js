import React, { createContext, useCallback, useReducer } from "react";
import axios from "axios";
import totalStatsReducer from "../reducers/totalStatsReducer";
import sortData from "../../customHooks/sortData";
export const TotalContext = createContext();

const TotalStatsProvider = (props) => {
  const [state, dispatch] = useReducer(totalStatsReducer, {
    loading: false,
    timeSeries: [],
    total: {},
    error: false,
    countryName: "",
  });

  const getHistoricData = useCallback((value) => {
    dispatch({
      type: "Loading",
    });
    axios
      .get(
        `https://corona.lmao.ninja/v2/historical/${value || "all"}?lastdays=30`
      )
      .then((res) => {
        let newData = res.data.timeline ? res.data.timeline : res.data;
        let total = {};
        let sortUpdatedata = Object.keys(newData.deaths);

        let timeSeries = [];
        sortUpdatedata.reduce(
          (prv, cur, ind) => {
            let prvResult = prv[prv.length - 1].date;
            //sorting data for chart
            let newSortedData = sortData({
              data: newData,
              cur,
              prvResult,
            });
            total = newSortedData.total;

            timeSeries.push({
              date: cur,
              deaths: newSortedData.dailyDeaths,
              cases: newSortedData.dailyCases,
              recovered: newSortedData.dailyRecovered,
            });
            return timeSeries;
          },
          [timeSeries]
        );
        let countryName = res.data.country || "Global";
        dispatch({
          type: "getCase",
          timeSeries,
          total,
          countryName,
        });
      })
      .catch((err) => {
        dispatch({
          type: "Error",
          error: "unable to fetch data",
        });
      });
  }, []);

  return (
    <TotalContext.Provider value={{ state, getHistoricData }}>
      {props.children}
    </TotalContext.Provider>
  );
};

export default TotalStatsProvider;
