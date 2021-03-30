import React from "react";
import PID from "../components/PID";

import Header from "../components/Header";
import "../index.css";

const PIDPane = () => (
  <div>
    <Header>P&Id Diagram</Header>
    <div className="view">
      <PID />
    </div>
  </div>
);

export default PIDPane;
