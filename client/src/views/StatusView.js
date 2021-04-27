import React from "react";
import SplitPane from "react-split-pane";
import DataPane from "../panes/DataPane";

import FooterPane from "../panes/FooterPane.tsx";
import GraphPane from "../panes/GraphPane";
import MessagePane from "../panes/MessagePane";


const StatusView = () => (
  <>
  <FooterPane />
    <SplitPane className="view" split="vertical" defaultSize="23%">
      <DataPane />
      <SplitPane className="view2" split="vertical" defaultSize="60%">
        <GraphPane />
        <MessagePane />
      </SplitPane>
    </SplitPane>
    <FooterPane /> 
  </>

      
);

export default StatusView;
