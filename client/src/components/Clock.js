import React from 'react';
import './Data.css';

class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        time: new Date().toLocaleString()
      };
    }
    componentDidMount() {
      this.intervalID = setInterval(
        () => this.tick(),
        1000
      );
    }
    componentWillUnmount() {
      clearInterval(this.intervalID);
    }
    tick() {
      this.setState({
        time: new Date().toLocaleString()
      });
    }
    



    render() {
        return (
            <div>
                <br/><br/><br/><br/><br/>
                <div className="flex-container">
                    <div className="time">
                        Welcome to Project Caelus Ground Station<br/><br/>
                        {this.state.time}.
                    </div>
                </div>
            </div>
        )
    }
  }
export default Clock