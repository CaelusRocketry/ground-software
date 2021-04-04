import React, { useRef } from "react";
import ButtonPaneSelector from "./ButtonPaneSelector";
import { useSelector } from "react-redux";
import { actuateValve } from "../api";
import { CaelusState } from "../store/reducers";
import caelusLogger from "../lib/caelusLogger";
import config from "../config.json";
import { softAbort, undoSoftAbort, } from "../api";

var disable_auth = false
if(!config.Authorized_IPs.includes(window.location.hostname) )
  disable_auth = true
else
  console.log("Authorized access to Actions.")

function onClickedActuateValve(
    valveLocation?: string,
    valveType?: string,
    actuationType?: string,
    actuationPriority?: string
  ) {
    caelusLogger("button-press", {
      button: "actuate_valves",
      info: { valveLocation, valveType, actuationPriority },
    });
  
    if (!valveLocation ||  !valveType ||  !actuationType || !actuationPriority ) {
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

function onClickedUndoSoftAbort() {
    // TODO: If the current mode isn't Soft Abort, don't allow this (gray out the button, and if they somehow click on it then alert them that its a disallowed action)
  if(disable_auth) {
    window.alert("You do not have authorization to undo a soft abort.")
  } else if (window.confirm("Are you sure you want to undo soft abort?")) {
    caelusLogger("button-press", "Confirmed undo abort");
    undoSoftAbort();
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

const ButtonBarPane = () => {
    const data = useSelector((state: CaelusState) => ({
        sensorState: state.data.sensorData,
        valveState: state.data.valveData,
        heartbeatState: state.data.general.heartbeat_received,
        heartbeatStatus: state.data.general.heartbeat_status,
        mode: state.data.general.mode,
    }));
    
    const actuationPriorityRef = useRef<HTMLSelectElement>(null);

    const valveExists = (valveLoc: string) =>
    valveLoc in data.valveState.valves.solenoid;

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

    return(

      <div>
            
        {Object.entries(data.valveState.valves.solenoid).map(([loc, valve]) => (

            <div style={{
                margin: "10px",
                backgroundColor: "#d6fdff",
                borderWidth: "1px",
                borderColor: "black",
                borderRadius: "8px"
            }}>
            </div>

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
                
                <div style = {{margin: '15px'}}>
                    <ButtonPaneSelector
                      label="Priority Dropdown"
                      ref={actuationPriorityRef}
                      options={[1, 2, 3]}
                      optionNames={{ 1: "!", 2: "!!", 3: "!!!" }}
                    />
                </div>

                <button 
                  style={Object.assign({backgroundColor: "#8de4ff", borderRadius:17}, button_style)}

                  onClick={() =>
                    onClickedActuateValve(loc, "solenoid", "3", actuationPriorityRef.current?.value)
                  }
                >
                  OPEN
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

            
      </div>
            
    );

};

export default ButtonBarPane;