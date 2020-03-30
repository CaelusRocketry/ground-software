import React from 'react';
import { useSelector } from "react-redux";

const Data = () => {
    const data = useSelector((state) => {
        return {
            sensorState: state.data.sensorData,
            valveState: state.data.valveData,
            heartbeatState: state.data.general.heartbeat
        };
    });

    const blockStyle = "m-1 p-4 bg-gray-100";
    const blockHeaderStyle = "text-lg font-bold";
    const groupHeaderStyle = "font-bold mb-1";

    const getLast = (arr) => (arr.length > 0 ? arr[arr.length - 1] : undefined);

    return (    
        <center> 
            <h3 class={blockHeaderStyle}>Sensors</h3>  

            <div class={blockStyle}>
                <h4 class={groupHeaderStyle}>Tank</h4> 
                    Pressure: {getLast(data.sensorState.pressure.tank)}  <br/>
                    Thermo: {getLast(data.sensorState.thermocouple.tank)} <br />
                    Load: {getLast(data.sensorState.load.tank)}  <br/>
                <br></br>

                <h4 class={groupHeaderStyle}>Chamber</h4> 
                    Pressure: {getLast(data.sensorState.pressure.chamber)}  <br/>
                    Thermo: {getLast(data.sensorState.thermocouple.chamber)} <br/>
                <br></br>

                <h4 class={groupHeaderStyle}>Injector</h4>
                    Pressure: {getLast(data.sensorState.pressure.injector)}  <br/>  
                <br></br>
                Timestamp: {getLast(data.sensorState.timestamp)}  <br/>  
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
                Timestamp: {data.heartbeatState}  <br/>  
            </div>

        </center>
    );
}

export default Data;
