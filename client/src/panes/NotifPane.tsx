import React from 'react';
import {useSelector} from "react-redux";
import Header from "../components/Header";
import {CaelusState} from "../store/reducers";
import config from "../config.json";
const NotifPane = () => {
    const responses = useSelector(
        (state: CaelusState) => state.data.general.responses
      );
    function s3(data: any, i:any){
        if(data.header!="Stage progression request"){
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
        <ul className="list-group">
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