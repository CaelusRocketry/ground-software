const initialState = {
    sensorData: {
        thermocouple: {
            chamber: [], 
            tank: [], 
        },
        pressure: {
            chamber: [], 
            tank: [], 
            injector: [],
        },
        load: {
            tank: [], 
        },
        timestamp: []
    }, 
    valveData: {
        solenoid: {
            pressure_relief: undefined,
            propellant_vent: undefined,
            main_propellant_valve: undefined
        }, 
        timestamp: undefined
    },
    heartbeat: {
        timestamp: undefined
    }
}

const updateData = (state = initialState, action) => {
    let [message, timestamp] = [undefined, undefined];
    if(['UPDATE_SENSOR_DATA', 'UPDATE_VALVE_DATA', 'UPDATE_HEARTBEAT'].includes(action.type)){
        message = action.data.message;
        timestamp = action.data.timestamp.toFixed(0);
    }
    switch (action.type) {
        case 'UPDATE_SENSOR_DATA':
            for(let type in message){
                for(let loc in message[type]){
                    console.log("SENSOR DATA INCOMING");
                    console.log(message[type][loc].value);
                    let value = message[type][loc].value[1].toFixed(3);
                    state.sensorData[type][loc].push(value);
                    if(state.sensorData[type][loc].length > 10){
                        state.sensorData[type][loc].shift();
                    }
                }
            }
            state.sensorData.timestamp.push(timestamp);
            if(state.sensorData.timestamp.length > 10){
                state.sensorData.timestamp.shift();
            }
            return state;

        case 'UPDATE_VALVE_DATA':
            for(let type in message){
                for(let loc in message[type]){
                    let value = message[type][loc];
                    state.valveData[type][loc] = value;
                }
            }
            state.valveData.timestamp = timestamp;
            return state;

        case 'UPDATE_HEARTBEAT':
            return {
                ...state,
                heartbeat: {
                    timestamp: timestamp
                }
            }
        
      default:
        return state
    }
}

export default updateData