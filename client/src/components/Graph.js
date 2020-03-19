import React from "react";
import Plot from "react-plotly.js";

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
      times: [0],
      currentData: [],
      data: {
        temperature: [],
        pressure: [],
      },
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.update(), 100);
  }

  // Updates the time and plots the last piece of data inputted by the user
  update() {
    let newTime = this.state.time + 100;
    console.log("Updating");
    console.log(this.state);
    console.log(this.props);
    // CREATES COPIES OF DATA AND TIMES
    let newData = {};
    for (let key in this.state.data) {
      newData[key] = this.state.data[key].slice();
    }
    let newTimes = this.state.times.slice();

    // UPDATES DATA AND TIMES - this.state.currentData[this.state.currentData.length - 1]
    for (let key in newData) {
      newData[key].push(Math.random() * 10);
    }
    newTimes.push(newTime);

    this.setState({
      time: newTime,
      times: newTimes,
      data: newData,
    });

    if (this.state.data[this.props.dataType] !== undefined) {
      console.log("We got " + this.props.dataType + "!");
      this.setState({
        currentData: this.state.data[this.props.dataType],
      });
    } else {
      console.log("Unknown datatype: " + this.props.dataType + "!");
    }

    // DELETES OLD DATA
    if (this.state.time > 1000) {
      for (let key in newData) {
        newData[key].shift();
      }
      newTimes.shift();

      this.setState({
        times: newTimes,
        data: newData,
      });
    }
  }

  // Generates graph axes, creates start, stop, and input data buttons, generates timer, and displays points
  // PlotDisplay takes in current time, current data, and current times that have occured
  render() {
    return (
      <div>
        <Plot
          data={[
            {
              x: this.state.times,
              y: this.state.currentData,
              mode: "lines+markers",
              marker: { color: "red" },
            },
            //{type: 'bar', x: this.state.times, y: this.state.currentData},
          ]}
          useResizeHandler
          style={{ position: "relative", width: "100%", height: "100%" }}
          layout={{
            autosize: true,
            title: properties[this.props.dataType].title,
            xaxis: {
              title: properties[this.props.dataType].xaxis,
            },
            yaxis: {
              title: properties[this.props.dataType].yaxis,
            },
          }}
        />
      </div>
    );
  }
}

export default Graph;
