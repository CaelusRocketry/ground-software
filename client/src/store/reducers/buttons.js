const createInitialState = () => ({
  abort: {
    soft: false,
    undosoft: false,
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
});

const reduxBackend = () => ({
  abort: {
    soft: false,
    undosoft: false,
  },
  actuation: {
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
});

const buttonPressed = (state = createInitialState(), action, backend = reduxBackend()) => {
  switch (action.type) {
    case "GENERAL_PRESSED":
      console.log("General button was pressed");
      state.general[action.data.type] = action.data.pressed;
      return state;
    case "ABORT_PRESSED":
      state.abort[action.data.type] = action.data.pressed;
      state.abort.undosoft = false;
      return state;
    case "REQUEST_PRESSED":
      state.request[action.data.type] = [
        action.data.objectType,
        action.data.location,
      ];
      return state;
    case "UNDO_SOFT_ABORT_PRESSED":
      state.abort.undosoft = action.data.pressed;
      return state;
    case "UPDATE_REDUX_BACKEND":
      backend.abort.soft = state.abort.soft;
      backend.abort.undosoft = state.abort.undosoft;
      backend.actuation.pressure_relief = state.actuation.pressure_relief;
      backend.actuation.pressurization = state.actuation.pressurization;
      backend.actuation.main_propellant_valve = state.actuation.main_propellant_valve;
      backend.request.valve = state.request.valve;
      backend.request.sensor = state.request.sensor;
      backend.general.progress = state.general.progress;
      
    case "UPDATE_REDUX_WITH_BACKEND":
      state.abort.soft = backend.abort.soft;
      state.abort.undosoft = backend.abort.undosoft;
      state.actuation.pressure_relief = backend.actuation.pressure_relief;
      state.actuation.pressurization = backend.actuation.pressurization;
      state.actuation.main_propellant_valve = backend.actuation.main_propellant_valve;
      state.request.valve = backend.request.valve;
      state.request.sensor = backend.request.sensor;
      state.general.progress = backend.general.progress;
      return state

    case "ACTUATE_PRESSED":
      let { valve, actuation_type, priority } = action.data;
      state.actuation[valve] = [actuation_type, priority];
      return state;
    default:
      return state;
  }
};

export default buttonPressed;
