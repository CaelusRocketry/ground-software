import React, { useState } from "react";
import Select from "react-dropdown-select";
import config from "./config.json";
import * as ipinput from "./components/IpInput";
import "./App.css";

import StatisticsView from "./views/StatisticsView";
import ActionsView from "./views/ActionsView";
import CountdownView from "./views/CountdownView";

import Logo from "./images/logo.png";

const App = () => {
  const [view, setView] = useState(<StatisticsView />);
//  if(ipinput.addresses.includes("127.0.0.2"))
    //alert(config["telemetry"]["GS_IP"]);
    const handleChange = (values) => {
    console.log(values);
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
  var options = [
    { label: "Statistics", value: "statistics" },
    { label: "Actions", value: "actions" },
    { label: "Countdown", value: "countdown" },
  ];
  if(!ipinput.addresses.includes(config["telemetry"]["GS_IP"]))
  {
    var options = [];
  }
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
