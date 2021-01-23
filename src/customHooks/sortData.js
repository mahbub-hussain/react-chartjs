// import Chart from "chart.js";
const sortData = ({ data, cur, prvResult }) => {
  let total = {};
  let dailyDeaths = 0;
  let dailyCases = 0;
  let dailyRecovered = 0;
  const getDailyValue = (curDay, prvDay) => {
    return curDay > prvDay ? curDay - prvDay || 0 : prvDay - curDay || 0;
  };
  const totalValue = (
    deaths,
    cases,
    recovered,
    dailyDeaths,
    dailyCases,
    dailyRecovered
  ) => {
    let total = {};
    total["deaths"] = deaths;
    total["cases"] = cases;
    total["recovered"] = recovered;
    total["newdeaths"] = dailyDeaths;
    total["newcases"] = dailyCases;
    total["newrecovered"] = dailyRecovered;
    return total;
  };

  dailyDeaths = getDailyValue(data.deaths[cur], data.deaths[prvResult]);
  dailyCases = getDailyValue(data.cases[cur], data.cases[prvResult]);
  dailyRecovered = getDailyValue(
    data.recovered[cur],
    data.recovered[prvResult]
  );

  total = totalValue(
    data.deaths[cur],
    data.cases[cur],
    data.recovered[cur],
    dailyDeaths,
    dailyCases,
    dailyRecovered
  );

  return {
    total,
    dailyDeaths,
    dailyRecovered,
    dailyCases,
  };
};

export default sortData;
