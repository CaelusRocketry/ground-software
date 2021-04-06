import React from 'react';
import {useSelector} from "react-redux";
import Header from "../components/Header";
import {CaelusState} from "../store/reducers";
import config from "../config.json";
import { CSSProperties } from "styled-components";
const style = {
  background: "#F5F5F5",
  padding: "5px",
  marginLeft: "35px",
  overflowY: "scroll" as CSSProperties["overflowY"],
};
const NotifPane = () => {
    const headers = config["notifications"]["list"];
    const responses = useSelector(
        (state: CaelusState) => state.data.general.responses
      );
    function s3(data: any, i:any){
        if(headers.indexOf(data.header)!=-1){
        return(
        <li key={i} className="list-group-item list-group-item-primary">
              <h3 className="text-lg font-bold">{data.header}</h3>
              <p className="text-xs mb-2">- {data.timestamp} seconds</p>
              {Object.entries(data.message ?? {}).map(([key, value]) => (
                <p key={key}>
                  {key}: {value}
                </p>
              ))}
              <br />
            </li>);
        }
    }
    function Selector(){
        return(
        <ul className="list-group" style={style}>
            {responses.slice(0).map((data, i) => (
            s3(data, i)
          ))}
        </ul>
        );
    }
    return(
    <div>
        <Header>Notifications</Header>
        <Selector/>
    </div>
    );
};
export default NotifPane;