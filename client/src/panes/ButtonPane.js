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
  var [valve, actuationType, priority, sensorType, sensorLocation, valveType, valveLocation] = useState("")

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



  return (
  <div class="pane">
    <Header title="GS To Flight"/>

    <div><button onClick={() => setAbortView(!abortView)} class={btn_big}>Abort</button></div>
    <div class={abortView ? "block" : "hidden"}>
      <div><button class={btn_small} onClick={() => abort("soft")}>Soft Abort</button></div>
      <div><button class={btn_small} onClick={() => abort("hard")}>Hard Abort</button></div>
    </div>

    <button onClick={() => setActuationView(!actuationView)} class={btn_big}>Valve Actuation</button>
    <div class={actuationView ? "block" : "hidden"}>
      <div class="mt-2">
        <b><label>Valve: </label></b>
        <select onChange={e => {valve = e.target.value}} class="ml-2 mr-4 border-2" id="valve">
          <option style={{display:"None"}}></option>
          <option value="MainPropellantValve">Main Propellant Valve</option>
          <option value="PressureRelief">Pressure Relief Valve</option>
          <option value="PropellantVent">Propellant Vent Valve</option>
        </select>
        <b><label>Actuation Type: </label></b>
        <select onChange={e => {actuationType = e.target.value}} class="ml-2 mr-4 border-2">
          <option style={{display:"None"}}></option>
          <option value="Pulse">Pulse</option>
          <option value="OpenVent">Open Vent</option>
          <option value="CloseVent">Close Vent</option>
        </select>
        <b><label>Priority: </label></b>
        <select onChange={e => {priority = e.target.value}} class="ml-2 mr-2 border-2">
          <option style={{display:"None"}}></option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <button onClick={() => actuateValve(valve, actuationType, priority)} class={btn_small_marginless}>Actuate Solenoid</button>
      </div>
    </div>

    <div><button onClick={() => setSensorView(!sensorView)} class={btn_big}>Request Sensor Data</button></div>
    <div class={sensorView ? "block" : "hidden"}>
      <div class="mt-2">
        <b><label>Sensor Type: </label></b>
        <select onChange={e => {sensorType = e.target.value}} class="ml-2 mr-4 border-2">
          <option style={{display:"None"}}></option>
          <option value="Thermocouple">Thermocouple</option>
          <option value="Pressure">Pressure Sensor</option>
          <option value="Load">Load Sensor</option>
        </select>
        <b><label>Sensor Location: </label></b>
        <select onChange={e => {sensorLocation = e.target.value}} class="ml-2 mr-4 border-2">
          <option style={{display:"None"}}></option>
          <option value="Chamber">Chamber</option>
          <option value="Tank">Tank</option>
          <option value="Injector">Injector</option>
        </select>
        <button onClick={() => getSensorData(sensorType, sensorLocation)} class={btn_small_marginless}>Request Data</button>
      </div>
    </div>

    <div><button onClick={() => setValveView(!valveView)} class={btn_big}>Request Valve State</button></div>
    <div class={valveView ? "block" : "hidden"}>
      <div class="mt-2">
        <b><label>Valve Type: </label></b>
        <select onChange={e => {valveType = e.target.value}} class="ml-2 mr-4 border-2">
          <option style={{display:"None"}}></option>
          <option value="Ball">Ball Valve</option>
          <option value="Solenoid">Solenoid Valve</option>
        </select>
        <b><label>Valve Location: </label></b>
        <select onChange={e => {valveLocation = e.target.value}} class="ml-2 mr-4 border-2">
          <option style={{display:"None"}}></option>
          <option value="MainPropellantValve">Main Propellant Valve</option>
          <option value="PressureRelief">Pressure Relief Valve</option>
          <option value="PropellantVent">Propellant Vent Valve</option>
        </select>
        <button onClick={() => getValveState(valveType, valveLocation)} class={btn_small_marginless}>Request State</button>
      </div>
    </div>
    <div><button onClick={progress} class={btn_big}>Progress To {next_stage}</button></div>
  </div>
  );
}


export default ButtonPane;
