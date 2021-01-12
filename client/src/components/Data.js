import React from "react";
import { useSelector } from "react-redux";
import getColor from "../lib/getColor";
import stylizeName from "../lib/stylizeName";

import Block from "./Block";
import BlockHeader from "./BlockHeader";

const VALVE_MAP = { 1: "OPEN", 0: "CLOSED" };

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
                { console.log(Object.keys(data.valveState[valve])) }
                { console.log(data.valveState)}
                  {Object.keys(data.valveState[valve]).map((loc) => (
                    <p>
                      {stylizeName(loc)}:{" "}
                      {data.valveState.solenoid[loc].state}
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
