import React from "react";
import SplitPane from "react-split-pane";

import ButtonPane from "../panes/ButtonPane";
import FooterPane from "../panes/FooterPane.tsx";
import MessagePane from "../panes/MessagePane";

const ActionsView = () => (
  <><SplitPane className="view" split="vertical" defaultSize="65%">
    <ButtonPane />
    <MessagePane />
  </SplitPane>
  <FooterPane /></>
);

export default ActionsView;
