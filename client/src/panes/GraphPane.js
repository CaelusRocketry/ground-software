import React from "react";
import SplitPane from "react-split-pane";

import Header from "../components/Header";
import Graph from "../components/Graph";

import "../index.css";

// used https://openclassrooms.com/en/courses/4286486-build-web-apps-with-reactjs/4286711-build-a-ticking-clock-component
//blog.cloudboost.io/for-loops-in-react-render-no-you-didnt-6c9f4aa73778

const GraphPane = () => (
  <div>
    <Header title="Graphs" />
    <div className="h-full border-2">
      <SplitPane className="view" split="horizontal" size="50%">
        <Graph type="temperature" />
        <Graph type="pressure" />
      </SplitPane>
    </div>
  </div>
);

export default GraphPane;
