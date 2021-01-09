import React from "react";
import { useSelector } from "react-redux";

const TimerPane = () => {
  const data = useSelector((state) => state.data);

  return (
    <div className="pane pane__timer">
      <div className="p-2 font-mono" style={{ fontSize: "5rem" }}>
        T-{data.general.countdown}
      </div>
    </div>
  );
};

export default TimerPane;
