import React from "react";
import DropDown from "./DropDown";

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

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      data: [],
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.update(), 100);
  }

  // Updates the time and plots the last piece of data inputted by the user
  update() {
    let newData = this.state.data.slice();

    let newX = this.state.time + 100;
    let newY = Math.random() * 10;

    newData.push({ x: newX, y: newY });

    if (newData.length > 10) {
      newData.shift();
    }

    console.log(newData);

    this.setState({
      time: newX,
      data: newData,
    });
  }

  // Generates graph axes, creates start, stop, and input data buttons, generates timer, and displays points
  // PlotDisplay takes in current time, current data, and current times that have occured
  render() {
    return (
      <ResponsiveContainer>
        <LineChart width={400} height={400} data={this.state.data}>
          <XAxis dataKey="x">
            <Label value={properties[this.props.dataType].xaxis} />
          </XAxis>
          <YAxis dataKey="y">
            <Label value={properties[this.props.dataType].yaxis} angle={270}/>
          </YAxis>
          <Line type="monotone" dataKey="y" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

export default Graph;
