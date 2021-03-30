import React from "react";
import SplitPane from "react-split-pane";
import SequencePane from "../panes/SequencePane";
import GraphPane from "../panes/GraphPane";
import DataPane from "../panes/DataPane";
import FooterPane from "../panes/FooterPane.tsx";

const StatisticsView = () => (
  <><SplitPane className="view" split="vertical" defaultSize="23%">
    <SequencePane />
    <SplitPane className="view2" split="vertical" defaultSize="33%">
      <DataPane />
      <GraphPane />
    </SplitPane>
  </SplitPane>
  <FooterPane /></>
);

export default StatisticsView;
