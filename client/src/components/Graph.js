// used https://openclassrooms.com/en/courses/4286486-build-web-apps-with-reactjs/4286711-build-a-ticking-clock-component
//blog.cloudboost.io/for-loops-in-react-render-no-you-didnt-6c9f4aa73778
import React from 'react';
import Plot from 'react-plotly.js';

class Graph extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        time: 0,
        times: [0],
        currentData: [],
        tempData: [],
        pressureData: []
      };
    }
  
    // Updates the time and plots the last piece of data inputted by the user
    update() {
      // CREATES COPIES OF DATA AND TIMES
      var newTempData = this.state.tempData.slice();
      var newPressureData = this.state.pressureData.slice();
      var newTimes = this.state.times.slice();
  
      // UPDATES DATA AND TIMES - this.state.currentData[this.state.currentData.length - 1]
      newTempData.push(Math.random() * 10);
      newPressureData.push(Math.random() * 10);
      newTimes.push(this.state.times[this.state.times.length - 1] + 100);
  
      this.setState({
        time: this.state.time + 100,
        times: newTimes,
        tempData: newTempData,
        pressureData: newPressureData
      });
  
      if (this.props.dataType === 'temperature') {
        console.log("We got temperature!");
        this.setState({
          currentData: this.state.tempData
        });
      }
  
      else if (this.props.dataType === 'pressure') {
        console.log("We got pressure!");
        this.setState({
          currentData: this.state.pressureData
        });
      }
  
      // DELETES OLD DATA
      if (this.state.time > 1000) {
        newTempData.shift();
        newPressureData.shift();
        newTimes.shift();
  
        this.setState({
          times: newTimes,
          tempData: newTempData,
          pressureData: newPressureData
        });
      }
    }
  
    // Allows user to add data
    addData() {
      var newData = prompt("What value do you want to put in?");
      var copy;
  
      if (this.props.dataType === 'temperature') {
  
        copy = this.state.tempData.slice();
        copy.push(newData);
  
        this.setState({
          tempData: copy,
          currentData: copy
        });
  
      }
  
      else if (this.props.dataType === 'pressure') {
  
        copy = this.state.pressureData.slice();
        copy.push(newData);
  
        this.setState({
          pressureData: copy,
          currentData: copy
        });
  
      }
    }
  
    // Generates graph axes, creates start, stop, and input data buttons, generates timer, and displays points
    // PlotDisplay takes in current time, current data, and current times that have occured
    render() {
      return (
        <div>
          <div className="buttons">
            <button className="start" onClick={() => this.interval = setInterval(() => this.update(), 100)}>Start</button>
            <button className="stop" onClick={() => clearInterval(this.interval)}>Stop</button>
            <button className="input" onClick={() => this.addData()}>Add Data</button>
          </div>
          <Plot
          data={[
            {
              x: this.state.times,
              y: this.state.currentData,
              mode: 'lines+markers',
              marker: {color: 'red'},
            },
            //{type: 'bar', x: this.state.times, y: this.state.currentData},
          ]}
          layout={ {width: "100%", height: "100%", title: 'PSI vs. Time'} }
        />
        </div>
      );
    }
  }
  
  export default Graph;
