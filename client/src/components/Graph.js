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

  const getData = (type, location) => {
    switch (props.type) {
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
      const newValue = getData(props.type, "chamber");
      newData.push({ x: newTime, y: newValue });
      if (newData.length > 10) {
        newData.shift();
      }
      return newData;
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      updateData();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <LineChart width={400} height={400} data={data}>
        <XAxis dataKey="x">
          <Label value={properties[props.type].xaxis} />
        </XAxis>
        <YAxis dataKey="y">
          <Label value={properties[props.type].yaxis} angle={270} />
        </YAxis>
        <Line type="monotone" dataKey="y" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default Graph;
