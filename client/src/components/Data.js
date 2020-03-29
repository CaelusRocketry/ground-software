import React, { useState } from 'react';
import { useSelector } from "react-redux";

import './Data.css';

const Data = () => {
    const data = useSelector((state) => {
        return {
            sensorState: state.data.sensorData,
            valveState: state.data.valveData,
            heartbeatState: state.data.general.heartbeat
        };
    });
    /*const sensorState = useSelector((state) => {
        return state.data.sensorData;
    });

    const valveState = useSelector((state) => {
        return state.data.valveData;
    });

    const heartbeatState = useSelector((state) => {
        return state.data.general.heartbeat;
    });*/

    const style = {
        background: "#F5F5F5",
        padding: "15px",
        margin: "5px",
    };

    return (    
        <center> 
            <h3 class="text-lg font-bold">Sensors</h3>  

            <div style={style}>
                <h4>Tank</h4> 
                    pressure: {data.sensorState.pressure.tank[data.sensorState.pressure.tank.length - 1]}  <br/>
                    thermo: {data.sensorState.thermocouple.tank[data.sensorState.thermocouple.tank.length - 1]} <br />
                    load: {data.sensorState.load.tank[data.sensorState.load.tank.length - 1]}  <br/>
                <br></br>

                <h4>Chamber</h4> 
                    pressure: {data.sensorState.pressure.chamber[data.sensorState.pressure.chamber.length - 1]}  <br/>
                    thermo: {data.sensorState.thermocouple.chamber[data.sensorState.thermocouple.chamber.length - 1]} <br/>
                <br></br>

                <h4>Injector</h4>
                    pressure: {data.sensorState.pressure.injector[data.sensorState.pressure.injector.length - 1]}  <br/>  
                <br></br>
                timestamp: {data.sensorState.timestamp[data.sensorState.timestamp.length - 1]}  <br/>  
            </div>

            <br></br>

            <h3 class="text-lg font-bold">Valves</h3> 
                
            <div style={style}>
                pressure relief: {data.valveState.solenoid.pressure_relief} <br/>  
                propellant: {data.valveState.solenoid.propellant_vent} <br/> 
                main propellant: {data.valveState.solenoid.main_propellant_valve} <br/> 
                <br></br>
                timestamp: {data.valveState.timestamp}  <br/>  
            </div>

            <br></br>

            <h3 class="text-lg font-bold">Heartbeat</h3> 
            <div  style={style}>
                timestamp: {data.heartbeatState}  <br/>  
            </div>

        </center>
    );
}

export default Data;
