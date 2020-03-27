import React from 'react';
import { useSelector } from "react-redux";

import './Data.css';

const Data = (props) => {
    const data = useSelector((state) => {
        let data = Object();
        let sensorData = state.data.sensorData;
        data.time = sensorData.timestamp[sensorData.timestamp.length - 1];

        for(let type in sensorData){
            data[type] = {};
            
            for(let loc in sensorData[type]){
                // Default value
                data[type][loc] = 0.000;
                if(sensorData[type][loc].length > 0){
                    data[type][loc] = sensorData[type][loc][sensorData[type][loc].length - 1];
                }
            }
        }

        console.log(data);
        return data;
    });

    const valveState = useSelector((state) => {
        let valveState = state.data.valveData;
        return valveState;
    });

    return (
        <div class="flex-container">
            <div class="data">
                <b>Pressure:</b><br/><br/> 
                <i>Chamber:</i> <b>{data.pressure.chamber.toFixed(3)}</b><br/>
                <i>Injector:</i> <b>{data.pressure.injector.toFixed(3)}</b><br/>
                <i>Tank:</i> <b>{data.pressure.tank.toFixed(3)}</b><br/>
                <i>Time-stamp:</i> <b>{data.time}</b> s<br/>
            </div>
            <div class="data">
                <b>Thermo:</b><br/><br/>
                <i>Chamber:</i> <b>{data.thermocouple.chamber.toFixed(3)}</b><br/>
                <i>Tank:</i> <b>{data.thermocouple.tank.toFixed(3)}</b><br/><br/><br/>
                <i>Time-stamp:</i> <b>{data.time}</b> s<br/>
            </div>
            <div class="data">
                <b>Load:</b><br/><br/>
                <i>Tank:</i> <b>{data.load.tank.toFixed(3)}</b><br/><br/><br/><br/><br/>
                <i>Time-stamp:</i> <b>{data.time}</b> s<br/>
            </div>
            <div class="data">
                <b>Valves:</b><br/>
                <i>Pressure Relief Valve:</i> <b>{valveState.solenoid.pressure_relief}</b><br/><br/>
                <i>Propellant Vent:</i> <b>{valveState.solenoid.pressure_relief}</b><br/><br/>
                <i>Main Propellant Valve:</i> <b>{valveState.solenoid.pressure_relief}</b>
            </div>
        </div>    
    );
}

export default Data;