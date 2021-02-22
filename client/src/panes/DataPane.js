import React from "react";
import PID from "../components/PID";
import DataBlock from "../components/DataBlock";
import Header from "../components/Header";
import "../index.css";

const DataPane = () => (
  <div>
    <Header>Data</Header>
    <div className="view">
      <PID />
      <DataBlock />
    </div>
  </div>
);

export default DataPane;
