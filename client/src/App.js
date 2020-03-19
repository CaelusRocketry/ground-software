import React from "react";

import "./App.css";

import StatisticsView from "./views/StatisticsView";
import ActionsView from "./views/ActionsView";

let selected_view = "statistics";
function App() {
  return (
    <div className="App font-sans bg-light-1 text-dark-1">
      <select onChange={event => (selected_view = event.target.value)}>
        <option value="statistics">Statistics</option>
        <option value="actions">Actions</option>
      </select>
      {selected_view === "statistics" ? <StatisticsView /> : <ActionsView />}
    </div>
  );
}

export default App;
