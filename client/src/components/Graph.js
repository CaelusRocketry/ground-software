import React, { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  Label,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const properties = {
  temperature: {
    xaxis: "Time (ms)",
    yaxis: "Temperature (C)",
    title: "Temperature vs. Time",
  },
  pressure: {
    xaxis: "Time (ms)",
    yaxis: "Pressure (PSI)",
    title: "Pressure vs. Time",
  },
};

const Graph = props => {
  const [time, setTime] = useState(0);
  const [data, setData] = useState([]);

  const [metadata, setMetadata] = useState({
    type: props.type,
    location: props.location,
  });

  const getData = (type, location) => {
    switch (type) {
      case "temperature":
        if (location === "chamber") {
          return Math.random();
        }
        if (location === "tank") {
          return Math.random() * 10 + 10;
        }
        break;
      case "pressure":
        if (location === "chamber") {
          return Math.random() * 100 + 100;
        }
        if (location === "tank") {
          return Math.random() * 1000 + 1000;
        }
        break;
      default:
        break;
    }
  };

  const updateData = () => {
    let newTime = null;
    setTime(time => {
      newTime = time;
      return time + 100;
    });
    setData(data => {
      let newData = [...data];
      const newValue = getData(metadata.type, metadata.location);
      newData.push({ x: newTime, y: newValue });
      if (newData.length > 10) {
        newData.shift();
      }
      return newData;
    });
  };

  const resetData = () => {
    setTime(0); // FIXME: This should be replaced with the proper value
    setData([]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      updateData();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <select
        onChange={e => {
          const [curLocation, curType] = e.target.value.split(".");
          setMetadata({ type: curType, location: curLocation });
          resetData();
        }}
        value={metadata.location + "." + metadata.type}
      >
        <option value="tank.temperature">Tank/Temperature</option>
        <option value="tank.pressure">Tank/Pressure</option>
        <option value="chamber.temperature">Chamber/Temperature</option>
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
    </div>
  );
};

export default Graph;
