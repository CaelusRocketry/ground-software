import React from "react";
import { useSelector } from "react-redux";
import getColor from "../lib/getColor";
import stylizeName from "../lib/camelize";
import { CaelusState } from "../store/reducers";

import Block from "./Block";
import BlockHeader from "./BlockHeader";
import NitrousPID from "../images/nitrouspid.png";

const VALVE_MAP = {
  1: "OPEN",
  0: "CLOSED",
};

const SENSOR_TEXT_PADDING = {
  "PT-5": {
    x: (420 / 784) * 100 + "%",
    y: (22 / 850) * 100 + "%",
  },
  "PT-P": {
    x: (635 / 784) * 100 + "%",
    y: (262 / 850) * 100 + "%",
  },
  "PT-7": {
    x: (101 / 784) * 100 + "%",
    y: (385 / 850) * 100 + "%",
  },
  "PT-8": {
    x: (548 / 784) * 100 + "%",
    y: (757 / 850) * 100 + "%",
  },
};

const VALVE_TEXT_PADDING = {
  pressurization_valve: {
    x: (404 / 784) * 100 + "%",
    y: (210 / 850) * 100 + "%",
  },
  vent_valve: {
    x: (33 / 784) * 100 + "%",
    y: (95 / 850) * 100 + "%",
  },
  remote_drain_valve: {
    x: (19 / 784) * 100 + "%",
    y: (598 / 850) * 100 + "%",
  },
  main_propellant_valve: {
    x: (317 / 784) * 100 + "%",
    y: (736 / 850) * 100 + "%",
  },
};

const Data = () => {
  const data = useSelector((state: CaelusState) => {
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

  const getLast: <T>(arr: T[]) => T | undefined = (arr) =>
    arr.length > 0 ? arr[arr.length - 1] : undefined;

  const units = {
    thermocouple: "C",
    pressure: "PSI",
    load: "N",
    timestamp: "s",
  };

  return (
    <div style={{ textAlign: "center" }}>
      <BlockHeader colors={["#0c1f6d", "black", "#8e0004", "black"]}>
        Sensors and Valves Diagram
      </BlockHeader>
      <div
        style={{ position: "relative", textAlign: "center" }}
        className="flexFont"
      >
        <img
          src={NitrousPID}
          id="nitrouspid"
          alt="nitrouspid"
          style={{ width: "100%" }}
        />
        {Object.entries(SENSOR_TEXT_PADDING).map(([sensor, padding]) => (
          <p
            style={{
              position: "absolute",
              left: padding.x,
              top: padding.y,
            }}
            className={"diagram" + sensor}
          >
            {getLast(data.sensorState.sensors.pressure[sensor])}
          </p>
        ))}
        {Object.entries(VALVE_TEXT_PADDING).map(([valve, padding]) => (
          <p
            style={{
              position: "absolute",
              left: padding.x,
              top: padding.y,
            }}
            className={"diagram" + valve}
          >
            {VALVE_MAP[data.valveState.valves.solenoid[valve]]}
          </p>
        ))}
      </div>

      <br />
      <hr />
      <br />

      <BlockHeader colors={["black"]}>Sensors</BlockHeader>
      <Block>
        <div>
          <h4 className={groupHeaderStyle}>Timestamp</h4>
          Timestamp:{" "}
          <span className="font-mono font-normal">
            {getLast(data.sensorState.timestamps)} s
          </span>
        </div>
        {Object.entries(data.sensorState.sensors).map(([type, locations]) => (
          <div key={type}>
            <h4 className={groupHeaderStyle}>{stylizeName(type)}</h4>

            <div className="font-mono">
              {Object.keys(locations).map((loc) => {
                return (
                  <p
                    style={{
                      color:
                        "green" /*sensorColor(data.sensorState[sensor], progress)*/,
                    }}
                    key={type + "." + loc}
                  >
                    {stylizeName(loc) + " "}
                    {getLast(locations[loc])?.kalman}{" "}
                    {
                      /*@ts-ignore*/
                      units[type]
                    }
                  </p>
                );
              })}
            </div>
            <br />
          </div>
        ))}
      </Block>

      <br></br>

      <BlockHeader colors={["black"]}>Valves</BlockHeader>
      <Block>
        <div>
          <h4 className={groupHeaderStyle}>Timestamp</h4>

          {"Timestamp: "}
          <span className="font-mono">{data.valveState.timestamp} s</span>
        </div>

        {Object.keys(data.valveState.valves).map((valve, idx) => (
          <div key={idx}>
            <h4 className={groupHeaderStyle}>{stylizeName(valve)}</h4>
            <div className="font-mono">
              {Object.keys(data.valveState.valves[valve]).map((loc) => (
                <p key={valve + "." + loc}>
                  {stylizeName(loc)}:{" "}
                  {VALVE_MAP[data.valveState.valves.solenoid[loc]]}
                </p>
              ))}
            </div>
            <br />
          </div>
        ))}
      </Block>

      <BlockHeader colors={["black"]}>Heartbeat</BlockHeader>
      <Block>
        <p style={{ color: getColor(data.heartbeatStatus) }}>
          <span className="font-bold">{"Timestamp: "}</span>
          <span className="font-mono">{data.heartbeatState}s</span>
        </p>
      </Block>

      <BlockHeader colors={["black"]}>Mode</BlockHeader>
      <div className={data.mode === "Soft abort" ? abortStyle : blockStyle}>
        <p>{data.mode}</p>
      </div>
    </div>
  );
};

export default Data;
