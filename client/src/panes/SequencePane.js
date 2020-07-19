import React from "react";
import Header from "../components/Header";
import Progress from "./../components/Progress";
import { useSelector } from 'react-redux';
import { Timeline, Event } from "../components/Timeline";
import config from '../config.json';

const stages = config["stages"]["list"]

const names = {"propellant_loading": "Propellant Loading",
              "leak_testing_1": "Leak Testing Phase 1",
              "pressurant_loading": "Pressurant Loading",
              "leak_testing_2": "Leak Testing Phase 2",
              "pre_ignition": "Pre-Ignition",
              "disconnection": "Disconnection"};
              

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
      if(percentage === 100){
        return "Ready for next stage"
      }
      else{
        return "In Progress";
      }
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
     {stages.map((stage,i) => 
      <Event interval={calcTitle(i)} title={names[stage]} intervalBackground={calcColor(i)}>
        <Progress percentage={"" + calcPercentage(i)} />
      </Event>
      )}
      </Timeline>
  </div>
    );
};

export default SequencePane;

