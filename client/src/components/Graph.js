import React, { useState } from "react";
import { useSelector } from "react-redux";
import Plot from 'react-plotly.js';

import {
  LineChart,
  Line,
  Label,
  XAxis,
  YAxis,
} from "recharts";


const properties = {
  thermocouple: {
    xaxis: "Time (s)",
    yaxis: "Temperature (C)",
    title: "Temperature vs. Time",
  },
  pressure: {
    xaxis: "Time (s)",
    yaxis: "Pressure (PSI)",
    title: "Pressure vs. Time",
  },
  load: {
    xaxis: "Time (s)",
    yaxis: "Force (N)",
    title: "Load vs. Time"
  }
};

const Graph = props => {
  const [metadata, setMetadata] = useState({
    type: props.type,
    location: props.location
  });
  
  const data = useSelector((state) => {
    let x_values = [];
    let y_values = [];

    let x = state.data.sensorData.timestamp;
    let y = state.data.sensorData[metadata.type][metadata.location];
    if(x.length !== y.length){
      console.log("X: " + x.length + ", Y: " + y.length);
    }
    for(let i = 0; i < x.length; i++){
      x_values.push(x[i]);
      y_values.push(y[i]);
    }
    return {
      'x': x_values, 
      'y': y_values};
  });

  return (
    <div>
      <select
        onChange={e => {
          const [curLocation, curType] = e.target.value.split(".");
          setMetadata({ type: curType, location: curLocation });
        }}
        value={metadata.location + "." + metadata.type}
      >
        <option value="tank.thermocouple">Tank/Thermocouple</option>
        <option value="tank.pressure">Tank/Pressure</option>
        <option value="tank.load">Tank/Load</option>
        <option value="chamber.thermocouple">Chamber/Thermocouple</option>
        <option value="chamber.pressure">Chamber/Pressure</option>
        <option value="injector.pressure">Injector/Pressure</option>
      </select>
      <Plot
        data={[
          {
            x: data['x'],
            y: data['y'],
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
          },
          {type: 'lines', x: data['x'], y: data['y']},
        ]}
        layout={ 
          {width: 500, height: 500, title: 'A Fancy Plot'},
          {xaxis: {
            title: properties[metadata.type].xaxis,
            titlefont: {
              family: "Courier New, monospace",
              size: 18,
              color: "#7f7f7f"
            }
          }},
          {yaxis: {
            title: properties[metadata.type].yaxis,
            titlefont: {
              family: "Courier New, monospace",
              size: 18,
              color: "#7f7f7f"
            }
          }}
         }
      />
    </div>
  );
};

export default Graph;
