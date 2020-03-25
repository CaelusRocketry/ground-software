import React, { useState, useEffect } from 'react';
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
                console.log(data[type][loc]);
            }
        }
        console.log(data);
        return data;
    });

      
    return (
        <div class="flex-container">
        <div class="data">
            Pressure:<br/><br/> 
            Chamber: {data.pressure.chamber.toFixed(3)}<br/>
            Injector: {data.pressure.injector.toFixed(3)}<br/>
            Tank: {data.pressure.tank.toFixed(3)}<br/><br/>
            Time-stamp: {data.time} s
        </div>
        <div class="data">
            Thermo:<br/><br/>
            Chamber: {data.thermocouple.chamber.toFixed(3)}<br/>
            Tank: {data.thermocouple.tank.toFixed(3)}<br/><br/><br/><br/>
            Time-stamp: {data.time} s
        </div>
        <div class="data">
            Load:<br/><br/>
            Tank: {data.load.tank.toFixed(3)}<br/><br/><br/><br/><br/><br/>
            Time-stamp: {data.time} s
        </div>
    </div>      
    );
}

export default Data;