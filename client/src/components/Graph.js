import React, { useState } from "react";
import { useSelector } from "react-redux";
import Plot from 'react-plotly.js';
import config from '../config.json'

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
  },
  undefined: {
    xaxis: "Undefined",
    yaxis: "Undefined",
    title: "Undefined"
  }
};

const Graph = props => {
  const [metadata, setMetadata] = useState({
    type: props.type,
    location: props.location
  });
  
  const data = useSelector((state) => {
    // Graph type hasn't been selected yet
    if(metadata.type == "undefined" || metadata.location == "undefined"){
      return {'x': [], 'y': []};
    }

    let x_values = [];
    let y_values = [];

    let x = state.data.sensorData.timestamp;
    let y = state.data.sensorData[metadata.type][metadata.location];
    if(x.length !== y.length){
      console.log("X: " + x.length + ", Y: " + y.length);
      alert("Mismatch in X and Y data for graph");
    }
    for(let i = 0; i < x.length; i++){
      x_values.push(x[i]);
      y_values.push(y[i][0]);
    }
    return {
      'x': x_values, 
      'y': y_values
    };
  });

  const stylizeName = (name) => {
    let split = name.split("_");
    split = split.map((x) => x.charAt(0).toUpperCase() + x.substring(1));
    return split.join(" ");
  }

  const getOptions = () => {
    let sensors = config["sensors"]["list"];
    let arr = [["undefined", "undefined"]];
    for(let sensorType in sensors){
      for(let sensorLoc in sensors[sensorType]){
        arr.push([sensorLoc, sensorType]);
      }
    }

    return arr.map((val) => {
      let loc = val[0];
      let type = val[1];
      let value = loc + "." + type;
      return <option value={value}>{stylizeName(loc)}/{stylizeName(type)}</option>;
    });
  }

  return (
    <div>
      <select
        onChange={e => {
          const [curLocation, curType] = e.target.value.split(".");
          setMetadata({ type: curType, location: curLocation });
        }}
        value={metadata.location + "." + metadata.type}
      >
        {getOptions()}
      </select>
      <Plot style={{
        width: "100vh",
        height: "43vh"
      }}
        data={[
          {
            x: data['x'],
            y: data['y'],
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
          },
        ]}
        layout={ 
          {
            title: metadata.location + "/" + metadata.type,
            "titlefont": {
              "family": "Courier New, monospace",
              "size": 22
            },
            xaxis: {
              title: properties[metadata.type].xaxis,
              titlefont: {
                family: "Courier New, monospace",
                size: 17,
                color: "#7f7f7f"
              }
            },
            yaxis: {
              title: properties[metadata.type].yaxis,
              titlefont: {
                family: "Courier New, monospace",
                size: 17,
                color: "#7f7f7f"
              }
            }
          }
        }
      />
    </div>
  );
};

export default Graph;