import React from "react";
import { useSelector } from "react-redux";
import { CaelusState } from "../store/reducers";

const TimerPane = () => {
  const countdown = useSelector(
    (state: CaelusState) => state.data.general.countdown
  );

  return (
    <div className="pane pane__timer">
      <div className="p-2 font-mono" style={{ fontSize: "5rem" }}>
        T-{countdown}
      </div>
    </div>
  );
};

export default TimerPane;
