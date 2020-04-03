import React from 'react';
import { useSelector } from "react-redux";

const Data = () => {
    const data = useSelector((state) => {
        return {
            sensorState: state.data.sensorData,
            valveState: state.data.valveData,
            heartbeatState: state.data.general.heartbeat,
            heartbeatStatus: state.data.general.heartbeat_status == undefined? []: [["", state.data.general.heartbeat_status]]
        };
    });

    const blockStyle = "m-1 p-4 bg-gray-100";
    const blockHeaderStyle = "text-lg font-bold";
    const groupHeaderStyle = "font-bold mb-1";

    const getLast = (arr) => (arr.length > 0 ? arr[arr.length - 1] : undefined);
    const getColor = (status) => {
        status = status.length == 0 ? undefined : status[status.length - 1][1];
        switch (status) {
            case undefined: return "black"
            case 3: return "green"; 
            case 2: return "orange";
            default: return "red";
        }
    }

    return (    
        <center> 
            <h3 class={blockHeaderStyle}>Sensors</h3>  

            <div class={blockStyle}>
                <h4 class={groupHeaderStyle}>Tank</h4> 
                    <p style={{color: getColor(data.sensorState.pressure.tank)}}> Pressure: {getLast(data.sensorState.pressure.tank)} </p> 
                    <p style={{color: getColor(data.sensorState.thermocouple.tank)}}> Thermo: {getLast(data.sensorState.thermocouple.tank)} </p> 
                    <p style={{color: getColor(data.sensorState.load.tank)}}> Load: {getLast(data.sensorState.load.tank)} </p>
                <br></br>

                <h4 class={groupHeaderStyle}>Chamber</h4> 
                    <p style={{color: getColor(data.sensorState.pressure.chamber)}}> Pressure: {getLast(data.sensorState.pressure.chamber)} </p>
                    <p style={{color: getColor(data.sensorState.thermocouple.chamber)}}>Thermo: {getLast(data.sensorState.thermocouple.chamber)} </p>
                <br></br>

                <h4 class={groupHeaderStyle}>Injector</h4>
                    <p style={{color: getColor(data.sensorState.pressure.injector)}}> Pressure: {getLast(data.sensorState.pressure.injector)} </p>   
                <br></br>
                Timestamp: {getLast(data.sensorState.timestamp)}  <br/> 
                <br></br>
            </div>

            <br></br>

            <h3 class={blockHeaderStyle}>Valves</h3> 
                
            <div class={blockStyle}>
                <h4 class={groupHeaderStyle}>Solenoids</h4>
                Pressure Relief: {data.valveState.solenoid.pressure_relief} <br/>  
                Propellant: {data.valveState.solenoid.propellant_vent} <br/> 
                Main Propellant Valve: {data.valveState.solenoid.main_propellant_valve} <br/> 
                <br></br>
                Timestamp: {data.valveState.timestamp}  <br/>  
            </div>

            <br></br>

            <h3 class={blockHeaderStyle}>Heartbeat</h3> 
            <div class={blockStyle}>
            <p style={{color:getColor(data.heartbeatStatus)}}> Timestamp: {data.heartbeatState}  </p> <br/>  
            </div>

        </center>
    );
}

export default Data;