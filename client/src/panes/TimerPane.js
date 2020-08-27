import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";

function TimerPane() {
    const data = useSelector((state) => (state.data));  

    return (
      <div className="app">
        <div className="time">
          {"T-" + data.general.countdown}
        </div>
      </div>
    );
  }
export default TimerPane;
  