import React from "react";
import SplitPane from "react-split-pane";
import SequencePane from "../panes/SequencePane";
import GraphPane from "../panes/GraphPane";
import DataPane from "../panes/DataPane";
import Clock from "../components/Clock";

const StatisticsView = () => (
  <SplitPane className="view" split="vertical" defaultSize="20%">
    <SequencePane />
    <SplitPane className="view2" split="vertical" defaultSize="33%">
      <SplitPane className="view3" split="horizontal" defaultSize="40%">
        <Clock />
        <DataPane />
      </SplitPane>
      <GraphPane />
    </SplitPane>
  </SplitPane>
);

export default StatisticsView;
