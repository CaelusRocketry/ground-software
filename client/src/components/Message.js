import React from 'react';

const Message = (props) => {
    let header = props.data.header;
    let message = props.data.message;
    let timestamp = props.data.timestamp;
    let messageArr = [];
    for(let name in message){
        messageArr.push(name + ": " + message[name]);
    }
    return (
        <div>
            <h3 class="text-lg font-bold">{header}</h3>
            <p class="text-xs mb-2">- {timestamp} seconds</p>
            {messageArr.map((element, i) => (
                <p key={i}>{element}</p>
            ))}
            <br></br>
        </div>
    )
}

export default Message;