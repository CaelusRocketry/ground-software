import React from "react";
import Timer from "react-compound-timer";
import Header from "../components/Header";
import Progress from "./../components/Progress";
import { useDispatch, useSelector } from 'react-redux';
import { currentStage } from "./../store/actions/index";
import { Timeline, Event } from "../components/Timeline";
import { data } from "./../store/reducers/stats";

const SequencePane = () => {
  const dispatch = useDispatch();
  const current = useSelector(state => state.stage);
  const percentage_pressure = useSelector(state => state.data.general.percent_data);
  const calcColor = (num) => {
    if (current === num) {
      return "#FFFF00"; // yellow
    }
    else if (current > num) {
      return "#00ff00"; // green
    }
    else {
      return "#ff0000"; // red
    }
  }; 

  const calcTitle = (num) => {
    if (current === num) {
      return "In Progress";
    }
    else if (current > num) {
      return "Completed";
    }
    else {
      return "Pending";
    }
  }; 

  return (
    <div className="pane">
      <Header title="Sequence" />
      <Timeline>
        <Event interval={ calcTitle(0)} title={"Propellant Loading"} intervalBackground={calcColor(0)}>
          <p1>Propellant loaded?  </p1>
          <button onClick={() => dispatch(currentStage())}>Finished</button>
        </Event>
        <Event interval={calcTitle(1)} title={"Leak Testing Phase 1"} intervalBackground={calcColor(1)}>
          <p1>Time left:  </p1>
          <Timer initialTime={600000} direction="backward" startImmediately={false} checkpoints={[{ time: 0, callback: () => dispatch(currentStage())}]}>
            { ( { start, getTime } ) => (
              <React.Fragment>
                <Timer.Minutes /> minutes
                <Timer.Seconds /> seconds
                <button onClick={start}>Start Timer</button>
                <Progress percentage={"" + ((600000 - getTime())/ 600000)*100}/>               
              </React.Fragment>
            ) }
          </Timer>
        </Event>
        <Event interval={calcTitle(2)} title={"Pressurant Loading"} intervalBackground={calcColor(2)}>
          <Progress percentage={"" + percentage_pressure*100}/>
          <button onClick={() => dispatch(currentStage())}>Finished</button>
        </Event>
        <Event interval={calcTitle(3)} title={"Leak Testing Phase 2"} intervalBackground={calcColor(3)}>
        <p1>Time left:  </p1>
          <Timer initialTime={1800000} direction="backward" startImmediately={false} checkpoints={[{ time: 0, callback: () => dispatch(currentStage())}]}  >
            { ( { start, getTime } ) => (
              <React.Fragment>
                <Timer.Minutes /> minutes
                <Timer.Seconds /> seconds
                <Progress percentage={((1800000 - getTime())/ 1800000)*100}/>
                <button onClick={start}>Start Timer</button>
              </React.Fragment>
            ) }
          </Timer>
        </Event>
        <Event interval={calcTitle(4)} title={"Pre-Ignition"} intervalBackground={calcColor(4)}>
          <Progress percentage={(current > 4) ? "100" : "0"}/>
          <button onClick={() => dispatch(currentStage())}>Finished</button>
        </Event>
        <Event interval={calcTitle(5)} title={"Disconnection"} intervalBackground={calcColor(5)}>
          <Progress percentage={(current > 5) ? "100" : "0"}/>
          <button onClick={() => dispatch(currentStage())}>Finished</button>
        </Event>
      </Timeline>
    </div>
    );
};

export default SequencePane;

