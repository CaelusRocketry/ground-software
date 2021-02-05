import React from "react";
import { useSelector } from "react-redux";
import getColor from "../lib/getColor";
import stylizeName from "../lib/stylizeName";

import Block from "./Block";
import BlockHeader from "./BlockHeader";

import PandidBoxed from "../images/pandidboxed.png";

const VALVE_MAP = { 1: "OPEN", 0: "CLOSED" };
const SENSOR_TEXT_PADDING = {"PT-5":{x: (420/784), y: 22/850}, "PT-P":{x: 635/784, y:262/850}, "PT-7":{x:101/784, y:385/850}, "PT-8":{x:548/784, y:757/850}};
const VALVE_TEXT_PADDING = {"pressurization_valve":{x: 404/784, y: 210/850}, "vent_valve":{x: 33/784, y:95/850}, "remote_drain_valve":{x:19/784, y:598/850}, "main_propellant_valve":{x:317/784, y:736/850}};

const Data = () => {
  const data = useSelector((state) => {
    return {
      sensorState: state.data.sensorData,
      valveState: state.data.valveData,
      heartbeatState: state.data.general.heartbeat,
      heartbeatStatus:
        state.data.general.heartbeat_status === undefined
          ? []
          : [["", state.data.general.heartbeat_status]],
      mode: state.data.general.mode,
    };
  });

  const blockStyle = "rounded-lg m-1 p-4 bg-gray-100";
  const abortStyle = "animate-ping rounded-lg m-1 p-4 bg-pink-300";
  const groupHeaderStyle = "font-bold mb-1";

  const getLast = (arr) => (arr.length > 0 ? arr[arr.length - 1] : undefined);

  const units = {
    thermocouple: "C",
    pressure: "PSI",
    load: "N",
    timestamp: "s",
  };

  return (
    <center>
      <BlockHeader><span style={{color: "#0c1f6d"}}>Sensors</span> and <span style={{color: "#8e0004"}}>Valves</span> Diagram</BlockHeader>
      <div style={{padding: "",position: "relative",textAlign:"center"}} className="flexFont">
        <img src={PandidBoxed} id="pandidboxed" alt="pandidboxed" style={{padding: "",width: "100%"}}/>
        {Object.keys(SENSOR_TEXT_PADDING).map((sensor) => (
          <p style={{
            position: "absolute",
            left: SENSOR_TEXT_PADDING[sensor]["x"]*100+"%",
            top: SENSOR_TEXT_PADDING[sensor]["y"]*100+"%",
          }} className={"diagram"+sensor}>
            {getLast(data.sensorState["pressure"][sensor])}
          </p>
        ))}
        {Object.keys(VALVE_TEXT_PADDING).map((valve) => (
          <p style={{
            position: "absolute",
            left: VALVE_TEXT_PADDING[valve]["x"]*100+"%",
            top: VALVE_TEXT_PADDING[valve]["y"]*100+"%",
          }} className={"diagram"+valve}>
            {VALVE_MAP[data.valveState.solenoid[valve]]}
          </p>
        ))}
      </div>
      
      <br></br>
      <hr></hr>
      <br></br>
      <BlockHeader>Sensors</BlockHeader>

      <Block>
        {Object.keys(data.sensorState).map((sensor) => (
          <div>
            <h4 className={groupHeaderStyle}>{stylizeName(sensor)}</h4>
            {sensor === "timestamp" ? (
              <>
                {"Timestamp: "}
                <span className="font-mono font-normal">
                  {getLast(data.sensorState.timestamp)} s
                </span>
              </>
            ) : (
              <>
                <div className="font-mono">
                  {Object.keys(data.sensorState[sensor]).map((loc) => (
                    <p
                      style={{
                        color: getColor(data.sensorState[sensor][loc]),
                      }}
                    >
                      {stylizeName(loc)}:{" "}
                      {getLast(data.sensorState[sensor][loc])} {units[sensor]}
                    </p>
                  ))}
                </div>
                <br></br>
              </>
            )}
          </div>
        ))}
      </Block>

      <br></br>

      <BlockHeader>Valves</BlockHeader>
      <Block>
        {Object.keys(data.valveState).map((valve) => (
          <div>
            <h4 className={groupHeaderStyle}>{stylizeName(valve)}</h4>

            {valve === "timestamp" ? (
              <>
                {"Timestamp: "}
                <span className="font-mono">{data.valveState.timestamp} s</span>
              </>
            ) : (
              <>
                <div className="font-mono">
                  {Object.keys(data.valveState[valve]).map((loc) => (
                    <p>
                      {stylizeName(loc)}:{" "}
                      {VALVE_MAP[data.valveState.solenoid[loc]]}
                    </p>
                  ))}
                </div>
                <br></br>
              </>
            )}
          </div>
        ))}
      </Block>

      <BlockHeader>Heartbeat</BlockHeader>
      <Block>
        <p style={{ color: getColor(data.heartbeatStatus) }}>
          <span className="font-bold">{"Timestamp: "}</span>
          <span className="font-mono">{data.heartbeatState}s</span>
        </p>
      </Block>

      <BlockHeader>Mode</BlockHeader>
      <div className={data.mode === "Soft abort" ? abortStyle : blockStyle}>
        <p>{data.mode}</p>
      </div>
    </center>
  );
};

export default Data;
