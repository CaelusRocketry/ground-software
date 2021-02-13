import React from "react";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { CaelusState } from "../store/reducers";
import { CSSProperties } from "styled-components";

const style = {
  background: "#F5F5F5",
  padding: "5px",
  marginLeft: "35px",
  overflowY: "scroll" as CSSProperties["overflowY"],
};

const MessagePane = () => {
  const responses = useSelector(
    (state: CaelusState) => state.data.general.responses
  );

  return (
    <div>
      <Header>Messages</Header>
      <ul className="list-group" style={style}>
        {responses
          .slice(0)
          .reverse()
          .map((data, i) => (
            <li key={i} className="list-group-item list-group-item-primary">
              <h3 className="text-lg font-bold">{data.header}</h3>
              <p className="text-xs mb-2">- {data.timestamp} seconds</p>
              {Object.entries(data.message).map(([key, value]) => (
                <p key={key}>
                  {key}: {value}
                </p>
              ))}
              <br />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MessagePane;
