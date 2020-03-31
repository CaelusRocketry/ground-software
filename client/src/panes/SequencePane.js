import React from "react";
import Timer from "react-compound-timer";
import Header from "../components/Header";
import Progress from "./../components/Progress";
import { useDispatch, useSelector } from 'react-redux';
import { currentStage } from "./../store/actions/index";
import { Timeline, Event } from "../components/Timeline";

const SequencePane = () => {
  const dispatch = useDispatch();
  const current = useSelector(state => state.stages);
  const final_pressure = 800; // psi
  const current_pressure = 600; // random value
  return (
    <div className="pane">
      <Header title="Sequence" />
      <Timeline>
        <Event interval={ (current > 0) ? "Completed" : "Pending"} title={"Propellant Loading"} intervalBackground={(current > 0) ? "#00ff00" : "#ff0000"}>
          <p1>Propellant loaded?  </p1>
          <button onClick={() => dispatch(currentStage())}>Finished</button>
        </Event>
        <Event interval={(current > 1) ? "Completed" : "Pending"} title={"Leak Testing Phase 1"} intervalBackground={(current > 1) ? "#00ff00" : "#ff0000"}>
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
        <Event interval={(current > 2) ? "Completed" : "Pending"} title={"Pressurant Loading"} intervalBackground={(current > 2) ? "#00ff00" : "#ff0000"}>
          <p1>Current Pressure: {current_pressure} psi</p1>
          <Progress percentage={"" + (current_pressure/final_pressure)*100}/>
          <button onClick={() => dispatch(currentStage())}>Finished</button>
        </Event>
        <Event interval={(current > 3) ? "Completed" : "Pending"} title={"Leak Testing Phase 2"} intervalBackground={(current > 3) ? "#00ff00" : "#ff0000"}>
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
        <Event interval={(current > 4) ? "Completed" : "Pending"} title={"Pre-Ignition"} intervalBackground={(current > 4) ? "#00ff00" : "#ff0000"}>
          <Progress percentage={(current > 4) ? "100" : "0"}/>
        </Event>
        <Event interval={(current > 5) ? "Completed" : "Pending"} title={"Disconnection"} intervalBackground={(current > 5) ? "#00ff00" : "#ff0000"}>
          <Progress percentage={(current > 5) ? "100" : "0"}/>
        </Event>
      </Timeline>
    </div>
    );
};

export default SequencePane;

