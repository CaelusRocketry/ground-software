import React, { useState } from "react";

import {
  LineChart,
  Line,
  Label,
  XAxis,
  YAxis,
} from "recharts";

import { connect } from 'react-redux'


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

const Graph = props => {
  console.log(props);
  const [metadata, setMetadata] = useState({
    type: props.type,
    location: props.location
  });

  return (
    <div>
      <select
        onChange={e => {
          const [curLocation, curType] = e.target.value.split(".");
          setMetadata({ type: curType, location: curLocation });
          props.type = curType;
          props.location = curLocation;
        }}
        value={metadata.location + "." + metadata.type}
      >
        <option value="tank.thermocouple">Tank/Thermocouple</option>
        <option value="tank.pressure">Tank/Pressure</option>
        <option value="chamber.thermocouple">Chamber/Thermocouple</option>
        <option value="chamber.pressure">Chamber/Pressure</option>
      </select>
      <LineChart width={400} height={400} data={props.data}>
        <XAxis dataKey="x">
          <Label value={properties[metadata.type].xaxis} />
        </XAxis>
        <YAxis dataKey="y">
          <Label value={properties[metadata.type].yaxis} angle={270} />
        </YAxis>
        <Line type="monotone" dataKey="y" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

const stateToProps = (state, ownProps) => {
  let data = ownProps.data || [];
  data = data.slice();
  let x = state.data.sensorData.timestamp;
  let y = state.data.sensorData[ownProps.type][ownProps.location];
  data.push({ x: x, y: y });
  if(data.length > 10){
    data.shift();
  }
  ownProps.data = data;

  return ({
    data: data
  });
}


//export default Graph;
export default connect(stateToProps)(Graph)
