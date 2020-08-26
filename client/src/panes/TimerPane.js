import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";

function TimerPane() {
    const [seconds, setSeconds] = React.useState(10);
    const data = useSelector((state) => (state.data));  

    if (data.general.stage == "autosequence") {
      if (seconds > 0) {
        setTimeout(() => setSeconds(seconds - 1), 1000);
      }
    }
  
    return (
      <div className="app">
        <div className="time">
          {"T-" + seconds}
        </div>
      </div>
    );
  }
export default TimerPane;
  