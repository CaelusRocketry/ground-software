import React from 'react';
import SplitPane from 'react-split-pane';

import SequencePane from '../panes/SequencePane';

const StatisticsView = () => (
    <SplitPane split="vertical" defaultSize="33%">
        <SequencePane />
    </SplitPane>
);

export default StatisticsView;
