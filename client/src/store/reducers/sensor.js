const initialState = {
    Thermocouple: {
        "chamber": 0.0, 
        "tank": 0.0, 
        "timestamp": 0.0,
        "state": "SAFE"
    },
    Pressure: {
        "chamber": 0.0, 
        "tank": 0.0, 
        "injector": 0.0,
        "timestamp": 0.0,
        "state": "SAFE"
    },
    Load: {
        "tank": 0.0, 
        "timestamp": 0.0,
        "state": "SAFE"
    }
}

const updateSensorData = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_THERMOCOUPLE_DATA':
        return {
            ...state,
            Thermocouple: {
                chamber: action.chamber,
                tank: action.tank,
                timestamp: action.timestamp, 
                state: action.state
            }
        }
        case 'UPDATE_PRESSURE_DATA':
            return {
                ...state,
                Pressure: {
                    chamber: action.chamber,
                    tank: action.tank,
                    injector: action.injector,
                    timestamp: action.timestamp, 
                    state: action.state
                }
            }
        case 'UPDATE_LOAD_DATA':
            return {
                ...state,
                Load: {
                    tank: action.tank,
                    timestamp: action.timestamp, 
                    state: action.state
                }
            }    
      default:
        return state
    }
  }
  
  export default updateSensorData