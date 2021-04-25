import React, { useRef, useState, useCallback } from "react";
import ButtonPaneSelector from "./ButtonPaneSelector";
import { countDownStart } from "..";
import { useSelector } from "react-redux";
import {
  actuateValve,
  progressStage,
  requestSensorData,
  requestValveData,
  softAbort,
  undoSoftAbort,
} from "../api";import { CaelusState } from "../store/reducers";
import caelusLogger from "../lib/caelusLogger";
import config from "../config.json";
import { Console } from "node:console";
import {
  actuationTypeNames,
  sensorLocationNames,
  SensorLocations,
  sensorLocations,
  sensorTypeNames,
  sensorTypes,
  stageNames,
  stages,
  valveLocationNames,
  ValveLocations,
  valveLocations,
  valveTypeNames,
  valveTypes,
} from "../lib/locationNames";

var disable_auth = false
if(!config.Authorized_IPs.includes(window.location.hostname) )
  disable_auth = true
else
  console.log("Authorized access to Actions.")

function onClickedActuateValve(
  valveLocation: string,
  valveType: string,
  actuationType: string,
  actuationPriority?: string
) {
  caelusLogger("button-press", {
    button: "actuate_valves",
    info: { valveLocation, valveType, actuationPriority },
  });
  if (!actuationPriority ) {
    window.alert("You haven't selected something for each dropdown.");
  } else {
    if(disable_auth) {
      window.alert("You do not have authorization to actuate valves.")
    } else if (  window.confirm(`Are you sure you want to actuate the ${valveType} valve at ${valveLocation} w/ priority ${actuationPriority}`) ) {
      actuateValve({
        valveType,
        valveLocation,
        actuationType,
        actuationPriority,
      });
    }
  }
}

function onClickedSoftAbort(type: "soft") {
  if(disable_auth) {
    window.alert("You do not have authorization to issue a soft abort.")
  } else if (window.confirm("Are you sure you want to " + type + " abort?")) {
    caelusLogger("button-press", "Confirmed abort");
    softAbort();
  }
}

function onClickedUndoSoftAbort() {
  // TODO: If the current mode isn't Soft Abort, don't allow this (gray out the button, and if they somehow click on it then alert them that its a disallowed action)
  if(disable_auth) {
    window.alert("You do not have authorization to undo a soft abort.")
  } else if (window.confirm("Are you sure you want to undo soft abort?")) {
    caelusLogger("button-press", "Confirmed undo abort");
    undoSoftAbort();
  }
}

function onClickedUndoAbort() {
    // TODO: If the current mode isn't Soft Abort, don't allow this (gray out the button, and if they somehow click on it then alert them that its a disallowed action)
  if(disable_auth) {
    window.alert("You do not have authorization to undo a soft abort.")
  } else if (window.confirm("Are you sure you want to undo soft abort?")) {
    caelusLogger("button-press", "Confirmed undo abort");
    undoSoftAbort();
  }
}

function onClickedAbort(type: "soft") {
  if(disable_auth) {
    window.alert("You do not have authorization to issue a soft abort.")
  } else if (window.confirm("Are you sure you want to " + type + " abort?")) {
    caelusLogger("button-press", "Confirmed abort");
    softAbort();
  }
}

