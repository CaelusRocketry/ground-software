import React from "react";
import Data from "../components/Data";
import Header from "../components/Header";
import "../index.css";

const DataPane = () => (
  <div>
    <Header>Data</Header>
    <div className="view">
      <Data />
    </div>
  </div>
);

export default DataPane;
