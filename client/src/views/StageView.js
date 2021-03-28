import React from "react";
import SplitPane from "react-split-pane";
import SequencePane from "../panes/SequencePane";

import ChecklistPane from "../panes/ChecklistPane";

const StageView = () => (
  <SplitPane className="view" split="vertical" defaultSize="50%">  
    <SequencePane />
    <ChecklistPane />
  </SplitPane>
);

export default StageView;