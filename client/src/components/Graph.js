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
      newPressureData.push(Math.random() * 100);
      newTimes.push(this.state.times[this.state.times.length - 1] + 100);
  
      this.setState({
        time: this.state.time + 100,
        times: newTimes,
        tempData: newTempData,
        pressureData: newPressureData
      });
  
      if (this.props.dataType === 'temperature') {
        this.setState({
          currentData: this.state.tempData
        });
      }
  
      else if (this.props.dataType === 'pressure') {
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
          layout={ 
            {
              width: 1500, 
              height: 500, 
              title: this.props.title, 
              xaxis: {
                title: this.props.xaxis
              }, 
              yaxis: {
                title: this.props.yaxis
              }
            } 
          }
        />
        </div>
      );
    }
  }

export default Graph;
  