import React from 'react';

import { Timeline, Event } from '../components/Timeline';
import Header from '../components/Header';

const SequencePane = () => (
    <div className="pane">
        <Header title="Sequence" />
        <Timeline>
            <Event interval="Pending" title={<h1 className="text-xl">Title</h1>}>
                This is an event.
            </Event>
            <Event interval="Pending" title={<h1 className="text-xl">Title</h1>}>
                This is an event.
            </Event>
        </Timeline>
    </div>
);

export default SequencePane;
