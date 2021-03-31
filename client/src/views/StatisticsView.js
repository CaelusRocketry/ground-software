import React from "react";
import SplitPane from "react-split-pane";
import SequencePane from "../panes/SequencePane";
import GraphPane from "../panes/GraphPane";
import DataPane from "../panes/DataPane";
<<<<<<< HEAD
import FooterPane from "../panes/FooterPane"
=======
import FooterPane from "../panes/FooterPane.tsx";
>>>>>>> 685081eb3f8ecdc253fec11eae4faef3eca0c373

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
