import React, { useState } from "react";
import { useSelector } from "react-redux";

import BlockHeader from "./BlockHeader";
import { VALVE_MAP, PADDING } from "../lib/pid";
import { CaelusState } from "../store/reducers";

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
      <BlockHeader colors={["#0c1f6d", "black", "#8e0004", "black"]}>
        Sensors and Valves Diagram
      </BlockHeader>
      <select
        onChange={(e) => {
   
          setDiagram({ type: e.target.value as keyof typeof PADDING });
        }}
      >
        <option value="NITROUS">Nitrous</option>
        <option value="ETHANOL">Ethanol</option>
        <option value="FULL">Full</option>
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
        {Object.keys(PADDING[diagram.type]["SENSOR"]).map((sensor) => (
          <p
            style={{
              position: "absolute",
              
              left: PADDING[diagram.type].SENSOR[sensor]["x"] * 100 + "%",
              
              top: PADDING[diagram.type].SENSOR[sensor]["y"] * 100 + "%",
            }}
            className={"diagram" + sensor}
          >
            {sensorExists("pressure", sensor)
              ? round(getLast(data.sensorState.sensors.pressure[sensor])?.kalman, 1000)
              : ""}
          </p>
        ))}
        {Object.entries(PADDING[diagram.type].VALVE).map(([loc, valve]) => (
          <p
            style={{
              position: "absolute",
              left: valve.x * 100 + "%",
              top: valve.y * 100 + "%",
            }}
            className={"diagram" + valve}
          >
            {valveExists(loc)
              ? VALVE_MAP[data.valveState.valves.solenoid[loc]]
              : ""
            }
          </p>
        ))}
      </div>
      <br />
      <br />
    </div>
  );
};

export default PID;
