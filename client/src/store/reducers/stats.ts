import config from "../../config.json";
import caelusLogger from "../../lib/caelusLogger";
import duplicateJson from "../../lib/duplicateJson";
import { sensors, valves } from "../../lib/locationNames";
import { HeartbeatStatus, Stage, TelemetryResponse } from "../../types";
import { DataAction, ValveData } from "../actions";

const dataCutoff = config.UI.data_cutoff;
const messageCutoff = config.UI.message_cutoff;

const createValveStore = (valveConfig: typeof valves): ValveStore["valves"] => {
  let data: any = {};
  for (let [type, locations] of Object.entries(valveConfig)) {
    let typeData: any = {};
    for (let location in locations) {
      typeData[location] = undefined;
    }
    data[type] = typeData;
  }
  return data;
};

const createSensorStore = (
  sensorConfig: typeof sensors
): SensorStore["sensors"] => {
  let data: any = {};
  for (let [type, locations] of Object.entries(sensorConfig)) {
    let typeData: any = {};
    for (let location in locations) {
      typeData[location] = [];
    }
    data[type] = typeData;
  }
  return data;
};

export type SensorStore = {
  sensors: {
    [type: string]: {
      [location: string]: {
        measured: number;
        kalman: number;
      }[];
    };
  };
  timestamps: number[];
};

export type ValveStore = {
  valves: {
    [type: string]: {
      [location: string]: ValveData;
    };
  };
  timestamp?: number;
};

const initialSensorData: SensorStore = {
  sensors: createSensorStore(sensors),
  timestamps: [],
};

const initialValveData: ValveStore = {
  valves: createValveStore(valves),
  timestamp: undefined,
};

export interface GeneralStore {
  heartbeat_received: number;
  heartbeat_status?: HeartbeatStatus;
  stage: Stage;
  countdown: number;
  responses: TelemetryResponse[];
  percent_data: number;
  mode: string;
}

export interface StatsState {
  sensorData: SensorStore;
  valveData: ValveStore;
  general: GeneralStore;
}

const createInitialState = (): StatsState => ({
  sensorData: initialSensorData,
  valveData: initialValveData,
  general: {
    heartbeat_received: 0,
    heartbeat_status: undefined,
    stage: "waiting", // value should be undefined, but is set to 'autosequence' for testing purposes
    countdown: 10,
    responses: [],
    percent_data: 0,
    mode: "Normal",
  },
});

// eslint-disable-next-line
const actionsWithMessageAndTimestamp = [
  "UPDATE_SENSOR_DATA",
  "UPDATE_VALVE_DATA",
  "UPDATE_HEARTBEAT",
  "UPDATE_STAGE",
  "ADD_RESPONSE",
];

const consoleLogSensorData = false;

const updateData = (state = createInitialState(), action: any) => {
  caelusLogger("update-data", action);

  // Ensure we can safely modify the state
  state = duplicateJson(state);
  try {
    switch (action.type) {
      case "UPDATE_SENSOR_DATA":
        state.sensorData = action.data.message.sensor_data;

      case "UPDATE_VALVE_DATA":
        state.valveData = action.data.message.valve_data;

      case "UPDATE_HEARTBEAT":
        state.general.heartbeat_received = action.data;
        return state;

      case "UPDATE_HEARTBEAT_STATUS":
        state.general.heartbeat_status = action.data.heartbeat_status;
        return state;

      case "UPDATE_STAGE":
        state.general.stage = action.data.stage;
        state.general.percent_data = action.data.status;
        return state;

      case "UPDATE_COUNTDOWN":
        if (state.general.countdown > 0) {
          state.general.countdown -= 1;
        }
        return state;

      case "ADD_RESPONSE":
        state.general.responses = action.data.message.response;
        return state;

      case "UPDATE_MODE":
        state.general.mode = action.data.mode;
        return state;

      default:
        return state;
    }
  } catch (err) {
    console.error("UPDATE DATA ERROR: ", err);

    caelusLogger("update-data", { err, state, action }, "error");
    return state;
  }
};

export default updateData;
