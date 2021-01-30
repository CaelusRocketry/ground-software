import React, { useState } from "react";
import Select from "react-dropdown-select";

import "./App.css";

import StatisticsView from "./views/StatisticsView";
import ActionsView from "./views/ActionsView";
import CountdownView from "./views/CountdownView";

import Logo from "./images/logo.png";
import caelusLogger from "./lib/caelusLogger";

const App = () => {
  const [view, setView] = useState(<StatisticsView />);

  const handleChange = (values) => {
    caelusLogger("handle-change", values, "debug");
    setView(() => {
      return values[0].value === "statistics" ? (
        <StatisticsView />
      ) : values[0].value === "actions" ? (
        <ActionsView />
      ) : (
        <CountdownView />
      );
    });
  };

  const options = [
    { label: "Statistics", value: "statistics" },
    { label: "Actions", value: "actions" },
    { label: "Countdown", value: "countdown" },
  ];
  const select = (
    <Select
      options={options}
      onChange={handleChange}
      placeholder="Statistics"
      className="mb-2"
    />
  );

  return (
    <div className="App font-sans bg-light-1 text-dark-1">
      {select}
      {view}
      <img src={Logo} id="logo" alt="Logo" />
    </div>
  );
};

export default App;
