import duplicateJson from "./duplicateJson";

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

const buttonPressed = (state = createInitialState(), action) => {
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
    case "COPY_REDUX":
      reduxcopy = duplicateJson(state);
      return reduxcopy
    case "UPDATE_REDUX": 
      let { rabort, ractuation, rrequest, rgeneral } = action.data;
      state.abort.soft = rabort.soft;
      state.abort.undosoft = rabort.undosoft;
      state.general.progress = rgeneral.progress;
      state.actuation.pressure_relief = ractuation.pressure_relief;
      state.actuation.pressurization = ractuation.pressurization;
      state.actuation.main_propellant_valve = ractuation.main_propellant_valve;
      state.request.valve = rrequest.valve;
      state.request.sensor = rrequest.sensor;
    case "ACTUATE_PRESSED":
      let { valve, actuation_type, priority } = action.data;
      state.actuation[valve] = [actuation_type, priority];
      return state;
    default:
      return state;
  }
};

export default buttonPressed;
