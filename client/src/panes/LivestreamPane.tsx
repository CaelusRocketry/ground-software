import React from "react";

import Header from "../components/Header";
import "../index.css";
import { useSelector } from "react-redux";

import { VALVE_MAP, PADDING } from "../lib/livestreampid";
import { CaelusState } from "../store/reducers";
import config from "../config.json";
import Livestreambase from "../images/livestream/LivestreamBaseNitrous.png";
import { isReturnStatement } from "typescript";

const LivestreamPane = () => {

  const data = useSelector((state: CaelusState) => ({
    sensorState: state.data.sensorData,
    valveState: state.data.valveData,
  }));

  const getLast: <T>(arr: T[]) => T | undefined = (arr) =>
    arr.length > 0 ? arr[arr.length - 1] : undefined;
    
  const round = (num: number | undefined, precision: number): number | undefined => {
    let rounded = num ? Math.round(num * precision) / precision : undefined;
    return rounded;
  };

  const sensorExists = (
    sensorType: keyof typeof data.sensorState.sensors,
    sensorLoc: string
  ) =>
    sensorType in data.sensorState.sensors &&
    sensorLoc in data.sensorState.sensors[sensorType];
  const valveExists = (valveLoc: string) =>
    valveLoc in data.valveState.valves.solenoid;


  return(
  <div style={{ textAlign: "center" }}>
      <select           
        onChange={(e) => {
          // @ts-expect-error
          setDiagram({ type: e.target.value });
        }}
      >
        <option value="NITROUS">{config.test_type.Nitrous}</option>
        <option value="ETHANOL">{config.test_type.Ethanol}</option>
        <option value="FULL">{config.test_type.Full}</option>
      </select>

      <div
        style={{ position: "relative", textAlign: "center" }}
        className="flexFont"
      >
        <img
          src={Livestreambase}
          id={"livestreambase"}
          alt={"livestreambase"}
          style={{ width: "100%" }}
        />
        {Object.entries(PADDING["NITROUS"]["COORDINATES"]["LABELS"]).map(([loc, label]) => (
          <div
            style={{
              position: "absolute",
              // // @ts-expect-error
              left: label["TEXT"]["x1"],
              // // @ts-expect-error
              top: label["TEXT"]["y1"],
              right: label["TEXT"]["x2"],
              bottom: label["TEXT"]["y2"],
              borderWidth: "2px",
              borderColor: "#1835ab",
            }}
          >
            <p style={{fontSize: "100%"}}
              className={"diagram" + label}
            >
              {sensorExists("pressure", loc)
                ? round(getLast(data.sensorState.sensors.pressure[loc])?.kalman, 1000)
                : ""}
            </p>
          </div>
 
        ))}
        {Object.entries(PADDING["NITROUS"]["COORDINATES"]["SENSOR"]["PRESSURE"]).map(([loc, pressureSensor]) => (
          <div 
            style={{
              position: "absolute",
              left: pressureSensor["TEXT"]["x1"],
              top: pressureSensor["TEXT"]["y1"],
              right: pressureSensor["TEXT"]["x2"],
              bottom: pressureSensor["TEXT"]["y2"],
              borderWidth: "2px",
              borderColor: "#8e0004",
              fontSize: "10vw",
              display: "inline",
            }}
          >
            <p className={"diagram" + pressureSensor} style={{fontSize: "10px"}}>
              {valveExists(loc)
                ? VALVE_MAP[data.valveState.valves.solenoid[loc]]
                : ""
              }
            </p>
          </div>
        ))}
        {Object.entries(PADDING["NITROUS"]["COORDINATES"]["SENSOR"]["THRUST"]).map(([loc, thrustSensor]) => (
          <div 
            style={{
              position: "absolute",
              left: thrustSensor["TEXT"]["x1"],
              top: thrustSensor["TEXT"]["y1"],
              right: thrustSensor["TEXT"]["x2"],
              bottom: thrustSensor["TEXT"]["y2"],
              borderWidth: "2px",
              borderColor: "#8e0004",
              fontSize: "10vw",
              display: "inline",
            }}
          >
            <p className={"diagram" + thrustSensor} style={{fontSize: "10px"}}>
              {valveExists(loc)
                ? VALVE_MAP[data.valveState.valves.solenoid[loc]]
                : ""
              }
            </p>
          </div>
        ))}
        {Object.entries(PADDING["NITROUS"]["COORDINATES"]["VALVES"]).map(([loc, valve]) => (
          <div 
            style={{
              position: "absolute",
              left: valve["TEXT"]["x1"],
              top: valve["TEXT"]["y1"],
              right: valve["TEXT"]["x2"],
              bottom: valve["TEXT"]["y2"],
              borderWidth: "2px",
              borderColor: "#8e0004",
              fontSize: "10vw",
              display: "inline",
            }}
          >
            <p className={"diagram" + valve} style={{fontSize: "10px"}}>
              {valveExists(loc)
                ? VALVE_MAP[data.valveState.valves.solenoid[loc]]
                : ""
              }
            </p>
          </div>
        ))}
      </div>
    </div>
  

  )
};

export default LivestreamPane;
