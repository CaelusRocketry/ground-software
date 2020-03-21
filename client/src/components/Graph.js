import React from "react";

import {
  LineChart,
  Line,
  Label,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const properties = {
  thermo_chamber: {
    xaxis: "Time (ms)",
    yaxis: "Temperature (C)",
    title: "Temperature vs. Time",
  },
  thermo_tank: {
    xaxis: "Time (ms)",
    yaxis: "Temperature (C)",
    title: "Temperature vs. Time",
  },
  pressure_chamber: {
    xaxis: "Time (ms)",
    yaxis: "Pressure (PSI)",
    title: "Pressure vs. Time",
  },
  pressure_tank: {
    xaxis: "Time (ms)",
    yaxis: "Pressure (PSI)",
    title: "Pressure vs. Time",
  }
};

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      data: {
        thermo_chamber: [],
        thermo_tank: [],
        pressure_chamber: [],
        pressure_tank: []
      },
      currentData: 'thermo_chamber'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(() => this.update(), 100);
  }

  handleChange(event) {
    this.setState({currentData: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  getData(dataType){
    if(dataType === 'thermo_chamber'){
      return Math.random();
    }
    if(dataType === 'thermo_tank'){
      return Math.random() * 10 + 10;
    }
    if(dataType === 'pressure_chamber'){
      return Math.random() * 100 + 100;
    }
    if(dataType === 'pressure_tank'){
      return Math.random() * 1000 + 1000;
    }
  }

  // Updates the time and plots the last piece of data inputted by the user
  update() {
    let newData = Object.assign(this.state.data, this.state.data);
    let newX = this.state.time + 100;
    for(let key in newData){
      let newY = this.getData(key);
      newData[key].push({x: newX, y: newY});   
      if(newData[key].length > 10){
        newData[key].shift();
      }   
    }

    this.setState({
      time: newX,
      data: newData
    });
  }

  // Generates graph axes, creates start, stop, and input data buttons, generates timer, and displays points
  // PlotDisplay takes in current time, current data, and current times that have occured
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Pick your graph: 
            <select value={this.state.currentData} onChange={this.handleChange}>
              <option value="thermo_chamber">Thermo Chamber</option>
              <option value="thermo_tank">Thermo Tank</option>
              <option value="pressure_chamber">Pressure Chamber</option>
              <option value="pressure_tank">Pressure Tank</option>
            </select>
          </label>
        </form>

        <LineChart width={400} height={400} data={this.state.data[this.state.currentData]}>
          <XAxis dataKey="x">
            <Label value={properties[this.props.dataType].xaxis} />
          </XAxis>
          <YAxis dataKey="y">
            <Label value={properties[this.props.dataType].yaxis} angle={270}/>
          </YAxis>
          <Line type="monotone" dataKey="y" stroke="#8884d8" />
        </LineChart>
      </div>
    );
  }
}

export default Graph;
