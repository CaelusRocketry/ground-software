import React, { useState } from "react";
import { useSelector } from "react-redux";
import getColor from "../lib/getColor";
import stylizeName from "../lib/stylizeName";

import Block from "./Block";
import BlockHeader from "./BlockHeader";

import Nitrouspid from "../images/nitrouspid.png";
import Ethanolpid from "../images/ethanolpid.png";
import Fullpid from "../images/fullpid.png";
import { string } from "prop-types";

// CONSTANTS
const VALVE_MAP = { 
  1: "OPEN", 
  0: "CLOSED" 
};

const PADDING = {

  "NITROUS" : {
    "IMAGE" : {
      "SRC" : Nitrouspid,
      "ALT" : "nitrouspid",
    },
    "SENSOR" : {
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
    },
    "VALVE" : {
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
    }
  },
  "ETHANOL" : {
    "IMAGE" : {
      "SRC" : Ethanolpid,
      "ALT" : "ethanolpid",
    },
    "SENSOR" : {
      "PT-1": {
        x: (885/1971) * 100 + '%', 
        y: (224/1522) * 100 + '%'
      }, 
      "PT-2": {
        x: (779/1971) * 100 + '%', 
        y: (331/1522) * 100 + '%'
      }, 
      "PT-3": {
        x: (166/1971) * 100 + '%', 
        y: (991/1522) * 100 + '%'
      }, 
      "PT-4": {
        x: (714/1971) * 100 + '%', 
        y: (1147/1522) * 100 + '%'
      }
    },
    "VALVE" : {
      "NCSV-1": {
        x: (274/1971) * 100 + '%', 
        y: (91/1522) * 100 + '%'
      }, 
      "NOSV-2": {
        x: (347/1971) * 100 + '%', 
        y: (517/1522) * 100 + '%'
      }, 
      "pressurization_valve": {
        x: (52/1971) * 100 + '%', 
        y: (1375/1522) * 100 + '%'
      }
    }
  },
  "FULL" : {
    "IMAGE" : {
      "SRC" : Fullpid,
      "ALT" : "fullpid",
    },
    "SENSOR" : {
      "PT-1": {
        x: (1613/3200) * 100 + '%', 
        y: (201/1595) * 100 + '%'
      }, 
      "PT-2": {
        x: (2412/3200) * 100 + '%', 
        y: (460/1595) * 100 + '%'
      }, 
      "PT-3": {
        x: (2201/3200) * 100 + '%', 
        y: (926/1595) * 100 + '%'
      }, 
      "PT-4": {
        x: (1771/3200) * 100 + '%', 
        y: (1427/1595) * 100 + '%'
      },
      "PT-5": {
        x: (1012/3200) * 100 + '%', 
        y: (172/1595) * 100 + '%'
      }, 
      "PT-6": {
        x: (1445/3200) * 100 + '%', 
        y: (379/1595) * 100 + '%'
      }, 
      "PT-7": {
        x: (1041/3200) * 100 + '%', 
        y: (852/1595) * 100 + '%'
      }, 
      "PT-8": {
        x: (1086/3200) * 100 + '%', 
        y: (1255/1595) * 100 + '%'
      },
      "PT-9": {
        x: (1613/3200) * 100 + '%', 
        y: (1109/1595) * 100 + '%'
      },
      "PT-10": {
        x: (1249/3200) * 100 + '%', 
        y: (1110/1595) * 100 + '%'
      }
    },
    "VALVE" : {
      "vent_valve": {
        x: (136/3200) * 100 + '%', 
        y: (104/1595) * 100 + '%'
      }, 
      "pressurization_valve": {
        x: (619/3200) * 100 + '%', 
        y: (716/1595) * 100 + '%'
      }, 
      "remote_drain_valve": {
        x: (669/3200) * 100 + '%', 
        y: (1163/1595) * 100 + '%'
      }, 
      "main_propellant_valve": {
        x: (447/3200) * 100 + '%', 
        y: (1385/1595) * 100 + '%'
      },
      "NCSV-1": {
        x: (2187/3200) * 100 + '%', 
        y: (133/1595) * 100 + '%'
      }, 
      "NOSV-1": {
        x: (2756/3200) * 100 + '%', 
        y: (571/1595) * 100 + '%'
      }, 
      "NCSV-2": {
        x: (2269/3200) * 100 + '%', 
        y: (1478/1595) * 100 + '%'
      }, 
      "NOSV-2": {
        x: (1969/3200) * 100 + '%', 
        y: (1152/1595) * 100 + '%'
      }
    }
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
              left: PADDING[diagram.type]["SENSOR"][sensor]["x"],
              top: PADDING[diagram.type]["SENSOR"][sensor]["y"],
            }} 
            className={"diagram"+sensor}
          >
            {getLast(data.sensorState["pressure"][sensor])}{"hi"}
          </p>
        ))}
        {Object.keys(PADDING[diagram.type]["VALVE"]).map((valve) => (
          <p 
            style={{
              position: "absolute",
              left: PADDING[diagram.type]["VALVE"][valve]["x"],
              top: PADDING[diagram.type]["VALVE"][valve]["y"],
            }} 
            className={"diagram"+valve}
          >
            {VALVE_MAP[data.valveState.solenoid[valve]]}{"hi"}
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
