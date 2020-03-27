import React, { useState } from 'react';
import { useSelector } from "react-redux";

const Message = (props) => {
    const [messages, updateMessages] = useState(
        {
        header: "sensor_data", 
        message: {
            "location": "chamber", 
            "type": "thermocouple", 
            "value": (147, 152)
        }, 
        timestamp: 42
    });

    const style = {
        background: "#F5F5F5",
        padding: "5px",
        marginLeft: "35px"
    };

    const toArray = (obj) => {
        let arr = Object.entries(obj);
        
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][0] == "message") {
                arr[i][1] = Object.entries(arr[i][1]);
            }
        }

        console.log(arr)
        return arr;
    };
    return (
        <div>
            <body>
                <ol className="list-group" style={style}>
                        <li>
                            {toArray(messages)[0][0]}<br/>
                            {toArray(messages)[0][1]}<br/>
                            {toArray(messages)[1][0]}:<br/>
                            {toArray(messages)[1][1][0][0]}: {toArray(messages)[1][1][0][1]}<br/>
                            {toArray(messages)[1][1][1][0]}: {toArray(messages)[1][1][1][1]}<br/>
                            {toArray(messages)[1][1][2][0]}: {toArray(messages)[1][1][2][1]}<br/>
                            {toArray(messages)[2]}
                        </li>
                </ol>
            </body>
        </div>
    );
}

export default Message;