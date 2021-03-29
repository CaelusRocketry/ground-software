import React from "react";

import FooterPane from "../panes/FooterPane.tsx";
import ButtonPane from "../panes/ButtonPane.tsx";


const ButtonsView = () => (
  <><SplitPane className="view" split="vertical" defaultSize="50%">  
    //Notifications Bar (BlockHeader??)
    //From array of valves, create "button bar"
      //OPEN/CLOSE/PRIORITY DROPDOWN -> onClickedActuateValve(valveLocation?: string, valveType?: string, actuationType?: string, actuationPriority?: string)
      //Pulse??
      //Reset -> onClickedActuateValve(whatever valve type is)
    //Abort Bar (onClickedSoftAbort("soft"))
)
  </SplitPane>
  <FooterPane /></>

  //Define Buttons
      
);

export default ControlView;
