const initialState = {
    sensorData: {
        thermocouple: {
            chamber: 0.0, 
            tank: 0.0, 
            state: "unknown"
        },
        pressure: {
            chamber: 0.0, 
            tank: 0.0, 
            injector: 0.0,
            state: "unknown"
        },
        load: {
            tank: 0.0, 
            state: "unknown"
        },
        timestamp: 0.0
    }, 
    valveData: {
        solenoid: {
            pressure_relief: "unknown", 
            propellant_vent: "unknown", 
            main_propellant_valve: "unknown"
        }, 
        timestamp: 0.0
    },
    heartbeat: {
        timestamp: 0.0
    }
}

const updateData = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_SENSOR_DATA':
            return {
                ...state, 
                    sensorData: {
                        thermocouple: {
                            chamber: action.data.message.thermocouple.chamber, 
                            tank: action.data.message.thermocouple.tank, 
                            state: false
                        },
                        pressure: {
                            chamber: action.data.message.pressure.chamber, 
                            tank: action.data.message.pressure.tank, 
                            injector: action.data.message.pressure.injector,
                            state: false
                        },
                        load: {
                            tank: action.data.message.load.tank, 
                            state: false
                        },
                        timestamp: action.data.timestamp
                    }
                }

        case 'UPDATE_VALVE_DATA':
            return {
                ...state, 
                valveData: {
                    solenoid: {
                        pressure_relief: action.data.message.solenoid.pressure_relief, 
                        propellant_vent: action.data.message.solenoid.propellant_vent, 
                        main_propellant_valve: action.data.message.solenoid.main_propellant_valve
                    }, 
                    timestamp: action.data.timestamp
                }
            }

        case 'UPDATE_HEARTBEAT':
            return {
                ...state,
                heartbeat: {
                    timestamp: action.data.timestamp
                }

            }
        
      default:
        return state
    }
  }
  
  export default updateData