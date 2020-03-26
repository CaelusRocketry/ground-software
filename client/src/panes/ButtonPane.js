import React from "react";
import Header from "../components/Header";


let abortOpen = true;
let valveOpen = true;
const ButtonPane = () => (
  <div className="pane">
    <Header title="GS To Flight"/>

    <div><button onClick={abort_dropdown} class="mt-2 col-md-12 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Abort</button></div>
    <div id='abortOpts' style={{display: "none"}}>
      <div><button style={{marginLeft:"10px"}} class="mt-2 col-md-12 bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded" onClick={soft_abort}>Soft Abort</button></div>
      <div><button style={{marginLeft:"10px"}} class="mt-2 col-md-12 bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded" onClick={hard_abort}>Hard Abort</button></div>
    </div>

    <button onClick={valve_dropdown} class="mt-2 col-md-12 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Valve Actuation</button>
    <div id='valveOpts' style={{display: "none"}}>
      <div><button style={{marginLeft:"10px"}} class="mt-2 col-md-12 bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded" onClick={override}>Override Command</button></div>
      <div><button style={{marginLeft:"10px"}} class="mt-2 col-md-12 bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded" onClick={solenoid_actuation}>Actuate Solenoid Valve</button></div>
      <div><button style={{marginLeft:"10px"}} class="mt-2 col-md-12 bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded" onClick={ball_valve_actuation}>Actuate Ball Valve</button></div>
    </div>

    <div><button onClick={sensor_data_request} class="mt-2 col-md-12 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Sensor Data Request</button></div>
    <div><button onClick={valve_state_request} class="mt-2 col-md-12 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Valve State Request</button></div>
    <div><button onClick={pre_flight} class="mt-2 col-md-12 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Progress To Pre-Flight</button></div>
  </div>
);

function abort_dropdown(){
  abortOpen = !abortOpen;
  abortOpen ? document.getElementById('abortOpts').style.display = 'none' : document.getElementById('abortOpts').style.display = ''
}

function valve_dropdown(){
  valveOpen = !valveOpen;
  valveOpen ? document.getElementById('valveOpts').style.display = 'none' : document.getElementById('valveOpts').style.display = ''
}

function soft_abort(){
  alert("Add functionality")
}

function hard_abort(){
  alert("Add functionality")
}

function override(){
  alert("Add functionality")
}

function solenoid_actuation(){
  alert("Add functionality")
}

function ball_valve_actuation(){
  alert("Add functionality")
}

function sensor_data_request(){
  alert("Add functionality")
}

function valve_state_request(){
  alert("Add functionality")
}

function pre_flight(){
  alert("Add functionality")
}

export default ButtonPane;
