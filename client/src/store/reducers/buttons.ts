import caelusLogger from "../../lib/caelusLogger";
import { ButtonAction } from "../actions";

export interface ButtonState {
  abort: {
    soft: boolean;
    undosoft: boolean;
  };
  actuation: {
    [valveName: string]: {
      type?: string;
      priority?: string;
    };
  };
  request: {
    valve: {
      type?: string;
      location?: string;
    };
    sensor: {
      type?: string;
      location?: string;
    };
  };
  general: {
    progress: boolean;
  };
}

const createInitialState = (): ButtonState => ({
  abort: {
    soft: false,
    undosoft: false,
  },
  actuation: {
    // Actuation type, actuation priority
    pressure_relief: {},
    pressurization: {},
    main_propellant_valve: {},
  },
  request: {
    valve: {},
    sensor: {},
  },
  general: {
    progress: false,
  },
});

const buttonPressed = (
  state: ButtonState = createInitialState(),
  action: ButtonAction
) => {
  switch (action.type) {
    case "GENERAL_PRESSED":
      caelusLogger("button-press", "General button was pressed");
      state.general[action.data.type] = action.data.pressed;
      return state;
    case "ABORT_PRESSED":
      state.abort[action.data.type] = action.data.pressed;
      state.abort.undosoft = false;
      return state;
    case "REQUEST_PRESSED":
      state.request[action.data.type] = {
        type: action.data.objectType,
        location: action.data.location,
      };
      return state;
    case "UNDO_SOFT_ABORT_PRESSED":
      state.abort.undosoft = action.data.pressed;
      return state;
    case "ACTUATE_PRESSED":
      let { valve, actuation_type, priority } = action.data;
      state.actuation[valve] = { type: actuation_type, priority };
      return state;
    default:
      return state;
  }
};

export default buttonPressed;
