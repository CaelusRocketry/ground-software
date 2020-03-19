import React from 'react';
import SplitPane from 'react-split-pane';

import ButtonPane from '../panes/ButtonPane';

const ActionsView = () => (
    <SplitPane className="view" split="vertical" defaultSize="55%">
        <ButtonPane />
    </SplitPane>

);

export default ActionsView;

