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
    general: {
        heartbeat: undefined,
        stage: undefined,
        responses: []
    }
}

const updateData = (state = initialState, action) => {
    let [message, timestamp] = [undefined, undefined];
    if(['UPDATE_SENSOR_DATA', 'UPDATE_VALVE_DATA', 'UPDATE_HEARTBEAT', 'UPDATE_STAGE', 'ADD_RESPONSE'].includes(action.type)){
        message = action.data.message;
        timestamp = action.data.timestamp;
    }
    switch (action.type) {
        case 'UPDATE_SENSOR_DATA':
            for(let type in message){
                for(let loc in message[type]){
                    let measured = message[type][loc].value[0].toFixed(3);
                    let normalized = message[type][loc].value[1].toFixed(3);
                    let status = message[type][loc].status;
                    state.sensorData[type][loc].push([normalized, status]);
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
            state.general.heartbeat = timestamp;
            return state;
        
        case 'UPDATE_STAGE':
            state.general.stage = message.stage;
            return state;

        case 'ADD_RESPONSE':
            let obj = Object();
            if(action.data.header === 'response'){
                obj.header = message.header;
                delete message.header;
            }
            else{
                obj.header = action.data.header;
            }
            obj.message = message;
            obj.timestamp = timestamp;
            state.general.responses.push(obj);
            return state;        

        default:
            return state
    }
}

export default updateData