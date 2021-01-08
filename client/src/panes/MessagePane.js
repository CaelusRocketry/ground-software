import React from 'react';
import Header from "../components/Header";
import { useSelector } from "react-redux";

const MessagePane = () => {
    const style = {
        background: "#F5F5F5",
        padding: "5px",
        marginLeft: "35px",
        overflowY: "scroll"
    };

    const responses = useSelector(state => state.data.general.responses);

    const messageArray = (data) => {
        let header = data.header;
        let message = data.message;
        let timestamp = data.timestamp;
        let messageArr = [];
        let headerArr = []
        for(let data in header){
            headerArr.push(data + ": " + message[data]);
        }
        for(let name in message){
            messageArr.push(name + ": " + message[name]);
        }
        return {headerArr, messageArr, timestamp};
    };

    return (
    <div>
        <Header title="Messages" />
        {/* {responses.length} */}
        <ul className="list-group" style={style}>
            {responses.slice(0).reverse().map((data, i) => 
                <li key={i} className="list-group-item list-group-item-primary">
                    {responses.length - i}

                    <h3 class="text-lg font-bold">{messageArray(data).headerArr.map((element, index) => (
                        <p key={index}>{element}</p>
                    ))}
                    </h3>
                    <p class="text-xs mb-2">- {messageArray(data).timestamp} seconds</p>
                    {messageArray(data).messageArr.map((element, index) => (
                        <p key={index}>{element}</p>
                    ))}
                    <br></br>

                </li>
            )}
        </ul>
    </div>
    );
};

export default MessagePane;