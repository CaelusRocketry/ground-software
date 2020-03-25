import React, { useState, useEffect } from 'react';
import './Data.css';


const Data = props => {
    var [pressure, updatePressure] = useState({
        chamber: 0,
        injector: 0,
        tank: 0
    });
    var [thermo, updateThermo] = useState({
        chamber: 0,
        tank: 0
    });
    var [load, updateLoad] = useState({
        tank: 0
    });
    const [time, updateTime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            updatePressure(
                pressure = {
                    chamber: Math.random(),
                    injector: Math.random() * 10,
                    tank: Math.random() * 100
                }
            );
            updateThermo(
                thermo = {
                    chamber: Math.random(),
                    tank: Math.random() * 100
                }
            );
            updateLoad(
                load = {
                    tank: Math.random() * 100
                }
            );
            updateTime(
                time => time + 100
            )
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <div class="flex-container">
        <div class="data">
            Pressure:<br/><br/> 
            Chamber: {pressure.chamber.toFixed(3)}<br/>
            Injector: {pressure.injector.toFixed(3)}<br/>
            Tank: {pressure.tank.toFixed(3)}<br/><br/>
            Time-stamp: {time} ms
        </div>
        <div class="data">
            Thermo:<br/><br/>
            Chamber: {thermo.chamber.toFixed(3)}<br/>
            Tank: {thermo.tank.toFixed(3)}<br/><br/><br/><br/>
            Time-stamp: {time} ms
        </div>
        <div class="data">
            Load:<br/><br/>
            Tank: {load.tank.toFixed(3)}<br/><br/><br/><br/><br/><br/>
            Time-stamp: {time} ms
        </div>
    </div>      
    );
}

export default Data;