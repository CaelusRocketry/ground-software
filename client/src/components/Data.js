import React from 'react';
import ReactDOM from 'react-dom';
import './Data.css';

class Data extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pressure: {
                chamber: 0, // number from 0 - 1
                injector: 0, // number from 0 - 10
                tank: 0, // number from 0 - 100
            },
            thermo: {
                chamber: 0,
                tank: 0
            },
            load: {
                tank: 0
            },
            time: 0,
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => this.updateValue(), 100)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
     }

    updateValue() {
        let newPressure = Object.assign(this.state.pressure, this.state.pressure);
        let newThermo = Object.assign(this.state.thermo, this.state.thermo);
        let newLoad = Object.assign(this.state.load, this.state.load);

        let sensors = [newPressure, newThermo, newLoad];

        for (let sensor = 0; sensor < 3; sensor++) {
            if (sensors[sensor].hasOwnProperty("chamber")) {
                sensors[sensor].chamber = Math.random();
            }
            if (sensors[sensor].hasOwnProperty("injector")) {
                sensors[sensor].injector = Math.random() * 10;
            }
            if (sensors[sensor].hasOwnProperty("tank")) {
                sensors[sensor].tank = Math.random() * 100;
            }
        }

        this.setState({
            pressure: newPressure,
            thermo: newThermo,
            load: newLoad,
            time: this.state.time + 100,
        });
    }

    render() {
        return (
            <div class="flex-container">
                <div class="data">
                    Pressure:<br/><br/> 
                    Chamber: {this.state.pressure.chamber.toFixed(3)}<br/>
                    Injector: {this.state.pressure.injector.toFixed(3)}<br/>
                    Tank: {this.state.pressure.tank.toFixed(3)}<br/><br/>
                    Time-stamp: {this.state.time} ms
                </div>
                <div class="data" >
                    Thermo:<br/><br/>
                    Chamber: {this.state.thermo.chamber.toFixed(3)}<br/>
                    Tank: {this.state.thermo.tank.toFixed(3)}<br/><br/><br/><br/>
                    Time-stamp: {this.state.time} ms
                </div>
                <div class="data" >
                    Load:<br/><br/>
                    Tank: {this.state.load.tank.toFixed(3)}<br/><br/><br/><br/><br/><br/>
                    Time-stamp: {this.state.time} ms
                </div>
            </div>
        );
    }
}

export default Data;