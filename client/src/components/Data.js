import React from "react";
import { useSelector } from "react-redux";
import getColor from "../lib/getColor";
import stylizeName from "../lib/stylizeName";

import Block from "./Block";
import BlockHeader from "./BlockHeader";

import PandidBoxed from "../images/pandidboxed.png";

// CONSTANTS
const VALVE_MAP = { 
  1: "OPEN", 
  0: "CLOSED" 
};

const SENSOR_TEXT_PADDING = {
  "PT-5": {
    x: (420/784) * 100 + '%', 
    y: (22/850) * 100 + '%'
  }, 
  "PT-P": {
    x: (635/784) * 100 + '%', 
    y: (262/850) * 100 + '%'
  }, 
  "PT-7": {
    x: (101/784) * 100 + '%', 
    y: (385/850) * 100 + '%'
  }, 
  "PT-8": {
    x: (548/784) * 100 + '%', 
    y: (757/850) * 100 + '%'
  }
};

const VALVE_TEXT_PADDING = {
  "pressurization_valve": {
    x: (404/784) * 100 + '%', 
    y: (210/850) * 100 + '%'
  }, 
  "vent_valve": {
    x: (33/784) * 100 + '%', 
    y: (95/850) * 100 + '%'
  }, 
  "remote_drain_valve": {
    x: (19/784) * 100 + '%', 
    y: (598/850) * 100 + '%'
  }, 
  "main_propellant_valve": {
    x: (317/784) * 100 + '%', 
    y: (736/850) * 100 + '%'
  }
};

const Data = () => {
  const data = useSelector((state) => (
    {
      sensorState: state.data.sensorData,
      valveState: state.data.valveData,
      heartbeatState: state.data.general.heartbeat,
      heartbeatStatus:
        state.data.general.heartbeat_status === undefined
          ? []
          : [["", state.data.general.heartbeat_status]],
      mode: state.data.general.mode,
    }
  ));

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
      <BlockHeader colors={["#0c1f6d", 'black', "#8e0004", 'black']}>Sensors and Valves Diagram</BlockHeader>
      <div style={{position: "relative", textAlign: "center"}} className="flexFont">
        <img src={PandidBoxed} id="pandidboxed" alt="pandidboxed" style={{width: "100%"}}/>
        {Object.keys(SENSOR_TEXT_PADDING).map((sensor) => (
          <p 
            style={{
              position: "absolute",
              left: SENSOR_TEXT_PADDING[sensor]["x"],
              top: SENSOR_TEXT_PADDING[sensor]["y"],
            }} 
            className={"diagram"+sensor}
          >
            {getLast(data.sensorState["pressure"][sensor])}
          </p>
        ))}
        {Object.keys(VALVE_TEXT_PADDING).map((valve) => (
          <p 
            style={{
              position: "absolute",
              left: VALVE_TEXT_PADDING[valve]["x"],
              top: VALVE_TEXT_PADDING[valve]["y"],
            }} 
            className={"diagram"+valve}
          >
            {VALVE_MAP[data.valveState.solenoid[valve]]}
          </p>
        ))}
      </div>
      
      <br />
      <hr />
      <br />

      <BlockHeader colors={['black']}>Sensors</BlockHeader>

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
                <br />
              </>
            )}
          </div>
        ))}
      </Block>

      <br />

      <BlockHeader colors={['black']}>Valves</BlockHeader>
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
                <br />
              </>
            )}
          </div>
        ))}
      </Block>

      <BlockHeader colors={['black']}>Heartbeat</BlockHeader>
      <Block>
        <p style={{ color: getColor(data.heartbeatStatus) }}>
          <span className="font-bold">{"Timestamp: "}</span>
          <span className="font-mono">{data.heartbeatState}s</span>
        </p>
      </Block>

      <BlockHeader colors={['black']}>Mode</BlockHeader>
      <div className={data.mode === "Soft abort" ? abortStyle : blockStyle}>
        <p>{data.mode}</p>
      </div>
    </center>
  );
};

export default Data;
