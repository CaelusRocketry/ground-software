import React from "react";
import ButtonBarPane from "../panes/ButtonBarPane";
import SplitPane from "react-split-pane";

import FooterPane from "../panes/FooterPane.tsx";
import PIDPane from "../panes/PIDPane";


const ControlView = () => (
  
  <><div><SplitPane className="view" split="vertical" defaultSize="23%">
    <PIDPane />
    <ButtonBarPane />
</SplitPane> </div>
  <FooterPane /> </>
      
);

export default ControlView;
