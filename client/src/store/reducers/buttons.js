const createInitialState = () => ({
  abort: {
    soft: false,
    undosofty: false,
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
      state.abort.undosofty = false;
      return state;
    case "REQUEST_PRESSED":
      state.request[action.data.type] = [
        action.data.objectType,
        action.data.location,
      ];
      return state;
    case "UNDO_SOFT_ABORT":
      state.abort.undosofty = true;
      return state;
    case "ACTUATE_PRESSED":
      let { valve, actuation_type, priority } = action.data;
      state.actuation[valve] = [actuation_type, priority];
      return state;
    default:
      return state;
  }
};

export default buttonPressed;