const ButtonBarPane = () => {
    const data = useSelector((state: CaelusState) => ({
        sensorState: state.data.sensorData,
        valveState: state.data.valveData,
        heartbeatState: state.data.general.heartbeat_received,
        heartbeatStatus: state.data.general.heartbeat_status,
        mode: state.data.general.mode,
    }));

    const mode = useSelector((state: CaelusState) => state.data.general.mode);

    const switchView = (name: keyof typeof views) =>
      setViews({ ...views, [name]: !views[name] });

    const [views, setViews] = useState({
      abort: false,
      actuation: false,
      sensor: false,
      valve: false,
    });
    
    const abort_style = {
      borderWidth:1,
      borderColor:'rgba(0,0,0,0.2)',
      alignItems:'center',
      justifyContent:'center',
      width:200,
      height:60,
      margin: "15px",
      backgroundColor: "#eb2323",
      borderRadius:17
    };
    
    const actuationPriorityRef = useRef<HTMLSelectElement>(null);

  
    const valveExists = (valveLoc: string) =>
    valveLoc in data.valveState.valves.solenoid;  
    // var actuationPriorityDict: { key: string; value: React.RefObject<HTMLSelectElement>; }[] = [];
    // Object.entries(data.valveState.valves.solenoid).map(([loc, valve]) => (
    //   actuationPriorityDict.push({
    //     key: loc,
    //     value: useRef<HTMLSelectElement>(null)
    //   })
    // ));
  
  
  
    // const button_style = {
    //   borderWidth:1,
    //   borderColor:'rgba(0,0,0,0.2)',
    //   alignItems:'center',
    //   justifyContent:'center',
    //   width:60,
    //   height:60,
    //   margin: "15px"
    // };
  
    // return(
    //   <div className = "pane" style={{backgroundColor: "white"}}>
    //     {console.log(data.valveState.valves.solenoid)}
    //   {Object.entries(data.valveState.valves.solenoid).map(([loc, valve]) => (
  
    //       <div style={{
    //           margin: "10px",
    //           backgroundColor: "#d6fdff",
    //           borderWidth: "1px",
    //           borderColor: "black",
    //           borderRadius: "8px"
    //       }}>
    //           <span style={{fontSize: "25px", margin: "20px"}}>
    //                   {loc in valve_abbrevs
    //                   ? Object.entries(valve_abbrevs).map(([long_name, short_name]) => (
    //                       loc === long_name 
    //                       ? short_name
    //                       : ""
    //                   ))
    //                   : loc
    //               }    
    //           </span>
              
    //           <button style = {{display: "inline-block", fontSize: "20px", borderWidth: "1px", padding: "10px 0 10px 10px"}}>
    //               <ButtonPaneSelector
    //                   label="Priority"
    //                   ref={actuationPriorityRef}
    //                   options={[1, 2, 3]}
    //                   optionNames={{ 1: "1", 2: "2", 3: "3" }}
    //               />
    //           </button>
  
    //           <button 
    //           style={Object.assign({backgroundColor: "#8de4ff", borderRadius:17}, button_style)}
  
    //           onClick={() =>
    //               onClickedActuateValve(loc, "solenoid", "OPEN", actuationPriorityDict[loc].current?.value)
    //             }
  
    //           >
    //               OPEN
    //           </button>
  
    //           <button 
    //           style={Object.assign({backgroundColor: "#e8e8e8", borderRadius:17}, button_style)}
              
    //           onClick={() =>
    //               {var priorityRef = null;
                  
                  
    //               onClickedActuateValve(loc, "solenoid", "CLOSE", actuationPriorityRef.current?.value)
    //             }}
  
    //           >
    //               CLOSE
    //           </button>
  
    //           <button 
    //           style={Object.assign({backgroundColor: "#10f5e1", borderRadius:17}, button_style)}
    //           //onClick (reference ref)
    //           >
    //               PULSE
    //           </button>
  
    //           <span>
    //               {loc in valve_types
    //                   ? Object.entries(valve_types).map(([valve_name, valve_type]) => (
    //                       loc === valve_name 
    //                       ? valve_type
    //                       : ""
    //                   ))
    //                   : ""//onClickedActuateValve(loc, "solenoid", ???, actuationPriorityRef.current?.value)
    //               }
    //               <button 
    //                   style={Object.assign({backgroundColor: "#ff5050", borderRadius:17}, button_style)}
    //               >
    //                   RESET
    //               </button>    
    //           </span>
    //       </div>
    //   ))}   
    //   </div>
        
  
  
    const valve_types = {
      "NOSV-1": "OPEN",
      "NOSV-2": "OPEN",
      "NOSV-3": "OPEN",
      "NOSV-4": "OPEN",
      "NCSV-1": "CLOSE",
      "NCSV-2": "CLOSE",
      "NCSV-3": "CLOSE",
      "NCSV-4": "CLOSE"
    };

    const valve_abbrevs = {
      "vent_valve": "NOSV-3",
      "pressurization_valve": "NOSV-4",
      "remote_drain_valve": "NCSV-3",
      "main_propellant_valve": "NCSV-4"
    };
    
    const button_style = {
      borderWidth:1,
      borderColor:'rgba(0,0,0,0.2)',
      alignItems:'center',
      justifyContent:'center',
      width:60,
      height:60,
      margin: "15px"
    };

    var PriorityRefs = new Map<string, string>();
    Object.entries(data.valveState.valves.solenoid).map(([loc, valve]) => (
      PriorityRefs.set(loc, "1") 
    ));

    return(

      <div style={{backgroundColor: "white", padding: "20px"}}>
        {

        Object.entries(data.valveState.valves.solenoid).map(([loc, valve]) => (
          <div style={{
              margin: "10px",
              backgroundColor: "#d6fdff",
              borderWidth: "1px",
              borderColor: "black",
              borderRadius: "8px",
              marginBottom: "20px"
          }}>
            <span style={{fontSize: "25px", margin: "20px"}}>
                {loc in valve_abbrevs
                  ? Object.entries(valve_abbrevs).map(([long_name, short_name]) => (
                    loc === long_name 
                      ? short_name
                      : ""
                    ))
                  : loc
                }    
            </span>
            <div style = {{margin: '15px', display: "inline"}}>
              <ButtonPaneSelector
                label="Priority"
                ref={actuationPriorityRef}
                // onChange={() => (
                //   PriorityRefs.set(loc,actuationPriorityRef.current!.value)
                // )}
                options={[1, 2, 3]}
                optionNames={{ 1: "1", 2: "2", 3: "3" }}
              />
            </div>
            <button 
              style={Object.assign({backgroundColor: "#8de4ff", borderRadius:17}, button_style)}
              onClick={() =>
                onClickedActuateValve(loc, "solenoid", "3", actuationPriorityRef.current?.value)
              }
            >
              {actuationPriorityRef.current?.value}OPEN
            </button>
            <button 
              style={Object.assign({backgroundColor: "#e8e8e8", borderRadius:17}, button_style)} 
              onClick={() =>
                onClickedActuateValve(loc, "solenoid", "2", actuationPriorityRef.current?.value)
              }
            >
              CLOSE
            </button>
            <button 
              style={Object.assign({backgroundColor: "#10f5e1", borderRadius:17}, button_style)}
              onClick={() =>
                onClickedActuateValve(loc, "solenoid", "4", actuationPriorityRef.current?.value)
              }
            >
              PULSE
            </button>
            <button 
              style={Object.assign({backgroundColor: "#ff5050", borderRadius:17}, button_style)}
              onClick={() =>
                onClickedActuateValve(loc, "solenoid", "1", actuationPriorityRef.current?.value)
              }
            >
              RESET
            </button>    
          </div>
        ))}
        <div>
          <button
            style={abort_style}
            onClick={() => onClickedAbort("soft")}
            disabled={mode === "Normal" ? false : true}
          >
            Abort
          </button>
        </div>             
      </div>
    );

  
  // var actuationPriorityDict: { key: string; value: React.RefObject<HTMLSelectElement>; }[] = [];
  // Object.entries(data.valveState.valves.solenoid).map(([loc, valve]) => (
  //   actuationPriorityDict.push({
  //     key: loc,
  //     value: useRef<HTMLSelectElement>(null)
  //   })
  // ));



  // const button_style = {
  //   borderWidth:1,
  //   borderColor:'rgba(0,0,0,0.2)',
  //   alignItems:'center',
  //   justifyContent:'center',
  //   width:60,
  //   height:60,
  //   margin: "15px"
  // };

  // return(
  //   <div className = "pane" style={{backgroundColor: "white"}}>
  //     {console.log(data.valveState.valves.solenoid)}
  //   {Object.entries(data.valveState.valves.solenoid).map(([loc, valve]) => (

  //       <div style={{
  //           margin: "10px",
  //           backgroundColor: "#d6fdff",
  //           borderWidth: "1px",
  //           borderColor: "black",
  //           borderRadius: "8px"
  //       }}>
  //           <span style={{fontSize: "25px", margin: "20px"}}>
  //                   {loc in valve_abbrevs
  //                   ? Object.entries(valve_abbrevs).map(([long_name, short_name]) => (
  //                       loc === long_name 
  //                       ? short_name
  //                       : ""
  //                   ))
  //                   : loc
  //               }    
  //           </span>
            
  //           <button style = {{display: "inline-block", fontSize: "20px", borderWidth: "1px", padding: "10px 0 10px 10px"}}>
  //               <ButtonPaneSelector
  //                   label="Priority"
  //                   ref={actuationPriorityRef}
  //                   options={[1, 2, 3]}
  //                   optionNames={{ 1: "1", 2: "2", 3: "3" }}
  //               />
  //           </button>

  //           <button 
  //           style={Object.assign({backgroundColor: "#8de4ff", borderRadius:17}, button_style)}

  //           onClick={() =>
  //               onClickedActuateValve(loc, "solenoid", "OPEN", actuationPriorityDict[loc].current?.value)
  //             }

  //           >
  //               OPEN
  //           </button>

  //           <button 
  //           style={Object.assign({backgroundColor: "#e8e8e8", borderRadius:17}, button_style)}
            
  //           onClick={() =>
  //               {var priorityRef = null;
                
                
  //               onClickedActuateValve(loc, "solenoid", "CLOSE", actuationPriorityRef.current?.value)
  //             }}

  //           >
  //               CLOSE
  //           </button>

  //           <button 
  //           style={Object.assign({backgroundColor: "#10f5e1", borderRadius:17}, button_style)}
  //           //onClick (reference ref)
  //           >
  //               PULSE
  //           </button>

  //           <span>
  //               {loc in valve_types
  //                   ? Object.entries(valve_types).map(([valve_name, valve_type]) => (
  //                       loc === valve_name 
  //                       ? valve_type
  //                       : ""
  //                   ))
  //                   : ""//onClickedActuateValve(loc, "solenoid", ???, actuationPriorityRef.current?.value)
  //               }
  //               <button 
  //                   style={Object.assign({backgroundColor: "#ff5050", borderRadius:17}, button_style)}
  //               >
  //                   RESET
  //               </button>    
  //           </span>
  //       </div>
  //   ))}   
  //   </div>
      

};

export default ButtonBarPane;