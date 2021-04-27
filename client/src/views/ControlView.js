import React from "react";
import SplitPane from "react-split-pane";

import FooterPane from "../panes/FooterPane.tsx";
import PIDPane from "../panes/PIDPane";


const ControlView = () => (
  
  <><div><SplitPane className="view" split="vertical" defaultSize="23%">
    <PIDPane />
</SplitPane> </div>
  <FooterPane /> </>
      
);

export default ControlView;
