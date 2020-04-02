import React from "react";
import Header from "../components/Header";
import Progress from "./../components/Progress";
import { useSelector } from 'react-redux';
import { Timeline, Event } from "../components/Timeline";

const stages = ["propellant_loading",
                "leak_testing_1",
                "pressurant_loading",
                "leak_testing_2",
                "pre_ignition",
                "disconnection"];

const names = ["Propellant Loading",
              "Leak Testing Phase 1",
              "Pressurant Loading",
              "Leak Testing Phase 2",
              "Pre-Ignition",
              "Disconnection"];

const SequencePane = () => {
  const current = useSelector(state => stages.indexOf(state.data.general.stage));
  const percentage = useSelector(state => state.data.general.percent_data);
  console.log("Percentage: " + percentage);
  const calcColor = (idx) => {
    if (current === idx) {
      return "#FFFF00"; // yellow
    }
    else if (current > idx) {
      return "#00ff00"; // green
    }
    return "#ff0000"; // red
  }; 

  const calcTitle = (idx) => {
    if (current === idx) {
      return "In Progress";
    }
    else if (current > idx) {
      return "Completed";
    }
    return "Pending";
  };

  const calcPercentage = (idx) => {
    if(current === idx){
      return percentage;
    }
    else if(current > idx){
      return 100;
    }
    return 0;
  }

  return (
    <div className="pane">
      <Header title="Sequence" />
      <Timeline>
     {names.map((name,i) => 
      <Event interval={calcTitle(i)} title={name} intervalBackground={calcColor(i)}>
        <Progress percentage={"" + calcPercentage(i)} />
      </Event>
      )}
{/*        <Event interval={calcTitle(0)} title={"Propellant Loading"} intervalBackground={calcColor(0)}>
        <Progress percentage={"" + percentage}/>
        </Event>
        <Event interval={calcTitle(1)} title={"Leak Testing Phase 1"} intervalBackground={calcColor(1)}>
          <Progress percentage={"" + percentage}/>
        </Event>
        <Event interval={calcTitle(2)} title={"Pressurant Loading"} intervalBackground={calcColor(2)}>
          <Progress percentage={"" + percentage}/>
        </Event>
        <Event interval={calcTitle(3)} title={"Leak Testing Phase 2"} intervalBackground={calcColor(3)}>
          <Progress percentage={"" + percentage}/>
        </Event>
        <Event interval={calcTitle(4)} title={"Pre-Ignition"} intervalBackground={calcColor(4)}>
          <Progress percentage={"" + percentage}/>
        </Event>
        <Event interval={calcTitle(5)} title={"Disconnection"} intervalBackground={calcColor(5)}>
          <Progress percentage={"" + percentage}/>
        </Event>
  */}
      </Timeline>
  </div>
    );
};

export default SequencePane;

