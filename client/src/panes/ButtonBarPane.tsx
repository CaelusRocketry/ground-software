
import React from "react";
import { useSelector } from "react-redux";
import camelize from "../lib/camelize";
import getColor from "../lib/getColor";
import { VALVE_MAP, PADDING } from "../lib/pid";
import { CaelusState } from "../store/reducers";
import Block from "../components/Block";
import BlockHeader from "../components/BlockHeader";

//Come up with style for words in buttons later

//https://blog.campvanilla.com/reactjs-dropdown-menus-b6e06ae3a8fe
//https://blog.logrocket.com/building-a-custom-dropdown-menu-component-for-react-e94f02ced4a1/

const ButtonBarPane = () => {
    const data = useSelector((state: CaelusState) => ({
        sensorState: state.data.sensorData,
        valveState: state.data.valveData,
        heartbeatState: state.data.general.heartbeat_received,
        heartbeatStatus: state.data.general.heartbeat_status,
        mode: state.data.general.mode,
    }));
    
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
        borderRadius:17,
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
                <span style={{fontSize: "25px", margin: "20px"}}>
                        {loc in valve_abbrevs
                        ? Object.entries(valve_abbrevs).map(([long_name, short_name]) => (
                            loc == long_name 
                            ? short_name
                            : ""
                        ))
                        : loc
                    }    
                </span>

                <button style={Object.assign({backgroundColor: "#8de4ff"}, button_style)}>
                    OPEN
                </button>
                <button style={Object.assign({backgroundColor: "#e8e8e8"}, button_style)}>
                    CLOSE
                </button>
                <button style={Object.assign({backgroundColor: "#10f5e1"}, button_style)}>
                    PULSE
                </button>
                <button style={Object.assign({backgroundColor: "#ff5050"}, button_style)}>
                    RESET
                </button>

            </div>

        ))}

            
        </div>
            
    );

};

export default ButtonBarPane;