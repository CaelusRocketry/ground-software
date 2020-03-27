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
    const createDisplay = (arr) => {
        // arr = [[header, sensor_data], [message, [[location, chamber], [type, thermocouple], [value, 147]]], [timestamp, 42]]
        let extendedArray = []
        for (let array = 0; array < arr.length; array++) {
            if (typeof(arr[array]) == Array) { // 100% case since everything is an array

                for (let arrayTwo = 0; arrayTwo < arr[array].length; arrayTwo++) { // iterates through things inside 1st layer arrays

                    if (typeof(arr[array][arrayTwo]) == Array) { // rare case, only for message object --> array

                        for (let arrayThree = 0; arrayThree < arr[array][arrayTwo].length; arrayThree++) { // 
                            
                            if (typeof(arr[array][arrayTwo][arrayThree]) == Array) {

                                for (let arrayFour = 0; arrayFour < arr[array][arrayTwo][arrayThree].length; arrayFour++) {
                                    extendedArray.push(arr[array][arrayTwo][arrayThree][arrayFour]);
                                }
                            }
                            else {
                                extendedArray.push(arr[array][arrayTwo][arrayThree]);
                            }

                        } 
                    }
                    else {
                        extendedArray.push(arr[array][arrayTwo]);
                    }
                }

            }

            else {
                extendedArray.push(arr[array]);
            }
        }

        return extendedArray;
    };

    return (
        <div>
            <body>
                <ol className="list-group" style={style}>
                        <li>
                            {createDisplay(toArray(messages))}
                        </li>
                </ol>
            </body>
        </div>
    );
}

export default Message;