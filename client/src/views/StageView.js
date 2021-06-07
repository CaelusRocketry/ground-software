import React from "react";
import SplitPane from "react-split-pane";

import SequencePane from "../panes/SequencePane";

import ChecklistPane from "../panes/ChecklistPane";
import FooterPane from "../panes/FooterPane";
import StageProgressPane from "../panes/StageProgressPane";

const StageView = () => (
  <SplitPane className="view" split="vertical" defaultSize="50%">  
    <SequencePane />
    <SplitPane className="view" split="horizontal" defaultSize="57%">
      <ChecklistPane />
      <StageProgressPane />
    </SplitPane>
  </SplitPane>
);

export default StageView;
