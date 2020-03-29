import React from "react";
import SplitPane from "react-split-pane";
import SequencePane from "../panes/SequencePane";
import GraphPane from "../panes/GraphPane";
import DataPane from "../panes/DataPane";
import Clock from "../components/Clock";

const StatisticsView = () => (
  <SplitPane className="view" split="vertical" defaultSize="23%">
    <SequencePane />
    <SplitPane className="view2" split="vertical" defaultSize="33%">
      <DataPane />
      <GraphPane />
    </SplitPane>
  </SplitPane>
);

export default StatisticsView;
