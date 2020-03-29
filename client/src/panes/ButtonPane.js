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
  const [actuationView, setActuationView] = useState(false);
  const [valveView, setValveView] = useState(false);
  const [sensorView, setSensorView] = useState(false);
  const [selectValues, setSelectValues] = useState({});

  const abort = (type) => {
    if (window.confirm("Are you sure you want to " + type + " abort?")) {
      dispatch(abortPressed({type: type, pressed: true}));
    }
  }
  
  const actuateValve = (loc, type, p) => {
    alert(loc + "   " + type + "   " + p)
  }
  
  const request = (type) => {
    dispatch(requestPressed({type: type, pressed: true}));
  }
  
  const getSensorData = (type, loc) => {
    alert(type + "   " + loc)
  }

  const getValveState = (type, loc) => {
    alert(type + "   " + loc)
  }

  const progress = () => {
    // If the pi isn't 100% ready to progress to next stage, mention that here. Otherwise, progress (w/ confirmation).
    if (window.confirm("Are you sure you want to progress to " + next_stage + "?")) {
      dispatch(generalPressed({type: "progress", pressed: true}));
    }
  }


  const createSelect = (label, name, options) => {
    // label = Sensor Type
    // onchange = e => {sensorType = e.target.value}
    // options = [[thermocouple, Thermocouple], [pressure, Pressure Sensor], [load, Load Sensor]]
    return (
      <div class="float-left">
      <b><label>{label}: </label></b>
        <select onChange={(e) => {selectValues[name] = e.target.value}} class="ml-2 mr-4 border-2">
          <option class="hidden"></option>
          {options.map((arr) => 
            <option value={arr[0]}>{arr[1]}</option>
          )}
        </select>
      </div>
    )
  }



  return (
  <div class="pane">
    <Header title="Actions"/>

    <div><button onClick={() => setAbortView(!abortView)} class={btn_big}>Abort</button></div>
    <div class={abortView ? "block" : "hidden"}>
      <div><button class={btn_small} onClick={() => abort("soft")}>Soft Abort</button></div>
      <div><button class={btn_small} onClick={() => abort("hard")}>Hard Abort</button></div>
    </div>

    <button onClick={() => setActuationView(!actuationView)} class={btn_big}>Valve Actuation</button>
    <div class={actuationView ? "block mt-2" : "hidden"}>
      <div class="mt-2">
        <b><label>Valve: </label></b>
        {createSelect("Valve", "actuation_valve", [["main_propellant_valve", "Main Propellant Valve"], ["pressure_relief", "Pressure Relief Valve"], ["propellant_vent", "Propellant Vent Valve"]])}
        {createSelect("Actuation Type", "actuation_type", [["pulse", "Pulse"], ["open_vent", "Open Vent"], ["close_vent", "Close Vent"]])}
        {createSelect("Priority", "actuation_priority", [["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"]])}
        <button onClick={() => actuateValve(selectValues.valve, selectValues.actuationType, selectValues.priority)} class={btn_small_marginless}>Actuate Solenoid</button>
      </div>
    </div>

    <div><button onClick={() => setSensorView(!sensorView)} class={btn_big}>Request Sensor Data</button></div>
    <div class={sensorView ? "block mt-2" : "hidden"}>
      {createSelect("Sensor Location", "request_sensor_location", [["chamber", "Chamber"], ["tank", "Tank"], ["injector", "Injector"]])}
      {createSelect("Sensor Type", "request_sensor", [["thermocouple", "Thermocouple"], ["pressure", "Pressure Sensor"], ["load", "Load Sensor"]])}
      <button onClick={() => getSensorData(selectValues.sensorType, selectValues.sensorLocation)} class={btn_small_marginless}>Request Data</button>
    </div>

    <div><button onClick={() => setValveView(!valveView)} class={btn_big}>Request Valve State</button></div>
    <div class={valveView ? "block mt-2" : "hidden"}>
      <div class="mt-2">
        {createSelect("Valve Type", "request_valve", [["ball", "Ball"], ["solenoid", "Solenoid"]])}
        {createSelect("Valve Location", "request_valve_location", [["main_propellant_valve", "Main Propellant Valve"], ["pressure_relief", "Pressure Relief Valve"], ["propellant_vent", "Propellant Vent Valve"]])}
        <button onClick={() => getValveState(selectValues.valveType, selectValues.valveLocation)} class={btn_small_marginless}>Request State</button>
      </div>
    </div>
    <div><button onClick={progress} class={btn_big}>Progress To {next_stage}</button></div>
  </div>
  );
}


export default ButtonPane;
