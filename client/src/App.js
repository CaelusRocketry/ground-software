import React from 'react';

import './App.css';

import StatisticsView from './views/StatisticsView';
import ActionsView from './views/ActionsView'

function App() {
    return (
        <div className="App font-sans bg-light-1 text-dark-1">
            {/* <StatisticsView /> */}
            <ActionsView />
        </div>
    );
}

export default App;
