import React from "react";
import Header from "../components/Header";
import { useSelector } from "react-redux";

const MessagePane = () => {
  const style = {
    background: "#F5F5F5",
    padding: "5px",
    marginLeft: "35px",
    overflowY: "scroll",
  };

  const responses = useSelector((state) => state.data.general.responses);

  const dictToArr = (message) => {
    let messageArr = [];
    for (let name in message) {
      messageArr.push(name + ": " + message[name]);
    }
    return messageArr;
  };

  return (
    <div>
      <Header>Messages</Header>
      <ul className="list-group" style={style}>
        {responses
          .slice(0)
          .reverse()
          .map((data, i) => (
            <li key={i} className="list-group-item list-group-item-primary">
              {/* {responses.length - i} */}

              <h3 className="text-lg font-bold">
                {data.header}
                { header=> (
                  <p key={index}>{element}</p>
                )}
              </h3>
              <p className="text-xs mb-2">
                - {data.timestamp} {seconds}
              </p>
              {dictToArr(data.message).map((element, index) => (
                <p key={index}>{element}</p>
              ))}
              <br></br>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MessagePane;
