const initialState = {
    Thermocouple: {
        chamber: 0.0, 
        tank: 0.0, 
        state: "SAFE"
    },
    Pressure: {
        chamber: 0.0, 
        tank: 0.0, 
        injector: 0.0,
        state: "SAFE"
    },
    Load: {
        tank: 0.0, 
        state: "SAFE"
    },
    Timestamp: 0.0
}

const updateSensorData = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_SENSOR_DATA':
            return {
                Thermocouple: {
                    chamber: action.data.message.thermocouple.chamber, 
                    tank: action.data.message.thermocouple.tank, 
                    state: false
                },
                Pressure: {
                    chamber: action.data.message.pressure.chamber, 
                    tank: action.data.message.pressure.tank, 
                    injector: action.data.message.pressure.injector,
                    state: false
                },
                Load: {
                    tank: action.data.message.load.tank, 
                    state: false
                },
                Timestamp: action.data.timestamp
            }
            
      default:
        return state
    }
  }
  
  export default updateSensorData