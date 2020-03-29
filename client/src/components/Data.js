import React from 'react';
import { useSelector } from "react-redux";

import './Data.css';

const Data = (props) => {

    const sensorState = useSelector((state) => {
        let sensorState = state.data.sensorData;
        return sensorState;
    });

    const valveState = useSelector((state) => {
        return state.data.valveData;
    });

    const heartbeatState = useSelector((state) => {
        let heartbeatState = state.data.heartbeat;
        return heartbeatState;
    });

    const style = {
        background: "#F5F5F5",
        padding: "15px",
        margin: "5px",
    };

    return (
        <div> <center> 
            <body>
                <h3 class="text-lg font-bold">Sensors</h3>  

                <div  style={style}>
                    <h4>Tank</h4> 
                        pressure: {sensorState.pressure.tank[sensorState.pressure.tank.length - 1]}  <br/>
                        thermo: {sensorState.thermocouple.tank[sensorState.thermocouple.tank.length - 1]} <br />
                        load: {sensorState.load.tank[sensorState.load.tank.length - 1]}  <br/>
                    <br></br>

                    <h4>Chamber</h4> 
                        pressure: {sensorState.pressure.chamber[sensorState.pressure.chamber.length - 1]}  <br/>
                        thermo: {sensorState.thermocouple.chamber[sensorState.thermocouple.chamber.length - 1]} <br/>
                    <br></br>

                    <h4>Injector</h4>
                        pressure: {sensorState.pressure.injector[sensorState.pressure.injector.length - 1]}  <br/>  
                    <br></br>
                    timestamp: {sensorState.timestamp[sensorState.timestamp.length - 1]}  <br/>  
                </div>

                <br></br>

                <h3 class="text-lg font-bold">Valves</h3> 
                 
                <div  style={style}>
                    pressure relief: {valveState.solenoid.pressure_relief} <br/>  
                    propellant: {valveState.solenoid.propellant_vent} <br/> 
                    main propellant: {valveState.solenoid.main_propellant_valve} <br/> 
                    <br></br>
                    timestamp: {valveState.timestamp}  <br/>  
                </div>

                <br></br>

                <h3 class="text-lg font-bold">Heartbeat</h3> 
                <div  style={style}>
                    timestamp: {heartbeatState.timestamp}  <br/>  
                </div>

            </body>
        </center> </div>
    );
}

export default Data;
