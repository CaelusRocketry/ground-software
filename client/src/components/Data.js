import React from "react";
import { useSelector } from "react-redux";

const VALVE_MAP = { 1: "OPEN", 0: "CLOSED" };

const stylizeName = (name) => {
  let spaced = name.split("_").join(" ");
  let words = spaced.split(" ");
  for (let idx in words) {
    words[idx] = words[idx][0].toUpperCase() + words[idx].slice(1);
  }
  return words.join(" ");
};

const Data = () => {
  const data = useSelector((state) => {
    return {
      sensorState: state.data.sensorData,
      valveState: state.data.valveData,
      heartbeatState: state.data.general.heartbeat,
      heartbeatStatus:
        state.data.general.heartbeat_status == undefined
          ? []
          : [["", state.data.general.heartbeat_status]],
      mode: state.data.general.mode,
    };
  });

  const blockStyle = "rounded-lg m-1 p-4 bg-gray-100";
  const abortStyle = "animate-ping rounded-lg m-1 p-4 bg-pink-300";
  const blockHeaderStyle = "text-lg font-bold";
  const groupHeaderStyle = "font-bold mb-1";

  const getLast = (arr) => (arr.length > 0 ? arr[arr.length - 1] : undefined);
  const getColor = (status) => {
    if (status.length === 0) {
      return "black";
    }
    switch (status[status.length - 1][1]) {
      case 3:
        return "green";
      case 2:
        return "orange";
      case 1:
        return "red";
      default:
        return "blue";
    }
  };

  const units = {
    thermocouple: "C",
    pressure: "PSI",
    load: "N",
    timestamp: "s",
  };

  return (
    <center>
      <h3 class={blockHeaderStyle}>Sensors</h3>

      <div class={blockStyle}>
        <div>
          {Object.keys(data.sensorState).map(
            (sensor) =>
              (sensor != "timestamp" && (
                <div>
                  <h4 class={groupHeaderStyle}>{stylizeName(sensor)}</h4>
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
                </div>
              )) ||
              (sensor === "timestamp" && (
                <div>
                  <h4 class={groupHeaderStyle}>
                    {"Timestamp: "}
                    <span className="font-mono font-normal">
                      {getLast(data.sensorState.timestamp)} s
                    </span>
                  </h4>
                </div>
              ))
          )}
        </div>
      </div>

      <br></br>

      <h3 class={blockHeaderStyle}>Valves</h3>

      <div class={blockStyle}>
        <div>
          {Object.keys(data.valveState).map(
            (valve) =>
              (valve != "timestamp" && (
                <div>
                  <h4 class={groupHeaderStyle}>{stylizeName(valve)}</h4>
                  <div className="font-mono">
                    {Object.keys(data.valveState[valve]).map((loc) => (
                      <p>
                        {stylizeName(loc)}:{" "}
                        {VALVE_MAP[data.valveState.solenoid[loc]]}
                      </p>
                    ))}
                  </div>
                  <br></br>
                </div>
              )) ||
              (valve === "timestamp" && (
                <div>
                  <h4 class={groupHeaderStyle}>
                    {"Timestamp: "}
                    <span className="font-mono">
                      {data.valveState.timestamp} s
                    </span>
                  </h4>
                </div>
              ))
          )}
        </div>
      </div>

      <br></br>

      <h3 class={blockHeaderStyle}>Heartbeat</h3>
      <div class={blockStyle}>
        <p style={{ color: getColor(data.heartbeatStatus) }}>
          <span className="font-bold">{"Timestamp: "}</span>
          <span className="font-mono">{data.heartbeatState}s</span>
        </p>
      </div>

      <br></br>

      <h3 class={blockHeaderStyle}>Mode</h3>
      <div class={data.mode == "Soft abort" || data.mode == "Hard abort" ? abortStyle : blockStyle}>
        <p>{data.mode} </p>
      </div>
    </center>
  );
};

export default Data;
