import React, { useState } from "react";
import { useSelector } from "react-redux";

import BlockHeader from "./BlockHeader";
import {VALVE_MAP, PADDING} from "../lib/pid";

const PID = () => {
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

  const getLast = (arr) => (arr.length > 0 ? arr[arr.length - 1] : undefined);
  const sensorExists = (sensorType, sensorLoc) => sensorType in data.sensorState && sensorLoc in data.sensorState[sensorType];
  const valveExists = (valveLoc) => valveLoc in data.valveState.solenoid;

  const [diagram, setDiagram] = useState({
    type : "NITROUS",
  });

  return (
    <center>
      <BlockHeader colors={["#0c1f6d", 'black', "#8e0004", 'black']}>Sensors and Valves Diagram</BlockHeader>
      <select 
        onChange = {(e) => {setDiagram({type: e.target.value});}}
      >
        <option value="NITROUS">Nitrous</option>
        <option value="ETHANOL">Ethanol</option>
        <option value="FULL">Full</option>
      </select>

      <div style={{position: "relative", textAlign: "center"}} className="flexFont">

        <img 
          src={PADDING[diagram.type]["IMAGE"]["SRC"]} 
          id={PADDING[diagram.type]["IMAGE"]["ALT"]} 
          alt={PADDING[diagram.type]["IMAGE"]["ALT"]} 
          style={{width: "100%"}}
        />
        {Object.keys(PADDING[diagram.type]["SENSOR"]).map((sensor) => (
          <p 
            style={{
              position: "absolute",
              left: PADDING[diagram.type]["SENSOR"][sensor]["x"] * 100 + "%",
              top: PADDING[diagram.type]["SENSOR"][sensor]["y"]  * 100 + "%",
            }} 
            className={"diagram"+sensor}
          >
            {sensorExists("pressure", sensor) ? getLast(data.sensorState["pressure"][sensor]) : ""}
          </p>
        ))}
        {Object.keys(PADDING[diagram.type]["VALVE"]).map((valve) => (
          <p 
            style={{
              position: "absolute",
              left: PADDING[diagram.type]["VALVE"][valve]["x"]  * 100 + "%",
              top: PADDING[diagram.type]["VALVE"][valve]["y"]  * 100 + "%",
            }} 
            className={"diagram" + valve}
          >
            {valveExists(valve) ? VALVE_MAP[data.valveState.solenoid[valve]] : ""}
          </p>
        ))}
      </div>
      <br /><br />
    </center>
  );
};

export default PID;
