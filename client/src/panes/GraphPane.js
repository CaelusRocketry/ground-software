import React from "react";
import Graph from "../components/Graph.js";
import "../index.css";

// used https://openclassrooms.com/en/courses/4286486-build-web-apps-with-reactjs/4286711-build-a-ticking-clock-component
//blog.cloudboost.io/for-loops-in-react-render-no-you-didnt-6c9f4aa73778

const GraphPane = () => (
  <div className="pane">
    <Graph dataType="temperature"></Graph>
  </div>
);

export default GraphPane;
