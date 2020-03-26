const initialState = {
    abort: {
        soft: false,
        hard: false
    },
    actuation: {
        // Actuation type, actuation priority
        pressure_relief: [null, null],
        propellant_vent: [null, null],
        main_propellant_valve: [null, null]
    },
    request: {
        valve: false,
        sensor: false
    },
    general: {
        progress: false
    }
}

const buttonPressed = (state = initialState, action) => {
    switch(action.type) {
        case 'GENERAL_PRESSED':
            state.general[action.data.type] = action.data.pressed;
            return state;
        case 'ABORT_PRESSED':
            state.abort[action.data.type] = action.data.pressed;
            return state;
        case 'REQUEST_PRESSED':
            state.request[action.data.type] = action.data.pressed;
            return state;
        case 'ACTUATE_PRESSED':
            let valve = action.data.valve;
            let type = action.data.actuation_type;
            let priority = action.data.priority;
            state.actuation[valve] = [type, priority];
            return state;
        default:
            return state;
    }
}

export default buttonPressed;