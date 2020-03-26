import React, { useState } from "react";
import Header from "../components/Header";
import { useDispatch } from 'react-redux';
import { generalPressed, abortPressed, requestPressed, actuatePressed } from '../store/actions/index.js';


const ButtonPane = () => {
  const dispatch = useDispatch();
  const sensors = {thermocouple: ["chamber", "tank"], pressure: ["chamber", "injector", "tank"], load: ["tank"]};
  const valves = ["Main Propellant Valve", "Pressure Relief Valve", "Propellant Vent Valve"];

  const [abortView, setAbortView] = useState(false);
  const [valveView, setValveView] = useState(false);
  
  const soft_abort = () => {
    if (window.confirm("Are you sure you want to soft abort?")) {
      dispatch(abortPressed({type: "soft", pressed: true}));
      console.log("Soft abort completed");
    }
    else {
      console.log("Soft abort aborted");
    }
  }
  
  const hard_abort = () => {
    if (window.confirm("Are you sure you want to hard abort?")) {
      dispatch(abortPressed({type: "hard", pressed: true}));
      console.log("Hard abort completed");
    }
    else {
      console.log("Hard abort aborted");
    }
  }
  
  const override = () => {
    //confirmation("Are you sure you want to override?");
    dispatch(abortPressed({type: "hard", pressed: true}));
  }
  
  const solenoid_actuation = () => {
    alert("Add functionality")
  }
    
  const sensor_data_request = () => {
    alert("Add functionality")
  }
  
  const valve_state_request = () => {
    alert("Add functionality")
  }
  
  const progress = () => {
    // If the pi isn't 100% ready to progress to next stage, mention that here. Otherwise, progress.
    alert("Add functionality")
  }

  let btn_big = "mt-2 col-md-12 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded";
  let btn_small = "ml-6 mt-2 col-md-12 bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded";
  let next_stage = "Propellant loading";




  return (
  <div className="pane">
    <Header title="GS To Flight"/>

    <div><button onClick={() => setAbortView(!abortView)} class={btn_big}>Abort</button></div>
    <div id='abortOpts' class={abortView ? "block" : "hidden"}>
      <div><button class={btn_small} onClick={soft_abort}>Soft Abort</button></div>
      <div><button class={btn_small} onClick={hard_abort}>Hard Abort</button></div>
    </div>

    <button onClick={() => setValveView(!valveView)} class={btn_big}>Valve Actuation</button>
    <div id='valveOpts' class={valveView ? "block" : "hidden"}>
      <div>Main Propellant Valve:<button class={btn_small} onClick={solenoid_actuation}>Actuate Solenoid Valve</button></div>
      <div>Pressure Relief Valve:<button class={btn_small} onClick={solenoid_actuation}>Actuate Solenoid Valve</button></div>
      <div>Propellant Vent Valve:<button class={btn_small} onClick={solenoid_actuation}>Actuate Solenoid Valve</button></div>
    </div>

    <div><button onClick={sensor_data_request} class={btn_big}>Sensor Data Request</button></div>
    <div><button onClick={valve_state_request} class={btn_big}>Valve State Request</button></div>
    <div><button onClick={progress} class={btn_big}>Progress To {next_stage}</button></div>
  </div>
  );
}


export default ButtonPane;
