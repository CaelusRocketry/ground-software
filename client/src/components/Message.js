import React, { useState } from 'react';
import { useSelector } from "react-redux";

const Message = (props) => {
    const [messages, updateMessages] = useState([]);
    messages.push(
        {
        header: "sensor_data", 
        message: {
            "location": "chamber", 
            "type": "thermocouple", 
            "value": [147, 152]
        }, 
        timestamp: 42
    });

    const style = {
        background: "#F5F5F5",
        padding: "5px",
        marginLeft: "35px"
    };
    const createDisplay = (obj) => {
        // arr = [[header, sensor_data], [message, [[location, chamber], [type, thermocouple], [value, 147]]], [timestamp, 42]]
        let header = obj.header;
        let message = obj.message;
        let timestamp = obj.timestamp;
        let messageArr = [];
        for(let name in message){
            messageArr.push(name + ": " + message[name]);
        }
        return (
            <div>
                <h3 class="text-lg font-bold">{header}</h3>
                <p class="text-xs mb-2">- {timestamp} seconds</p>
                {messageArr.map(element => (
                    <div>
                        <tb>{element}</tb>
                    </div>
                ))}
                <br></br>
            </div>
        )
    };

    return (
        <div>
            <body>
                <ol className="list-group" style={style}>
                        {messages.map(data => 
                            <li>
                                {createDisplay(data)}
                            </li>    
                        )}
                </ol>
            </body>
        </div>
    );
}

export default Message;