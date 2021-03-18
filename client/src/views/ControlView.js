import React from "react";
import SplitPane from "react-split-pane";

import ButtonPane from "../panes/ButtonPane";
import MessagePane from "../panes/MessagePane";

const ControlView = () => (
  <SplitPane className="view" split="vertical" defaultSize="65%">  
    <ButtonPane />
    <MessagePane />
  </SplitPane>
);

export default ControlView;
