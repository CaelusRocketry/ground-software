const initialState = {
  abort: {
    soft: false,
    hard: false,
  },
  actuation: {
    // Actuation type, actuation priority
    pressure_relief: [undefined, undefined],
    pressurization: [undefined, undefined],
    main_propellant_valve: [undefined, undefined],
  },
  request: {
    valve: [undefined, undefined],
    sensor: [undefined, undefined],
  },
  general: {
    progress: false,
  },
};

const buttonPressed = (state = initialState, action) => {
  switch (action.type) {
    case "GENERAL_PRESSED":
      console.log("General button was pressed");
      state.general[action.data.type] = action.data.pressed;
      return state;
    case "ABORT_PRESSED":
      state.abort[action.data.type] = action.data.pressed;
      return state;
    case "REQUEST_PRESSED":
      state.request[action.data.type] = [
        action.data.objectType,
        action.data.location,
      ];
      return state;
    case "ACTUATE_PRESSED":
      let valve = action.data.valve;
      let type = action.data.actuation_type;
      let priority = action.data.priority;
      state.actuation[valve] = [type, priority];
      return state;
    default:
      return state;
  }
};

export default buttonPressed;
