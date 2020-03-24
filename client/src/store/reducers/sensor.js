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
      case 'UPDATE_THERMOCOUPLE_DATA':
        return {
            ...state,
            Thermocouple: {
                chamber: action.data.chamber,
                tank: action.data.tank,
                state: action.state
            }
        }
        case 'UPDATE_PRESSURE_DATA':
            return {
                ...state,
                Pressure: {
                    chamber: action.data.chamber,
                    tank: action.data.tank,
                    injector: action.data.injector,
                    state: action.state
                }
            }
        case 'UPDATE_LOAD_DATA':
            return {
                ...state,
                Load: {
                    tank: action.data.tank,
                    state: action.state
                }
            }   
        case 'UPDATE_TIMESTAMP':
            return {
                ...state,
                Timestamp: action.data.timestamp
            } 
            
      default:
        return state
    }
  }
  
  export default updateSensorData