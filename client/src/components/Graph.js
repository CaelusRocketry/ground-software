import React, { useState } from "react";
import { useSelector } from "react-redux";

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
};

const sensors = {
  thermocouple: ["tank", "chamber"],
  pressure: ["tank", "chamber"]
}

const Graph = props => {
  console.log(props);
  const [metadata, setMetadata] = useState({
    type: props.type,
    location: props.location
  });

  const count = useSelector((state) => {
    return state.data.sensorData.timestamp
  });
  
  const data = useSelector((state) => {
    let data = [];
    let x = state.data.sensorData.timestamp;
    let y = state.data.sensorData[metadata.type][metadata.location];
    if(x.length !== y.length){
      console.log("X: " + x.length + ", Y: " + y.length);
    }
    for(let i = 0; i < x.length; i++){
      data.push({x: x[i], y: y[i]});
    }
    return data;
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
        <option value="chamber.thermocouple">Chamber/Thermocouple</option>
        <option value="chamber.pressure">Chamber/Pressure</option>
      </select>
      <LineChart width={400} height={400} data={data}>
        <XAxis dataKey="x">
          <Label value={properties[metadata.type].xaxis} />
        </XAxis>
        <YAxis dataKey="y">
          <Label value={properties[metadata.type].yaxis} angle={270} />
        </YAxis>
        <Line type="monotone" dataKey="y" stroke="#8884d8" />
      </LineChart>
      <div>
        Data: {data.length}
        <br></br>
        Count: {count.length}
      </div>
    </div>
  );
};

export default Graph;
