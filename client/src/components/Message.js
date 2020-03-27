import React, { useState } from 'react';
import { useSelector } from "react-redux";

const Message = (props) => {
    const [messages, updateMessages] = useState([
        {
        header: "sensor_data", 
        message: {
            "location": "chamber", 
            "type": "thermocouple", 
            "value": (147, 152)
        }, 
        timestamp: 42
    }]);

    const style = {
        background: "#F5F5F5",
        padding: "5px",
        marginLeft: "35px"
    };
    return (
        <div>
            <body>
                <ol className="list-group" style={style}>
                    {messages.map(message => (
                        <li key={message} className="list-group-item list-group-item-primary">
                            {message}
                        </li>
                    ))}
                </ol>
            </body>
        </div>
    );
}

export default Message;