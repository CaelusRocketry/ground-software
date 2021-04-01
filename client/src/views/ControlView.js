import React from "react";
import SplitPane from "react-split-pane";

import FooterPane from "../panes/FooterPane.tsx";
import NotifPane from "../panes/NotifPane";
import PIDPane from "../panes/PIDPane";


const ControlView = () => (
  
  <><div><SplitPane className="view" split="vertical" defaultSize="23%">
    <PIDPane />
    <NotifPane/>
</SplitPane> </div>
  <FooterPane /> </>
      
);

export default ControlView;
