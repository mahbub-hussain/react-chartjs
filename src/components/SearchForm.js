import React, { useState, useContext } from "react";
import { TotalContext } from "../context/providers/totalStatsProvider";
import logo from "../logo.png";
import "./searchbar.css";
const SearchForm = () => {
  const { getHistoricData } = useContext(TotalContext);
  const [value, setValue] = useState("");
  const handleInputChange = (e) => {
    const value = e.target.value;
    setValue(value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    getHistoricData(value);
  };

  return (
    <div className="searchbar">
      <div className="searchform">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type Your Country Name"
            onChange={(e) => handleInputChange(e)}
            value={value}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="logowrap">
        <img className="logo" src={logo} alt="covid19" />
        <h2>Covid 19 Report</h2>
      </div>
    </div>
  );
};

export default SearchForm;
