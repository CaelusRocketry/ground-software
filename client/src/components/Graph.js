import React from 'react';
import Plot from 'react-plotly.js';

class Graph extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        time: 0,
        times: [0],
        currentData: [],
        data: {
          "temperature": [],
          "pressure": []
        }
      };
    }
  
    // Updates the time and plots the last piece of data inputted by the user
    update() {
<<<<<<< HEAD
=======
      let newTime = this.state.time + 100;
      console.log("Updating");
      console.log(this.state);
      console.log(this.props);
>>>>>>> 97d461d65b26d3c51fbc46994e9092d8fa71574e
      // CREATES COPIES OF DATA AND TIMES
      let newData = {};
      for(let key in this.state.data){
        newData[key] = this.state.data[key].slice();
      }
      let newTimes = this.state.times.slice();
  
      // UPDATES DATA AND TIMES - this.state.currentData[this.state.currentData.length - 1]
<<<<<<< HEAD
      newTempData.push(Math.random() * 10);
      newPressureData.push(Math.random() * 100);
      newTimes.push(this.state.times[this.state.times.length - 1] + 100);
=======
      for(let key in newData){
        newData[key].push(Math.random() * 10);
      }
      newTimes.push(newTime);
>>>>>>> 97d461d65b26d3c51fbc46994e9092d8fa71574e
  
      this.setState({
        time: newTime,
        times: newTimes,
        data: newData
      });
<<<<<<< HEAD
  
      if (this.props.dataType === 'temperature') {
=======

      if(this.state.data[this.props.dataType] !== undefined){
        console.log("We got " + this.props.dataType + "!");
>>>>>>> 97d461d65b26d3c51fbc46994e9092d8fa71574e
        this.setState({
          currentData: this.state.data[this.props.dataType]
        });
      }
<<<<<<< HEAD
  
      else if (this.props.dataType === 'pressure') {
        this.setState({
          currentData: this.state.pressureData
        });
=======
      else{
        console.log("Unknown datatype: " + this.props.dataType + "!");
>>>>>>> 97d461d65b26d3c51fbc46994e9092d8fa71574e
      }

      
      // DELETES OLD DATA
      if (this.state.time > 1000) {
        for(let key in newData){
          newData[key].shift();
        }
        newTimes.shift();
  
        this.setState({
          times: newTimes,
          data: newData
        });
      }
    }
  
    // Allows user to add data
    addData() {
<<<<<<< HEAD
      var newData = prompt("What value do you want to put in?");
      var copy;
  
      if (this.props.dataType === 'temperature') {
        copy = this.state.tempData.slice();
        copy.push(newData);
=======
      console.log(this.state);
      let newValue = prompt("What value do you want to put in?");

      if (this.state.data[this.props.dataType] !== undefined) {
  
        let newData = {};
        for(let key in newData){
          newData[key] = this.state.data[key];
        }
        newData[this.props.dataType].push(newValue);
>>>>>>> 97d461d65b26d3c51fbc46994e9092d8fa71574e
  
        this.setState({
          data: newData
        });
      }
<<<<<<< HEAD
  
      else if (this.props.dataType === 'pressure') {
        copy = this.state.pressureData.slice();
        copy.push(newData);
  
        this.setState({
          pressureData: copy,
          currentData: copy
        });
=======
      else{
        console.log("Unknown datatype: " + this.props.dataType + "!");
>>>>>>> 97d461d65b26d3c51fbc46994e9092d8fa71574e
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
  