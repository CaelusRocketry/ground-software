import React from "react";
import SplitPane from "react-split-pane";

import ButtonPane from "../panes/ButtonPane";
import MessagePane from "../panes/MessagePane";

const StageView = () => (
  <SplitPane className="view" split="vertical" defaultSize="65%">  
  </SplitPane>
);

export default StageView;
