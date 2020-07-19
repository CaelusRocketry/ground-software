import React, { useState } from "react";
import Header from "../components/Header";
import { useSelector, useDispatch } from 'react-redux';
import { generalPressed, abortPressed, requestPressed, actuatePressed } from '../store/actions/index.js';
import config from '../config.json';

const stages = config["stages"]["list"]

const stage_names = {
  "propellant_loading": "Propellant Loading",
  "leak_testing_1": "Leak Testing Phase 1",
  "pressurant_loading": "Pressurant Loading",
  "leak_testing_2": "Leak Testing Phase 2",
  "pre_ignition": "Pre-Ignition",
  "disconnection": "Disconnection"
};

const valves = config["valves"]["list"];

const valve_type = new Set();
const valve_loc = new Set();
for (var type in valves) {
  valve_type.add(type)
  for (var loc in valves[type]) {
    valve_loc.add(loc)
  }
}

const valve_type_names = {
  "ball": "Ball", "solenoid": "Solenoid"
}

const valve_loc_names = {
  "main_propellant_valve": "Main Propellant Valve",
  "pressure_relief": "Pressure Relief Valve",
  "propellant_vent": "Propellant Vent Valve"
}

const acutation_type_names = {
  4: "Pulse",
  3: "Open Vent",
  2: "Close Vent",
  1: "Stop actuation"
}


const sensors = config["sensors"]["list"];

const sensor_loc = new Set();
const sensor_type = new Set();

for (var type in sensors) {
  sensor_type.add(type)
  for (var loc in sensors[type]) {
    sensor_loc.add(loc)
  }
}

const sensor_loc_names = {
  "chamber": "Chamber", "tank": "Tank", "injector": "Injector"
}

const sensor_type_names = {
  "thermocouple": "Thermocouple", "pressure": "Pressure Sensor", "load": "Load Sensor"
}

console.log("HIHIHIHIHI")
console.log(valve_type, valve_loc)
console.log(sensor_loc, sensor_type)




const ButtonPane = () => {
  const dispatch = useDispatch();
  //  const sensors = {thermocouple: ["chamber", "tank"], pressure: ["chamber", "injector", "tank"], load: ["tank"]};
  const btn_big = "mt-2 col-md-12 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-900";
  const btn_small = "ml-6 mt-2 col-md-12 bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded";
  const btn_small_marginless = "col-md-12 bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded";

  const current_stage = useSelector(state => stages.indexOf(state.data.general.stage));
  const current_progress = useSelector(state => state.data.general.percent_data);
  const mode = useSelector(state => state.data.general.mode);

  const [views, setViews] = useState({ abort: false, actuation: false, sensor: false, valve: false });
  const [selectValues, setSelectValues] = useState({});

  const abort = (type) => {
    if (!window.confirm("Are you sure you want to " + type + " abort?")) {
      return;
    }
    dispatch(abortPressed({ type: type, pressed: true }));
  }

  const actuateValve = (loc, type, p) => {
    console.log(selectValues);
    console.log([loc, type, p]);
    if ([loc, type, p].includes(undefined)) {
      alert("You haven't selected something for each dropdown.");
      return;
    }
    type = parseInt(type);
    p = parseInt(p);
    if (!window.confirm("Are you sure you want to actuate the " + type + " valve at " + loc + " w/ priority " + p)) {
      return;
    }
    dispatch(actuatePressed({ valve: loc, actuation_type: type, priority: p }));
  }

  const request = (type, objectType, location) => {
    if ([type, objectType, location].includes(undefined)) {
      alert("You haven't selected something for each dropdown.");
      return;
    }
    dispatch(requestPressed({ type: type, objectType: objectType, location: location }));
  }

  const progress = () => {
    // If the pi isn't 100% ready to progress to next stage, mention that here. Otherwise, progress (w/ confirmation).
    if (!window.confirm("Are you sure you want to progress to " + stage_names[stages[current_stage + 1]] + "?")) {
      return;
    }
    dispatch(generalPressed({ type: "progress", pressed: true }));
  }

  const handleSelectChange = (e, name) => {
    let values = Object.assign({}, selectValues);
    values[name] = e.target.value;
    setSelectValues(values);
  }


  const createSelect = (label, name, options, options_name) => {

    var opt_arr = [...options]
    return (
      <div class="float-left">
        <b><label>{label}: </label></b>
        <select onChange={(e) => { handleSelectChange(e, name) }} class="ml-2 mr-4 border-2">
          <option class="hidden"></option>
          {opt_arr.map((opt) =>
            <option value={opt}>{options_name[opt]}</option>
          )}

          {/* {opt_arr.map((opt) =>
              <option value="hi">hello</option>
          )} */}
        </select>
      </div>
    )
  }

  const switchView = (name) => {
    let temp = Object.assign({}, views);
    temp[name] = !temp[name]
    setViews(temp);
  }



  return (
    <div class="pane">
      <Header title="Actions" />

      <div><button onClick={() => { switchView("abort") }} class={btn_big}>Abort</button></div>
      <div class={views.abort ? "block" : "hidden"}>
        <div><button class={btn_small} onClick={() => abort("soft")} disabled={mode === "Normal" ? false : true}>Soft Abort</button></div>
        <div><button class={btn_small} onClick={() => abort("hard")} disabled={mode === "Hard abort" ? true : false}>Hard Abort</button></div>
      </div>

      <button onClick={() => {switchView("actuation")}} class={btn_big} disabled={mode === "Normal" ? false : true}>Valve Actuation</button>
      <div class={views.actuation ? "block mt-2" : "hidden"}>
        <div class="mt-2">
          <b><label>Valve: </label></b>
          {createSelect("Valve", "actuationValve", valve_loc, valve_loc_names)}
          {createSelect("Actuation Type", "actuationType", [4, 3, 2, 1], acutation_type_names)}
          {createSelect("Priority", "actuationPriority", [1, 2, 3], { 1: 1, 2: 2, 3: 3 })}
          <button onClick={() => actuateValve(selectValues.actuationValve, selectValues.actuationType, selectValues.actuationPriority)} class={btn_small_marginless}>Actuate Solenoid</button>
        </div>
      </div>

      <div><button onClick={() => { switchView("sensor") }} class={btn_big}>Request Sensor Data</button></div>
      <div class={views.sensor ? "block mt-2" : "hidden"}>
        {createSelect("Sensor Location", "requestSensorLocation", sensor_loc, sensor_loc_names)}
        {createSelect("Sensor Type", "requestSensor", sensor_type, sensor_type_names)}
        <button onClick={() => request("sensor", selectValues.requestSensor, selectValues.requestSensorLocation)} class={btn_small_marginless}>Request Data</button>
      </div>

      <div><button onClick={() => { switchView("valve") }} class={btn_big}>Request Valve State</button></div>
      <div class={views.valve ? "block mt-2" : "hidden"}>
        <div class="mt-2">
          {createSelect("Valve Type", "requestValve", valve_type, valve_type_names)}
          {createSelect("Valve Location", "requestValveLocation", valve_loc, valve_loc_names)}
          <button onClick={() => request("valve", selectValues.requestValve, selectValues.requestValveLocation)} class={btn_small_marginless}>Request State</button>
        </div>
      </div>
      <div><button onClick={progress} class={btn_big} disabled={current_progress !== 100}>Progress To {stage_names[stages[current_stage + 1]]}</button></div>
      {current_progress}
    </div>
  );
}


export default ButtonPane;
