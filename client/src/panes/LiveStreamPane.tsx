import React from "react";

import "../index.css";
import { useSelector } from "react-redux";

import { VALVE_MAP, PADDING } from "../lib/livestreampid";
import { CaelusState } from "../store/reducers";
import config from "../config.json";
import Livestreambase from "../images/livestream/LivestreamBaseEthanol.png";
import { useState } from "react";

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
  
  const [diagram, setDiagram] = useState<{ type: keyof typeof PADDING }>({
    type: "NITROUS",
  });

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
        {Object.entries(PADDING["ETHANOL"]["COORDINATES"]["LABELS"]).map(([loc, label]) => (
          <div
            style={{
              position: "absolute",
              // // @ts-expect-error
              left: label["TEXT"]["x1"],
              // // @ts-expect-error
              top: label["TEXT"]["y1"],
              right: label["TEXT"]["x2"],
              bottom: label["TEXT"]["y2"],
              // borderWidth: "2px",
              display: "table-cell",
              margin: "auto",
            }}
          >
            {
              (loc == "N2OSTORAGE" || loc == "N2OFLIGHT")
                ? 
                  <div style={{fontSize: label["FONTSIZE"],color:"white", marginTop:label["TOP"]}}>
                    <p style={{display: "inline", color: "white"}}>N</p>
                    <sub style={{display: "inline", color: "white"}} >2</sub>
                    <p style={{display: "inline", color: "white"}}>O </p> 
                    <p style={{display: "inline", color: "white"}}>
                      {(loc == "N2OSTORAGE" || loc == "N2OFLIGHT") ? loc.substring(3) : loc}
                    </p>
                  </div>

                : <div>
                    <p style={{display: "inline", fontSize: label["FONTSIZE"], color: "white", marginTop: label["TOP"]}}
                      className={"diagram" + label}
                    >
                      {(loc == "N2OSTORAGE" || loc == "N2OFLIGHT") ? loc.substring(3) : loc}
                    </p>
                  </div>
            }

          </div>
 
        ))}
        {Object.entries(PADDING["ETHANOL"]["COORDINATES"]["SENSOR"]["PRESSURE"]).map(([loc, pressureSensor]) => (
          <div 
            style={{
              position: "absolute",
              left: pressureSensor["TEXT"]["x1"],
              top: pressureSensor["TEXT"]["y1"],
              right: pressureSensor["TEXT"]["x2"],
              bottom: pressureSensor["TEXT"]["y2"],
              // borderWidth: "2px",
              display: "inline",
            }}
          >
            <p className={"diagram" + pressureSensor} style={{fontSize: pressureSensor["FONTSIZE"], marginTop: pressureSensor["TOP"], color: "white"}}>
              {sensorExists("pressure", loc)
                  ? round(getLast(data.sensorState.sensors.pressure[loc])?.kalman, 1000) + " PSI"
                  : "waiting..."}
            </p>
          </div>
        ))}
        {Object.entries(PADDING["ETHANOL"]["COORDINATES"]["SENSOR"]["THRUST"]).map(([loc, thrustSensor]) => (
          <div 
            style={{
              position: "absolute",
              left: thrustSensor["TEXT"]["x1"],
              top: thrustSensor["TEXT"]["y1"],
              right: thrustSensor["TEXT"]["x2"],
              bottom: thrustSensor["TEXT"]["y2"],
              // borderWidth: "2px",
              fontSize: "10vw",
              display: "inline",
            }}
          >
            <p className={"diagram" + thrustSensor} style={{fontSize: "10px", color: "white"}}>
              {sensorExists("pressure", loc)
                  ? round(getLast(data.sensorState.sensors.pressure[loc])?.kalman, 1000)
                  : ""}
            </p>
          </div>
        ))}
        {Object.entries(PADDING["ETHANOL"]["COORDINATES"]["VALVES"]).map(([loc, valve]) => (
          <div 
            style={{
              position: "absolute",
              left: valve["TEXT"]["x1"],
              top: valve["TEXT"]["y1"],
              right: valve["TEXT"]["x2"],
              bottom: valve["TEXT"]["y2"],
              // borderWidth: "2px",
              fontSize: "10vw",
              display: "inline",
              margin: "9px",
              borderRadius: "50px",
              backgroundColor:
                valveExists(loc)
                  ? VALVE_MAP[data.valveState.valves.solenoid[loc]] === "CLOSED"
                      ? "red"
                      : "green"
                  : ""
            }}
          >
          </div>
        ))}
      </div>
    </div>
  

  )
};

export default LivestreamPane;
