import React from "react";
import SplitPane from "react-split-pane";

import ButtonPane from "../panes/ButtonPane";
import SequencePane from "../panes/SequencePane";
import FooterPane from "../panes/FooterPane";

import ChecklistPane from "../panes/ChecklistPane";

const StageView = () => (
  <><SplitPane className="view" split="vertical" defaultSize="50%">  
    <SequencePane />
    <ChecklistPane />
  </SplitPane>
  <FooterPane /></>
);

export default StageView;
