import React from 'react';
import Graph from './Graph';

class DropDown extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: 'temperature',
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      console.log(this.state.value);
      event.preventDefault();
    }
  
    render() {
      const graphProperties = {
        temperature: {
          xAxis: "Time (ms)",
          yAxis: "Temperature (C)",
          title: "Temperature vs. Time"
        },
        pressure: {
          xAxis: "Time (ms)",
          yAxis: "Pressure (PSI)",
          title: "Pressure vs. Time"
        }
      };
  
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Pick your graph: 
              <select value={this.state.value} onChange={this.handleChange}>
                <option value="temperature">Temperature</option>
                <option value="pressure">Pressure</option>
              </select>
            </label>
          </form>
        </div>
      );
    }
  }

export default DropDown;