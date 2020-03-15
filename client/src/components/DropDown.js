import React from 'react';
import Graph from './Graph'

class DropDown extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: 'temperature'
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
          <Graph 
            dataType = {this.state.value}
          />
        </div>
      );
    }
  }
  
  export default DropDown;
