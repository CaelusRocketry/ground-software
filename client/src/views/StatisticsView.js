import React from 'react';
import SplitPane from 'react-split-pane';

import SequencePane from '../panes/SequencePane';
import GraphPane from '../panes/GraphPane'

const StatisticsView = () => (
    <SplitPane className="view" split="vertical" defaultSize="40%">
        <SequencePane />
        <GraphPane />
    </SplitPane>

);

export default StatisticsView;

