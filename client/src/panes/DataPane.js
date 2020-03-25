import React from 'react';
import SplitPane from "react-split-pane";
import Data from "../components/Data";
import Header from "../components/Header";
import "../index.css";

const DataPane = () => (
    <div>
      <Header title="Data" />
      <div className="view">
          <Data/>
      </div>
    </div>
  );
  
  export default DataPane;
