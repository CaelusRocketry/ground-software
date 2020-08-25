import React, { useState, useEffect } from 'react';

function TimerPane() {
    const [seconds, setSeconds] = React.useState(10);
  
    React.useEffect(() => {
      if (seconds > 0) {
        setTimeout(() => setSeconds(seconds - 1), 1000);
      } else {
        setSeconds('0');
      }
    });
  
    return (
      <div className="app">
        <div className="time">
          {"T-" + seconds}
        </div>
      </div>
    );
  }
export default TimerPane;
  