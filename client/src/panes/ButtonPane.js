import React, { useState } from "react";
import Header from "../components/Header";
import { useDispatch } from 'react-redux';
import { generalPressed, abortPressed, requestPressed, actuatePressed } from '../store/actions/index.js';


const ButtonPane = () => {
  const dispatch = useDispatch();
  const sensors = {thermocouple: ["chamber", "tank"], pressure: ["chamber", "injector", "tank"], load: ["tank"]};
  const btn_big = "mt-2 col-md-12 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded";
  const btn_small = "ml-6 mt-2 col-md-12 bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded";
  const btn_small_marginless = "col-md-12 bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded";

  // Change this to useSelector
  let next_stage = "Propellant loading";

  const [abortView, setAbortView] = useState(false);
  const [valveView, setValveView] = useState(false);
  
  const abort = (type) => {
    confirmation("Are you sure you want to " + type + " abort?");
    dispatch(abortPressed({type: type, pressed: true}));
  }
  
  const solenoid_actuation = () => {
    alert("Add functionality")
  }
  
  const request = (type) => {
    dispatch(requestPressed({type: type, pressed: true}));
  }
  
  const valve_state_request = () => {
    alert("Add functionality")
  }
  
  const progress = () => {
    // If the pi isn't 100% ready to progress to next stage, mention that here. Otherwise, progress (w/ confirmation).
    confirmation("Are you sure you want to progress to" + next_stage + "?");
    dispatch(generalPressed({type: "progress", pressed: true}))
  }



  return (
  <div className="pane">
    <Header title="GS To Flight"/>

    <div><button onClick={() => setAbortView(!abortView)} class={btn_big}>Abort</button></div>
    <div class={abortView ? "block" : "hidden"}>
      <div><button class={btn_small} onClick={() => abort("soft")}>Soft Abort</button></div>
      <div><button class={btn_small} onClick={() => abort("hard")}>Hard Abort</button></div>
    </div>

    <button onClick={() => setValveView(!valveView)} class={btn_big}>Valve Actuation</button>
    <div class={valveView ? "block" : "hidden"}>
      <div>
        <form class="mt-4" onSubmit={solenoid_actuation}>
          <label>Valve: </label>
          <select class="ml-2 mr-4">
            <option>Main Propellant Valve</option>
            <option>Pressure Relief Valve</option>
            <option>Propellant Vent Valve</option>
          </select>
          <label>Actuation Type: </label>
          <select class="ml-2 mr-4">
            <option>Pulse</option>
            <option>Open Vent</option>
            <option>Close Vent</option>
          </select>
          <label>Priority: </label>
          <select class="ml-2 mr-2">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
          <button class={btn_small_marginless} type="submit">Actuate Solenoid</button>
        </form>
      </div>
    </div>

    <div><button onClick={() => request("sensor")} class={btn_big}>Request Sensor Data</button></div>
    <div><button onClick={() => request("valve")} class={btn_big}>Request Valve State</button></div>
    <div><button onClick={progress} class={btn_big}>Progress To {next_stage}</button></div>
  </div>
  );
}


export default ButtonPane;
