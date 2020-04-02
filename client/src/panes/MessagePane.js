import React from 'react';
import Message from '../components/Message';
import Header from "../components/Header";
import { useSelector } from "react-redux";

const MessagePane = () => {
    const style = {
        background: "#F5F5F5",
        padding: "5px",
        marginLeft: "35px"
    };

    const responses = useSelector((state) => {
//        console.log("STATE");
//        console.log(state);
//        console.log(state.data.general.responses.length);
        return state.data.general.responses;
    });


    return (
    <div>
        <Header title="Messages" />
        {responses.length}
        <div style={{overflowY: "scroll"}}>
            <ol className="list-group" style={style}>
                    {responses.slice(0).reverse().map((data, i) => 
                        <li key={i}>
                            {i}
                            <Message data={data} />
                        </li>
                    )}
            </ol>
        </div>
    </div>
    );
};

export default MessagePane;