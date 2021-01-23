import React from "react";
import TotalStats from "../src/components/totalStats";
import TotalStatsProvider from "./context/providers/totalStatsProvider";
import DailyTotalStats from "../src/components/dailyTotalStats";
import SearchForm from "../src/components/SearchForm";
import "./App.css";
import TimeSeries from "./components/timeSeries";
const App = () => {
  return (
    <div className="App">
      <TotalStatsProvider>
        <SearchForm />
        <div className="stats">
          <DailyTotalStats />
          <TotalStats />
        </div>
        <div className="timeserise">
          <TimeSeries />
        </div>
      </TotalStatsProvider>
    </div>
  );
};

export default App;
