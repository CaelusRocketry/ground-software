import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

import BlockHeader from "./BlockHeader";
import { VALVE_MAP, PADDING } from "../lib/pid";
import { CaelusState } from "../store/reducers";
import config from "../config.json";

const PID = () => {
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

  const [diagram, setDiagram] = useState<{ type: keyof typeof PADDING }>({
    type: "NITROUS",
  });

  return (
    <div style={{ textAlign: "center" }}>
      <BlockHeader colors={["#1835ab", "black", "#8e0004", "black"]}>
        Sensors and Valves Diagram
      </BlockHeader>
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
          src={PADDING[diagram.type]["IMAGE"]["SRC"]}
          id={PADDING[diagram.type]["IMAGE"]["ALT"]}
          alt={PADDING[diagram.type]["IMAGE"]["ALT"]}
          style={{ width: "100%" }}
        />
        {Object.entries(PADDING[diagram.type]["COORDINATES"]["SENSOR"]).map(([loc, sensor]) => (
          <div
            style={{
              position: "absolute",
              // // @ts-expect-error
              left: sensor["TEXT"]["x1"],
              // // @ts-expect-error
              top: sensor["TEXT"]["y1"],
              right: sensor["TEXT"]["x2"],
              bottom: sensor["TEXT"]["y2"],
              borderWidth: "2px",
              borderColor: "#1835ab",
            }}
          >
            <p style={{fontSize: "100%"}}
              className={"diagram" + sensor}
            >
              {sensorExists("pressure", loc)
                ? round(getLast(data.sensorState.sensors.pressure[loc])?.kalman, 1000)
                : ""}
            </p>
          </div>
 
        ))}
        {Object.entries(PADDING[diagram.type]["COORDINATES"]["VALVE"]).map(([loc, valve]) => (
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
      <br />
      <br />
    </div>
  );
};

export default PID;
