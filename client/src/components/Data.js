import React from 'react';
import { useSelector } from "react-redux";

const VALVE_MAP = {1: "OPEN", 0: "CLOSED"};

const Data = () => {
    const data = useSelector((state) => {
        return {
            sensorState: state.data.sensorData,
            valveState: state.data.valveData,
            heartbeatState: state.data.general.heartbeat,
            heartbeatStatus: state.data.general.heartbeat_status == undefined? []: [["", state.data.general.heartbeat_status]],
            mode: state.data.general.mode
        };
    });

    const blockStyle = "m-1 p-4 bg-gray-100";
    const blockHeaderStyle = "text-lg font-bold";
    const groupHeaderStyle = "font-bold mb-1";

    const getLast = (arr) => (arr.length > 0 ? arr[arr.length - 1] : undefined);
    const getColor = (status) => {
        if(status.length === 0){
            return "black";
        }
        switch (status[status.length - 1][1]) {
            case 3: return "green"; 
            case 2: return "orange";
            case 1: return "red";
            default: return "blue";
        }
    }

    return (    
        <center> 
            <h3 class={blockHeaderStyle}>Sensors</h3>  

            <div class={blockStyle}>
                <h4 class={groupHeaderStyle}>Tank</h4> 
                    <p style={{color: getColor(data.sensorState.pressure.tank)}}> Pressure: {getLast(data.sensorState.pressure.tank)} PSI</p> <br/>
                    <p style={{color: getColor(data.sensorState.thermocouple.tank)}}> Thermo: {getLast(data.sensorState.thermocouple.tank)} C</p> <br />
                    <p style={{color: getColor(data.sensorState.load.tank)}}> Load: {getLast(data.sensorState.load.tank)} N</p> <br/>
                <br></br>

                <h4 class={groupHeaderStyle}>Chamber</h4> 
                    <p style={{color: getColor(data.sensorState.pressure.chamber)}}> Pressure: {getLast(data.sensorState.pressure.chamber)} PSI</p> <br/>
                    <p style={{color: getColor(data.sensorState.thermocouple.chamber)}}>Thermo: {getLast(data.sensorState.thermocouple.chamber)} C</p> <br/>
                <br></br>

                <h4 class={groupHeaderStyle}>Injector</h4>
                    <p style={{color: getColor(data.sensorState.pressure.injector)}}> Pressure: {getLast(data.sensorState.pressure.injector)} PSI</p>  <br/>  
                <br></br>
                Timestamp: {getLast(data.sensorState.timestamp)} s<br/> 
                <br></br>
            </div>

            <br></br>

            <h3 class={blockHeaderStyle}>Valves</h3> 
                
            <div class={blockStyle}>
                <h4 class={groupHeaderStyle}>Solenoids</h4>
                Pressure Relief: {VALVE_MAP[data.valveState.solenoid.pressure_relief]} <br/>  
                Propellant: {VALVE_MAP[data.valveState.solenoid.propellant_vent]} <br/> 
                Main Propellant Valve: {VALVE_MAP[data.valveState.solenoid.main_propellant_valve]} <br/> 
                <br></br>
                Timestamp: {data.valveState.timestamp} 
            </div>

            <br></br>

            <h3 class={blockHeaderStyle}>Heartbeat</h3> 
            <div class={blockStyle}>
            <p style={{color:getColor(data.heartbeatStatus)}}> Timestamp: {data.heartbeatState}  </p> 
            </div>

            <br></br>

            <h3 class={blockHeaderStyle}>Mode</h3> 
            <div class={blockStyle}>
            <p>{data.mode}  </p> 
            </div>

        </center>
    );
}

export default Data;