import React from "react";
import SplitPane from "react-split-pane";

import ButtonPane from "../panes/ButtonPane";
import MessagePane from "../panes/MessagePane";

const ActionsView = () => (
  <SplitPane className="view" split="vertical" defaultSize="55%">
    <ButtonPane />
    <MessagePane />
  </SplitPane>
);

export default ActionsView;
