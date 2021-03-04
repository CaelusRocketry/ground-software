import React from "react";
import { useSelector } from "react-redux";
import camelize from "../lib/camelize";
import getColor from "../lib/getColor";
import { VALVE_MAP } from "../lib/pid";
import { CaelusState } from "../store/reducers";
import Block from "./Block";
import BlockHeader from "./BlockHeader";

const DataBlock = () => {
  const data = useSelector((state: CaelusState) => ({
    sensorState: state.data.sensorData,
    valveState: state.data.valveData,
    heartbeatState: state.data.general.heartbeat,
    heartbeatStatus:
      state.data.general.heartbeat_status === undefined
        ? []
        : [["", state.data.general.heartbeat_status]],
    mode: state.data.general.mode,
  }));

  const blockStyle = "rounded-lg m-1 p-4 bg-gray-100";
  const abortStyle = "animate-ping rounded-lg m-1 p-4 bg-pink-300";
  const groupHeaderStyle = "font-bold mb-1";
  console.log('----------------------VALVE-------------------------------');
  console.log(data.valveState.valves.solenoid.main_propellant_valve);

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
            <h4 className={groupHeaderStyle}>{camelize(type)}</h4>

            <div className="font-mono">
              {Object.keys(locations).map((loc) => {
                return (
                  <p
                    style={{
                      color:
                        "green" /*getColor(data.sensorState[sensor][loc])*/,
                    }}
                    key={type + "." + loc}
                  >
                    {camelize(loc) + " "}
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

      <br />

      <BlockHeader colors={["black"]}>Valves</BlockHeader>
      <Block>
        <div>
          <h4 className={groupHeaderStyle}>Timestamp</h4>

          {"Timestamp: "}
          <span className="font-mono">{data.valveState.timestamp} s</span>
        </div>

        {Object.keys(data.valveState.valves).map((valve, idx) => (
          <div key={idx}>
            <h4 className={groupHeaderStyle}>{camelize(valve)}</h4>
            <div className="font-mono">
              {Object.keys(data.valveState.valves[valve]).map((loc) => (
                <p key={valve + "." + loc}>
                  {camelize(loc)}:{" "}{VALVE_MAP[data.valveState.valves.solenoid[loc]]}
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

export default DataBlock;
