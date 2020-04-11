import React, { useState } from "react";
import Select from "react-dropdown-select";

import "./App.css";

import StatisticsView from "./views/StatisticsView";
import ActionsView from "./views/ActionsView";


const App = () => {
  const [view, setView] = useState(<StatisticsView />);

  const handleChange = (values) => {
    console.log(values);
    setView(() => {
      return values[0].value === "statistics" ? <StatisticsView /> : <ActionsView />
    });
  };

  const options = [{label: "Statistics", value: "statistics"}, {label: "Actions", value: "actions"}]
  const select = <Select options={options} onChange={handleChange} placeholder="Statistics" />;

  return (
    <div className="App font-sans bg-light-1 text-dark-1">
      {select}
      {view}
    </div> 
  );
}

export default App;
