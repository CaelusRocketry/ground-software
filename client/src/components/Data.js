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

//        console.log("HII");
//        console.log(data);
        return data;
    });

    const valveState = useSelector((state) => {
        return state.data.valveData;
    });

//    console.log(data);

    return (
        <div className="flex-container">
            <div className="data">
                <b>Pressure:</b><br/><br/> 
                <i>Chamber:</i> <b>{data.pressure.chamber}</b><br/>
                <i>Injector:</i> <b>{data.pressure.injector}</b><br/>
                <i>Tank:</i> <b>{data.pressure.tank}</b><br/>
                <i>Time-stamp:</i> <b>{data.time}s</b><br/>
            </div>
            <div className="data">
                <b>Thermo:</b><br/><br/>
                <i>Chamber:</i> <b>{data.thermocouple.chamber}</b><br/>
                <i>Tank:</i> <b>{data.thermocouple.tank}</b><br/><br/><br/>
                <i>Time-stamp:</i> <b>{data.time}</b> s<br/>
            </div>
            <div className="data">
                <b>Load:</b><br/><br/>
                <i>Tank:</i> <b>{data.load.tank}</b><br/><br/><br/><br/><br/>
                <i>Time-stamp:</i> <b>{data.time}</b> s<br/>
            </div>
            <div className="data">
                <b>Valves:</b><br/>
                <i>Pressure Relief Valve:</i> <b>{valveState.solenoid.pressure_relief}</b><br/><br/>
                <i>Propellant Vent:</i> <b>{valveState.solenoid.pressure_relief}</b><br/><br/>
                <i>Main Propellant Valve:</i> <b>{valveState.solenoid.pressure_relief}</b>
            </div>
        </div>    
    );
}

export default Data;