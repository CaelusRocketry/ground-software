import config from "../../config.json";
import caelusLogger from "../../lib/caelusLogger";
import duplicateJson from "../../lib/duplicateJson";
import { sensors, valves } from "../../lib/locationNames";
import { DataAction } from "../actions";

const dataCutoff = config.UI.data_cutoff;

const createValveStore = (valveConfig: typeof valves) => {
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

const createSensorStore = (sensorConfig: typeof sensors) => {
  let data: any = {};
  for (let [type, locations] of Object.entries(sensorConfig)) {
    let typeData: any = {};
    for (let location in locations) {
      typeData[location] = { x: [], y: [] };
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
      [location: string]: unknown;
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

export interface StatsState {
  sensorData: SensorStore;
  valveData: ValveStore;
  general: {
    heartbeat?: number;
    heartbeat_received?: number;
    heartbeat_status?: string;
    stage: "waiting" | string;
    countdown: number;
    responses: {
      header: string;
      message: any;
      timestamp: number;
    }[];
    percent_data?: number;
    mode: string;
  };
}

const createInitialState = (): StatsState => ({
  sensorData: initialSensorData,
  valveData: initialValveData,
  general: {
    heartbeat: undefined,
    heartbeat_received: undefined,
    heartbeat_status: undefined,
    stage: "waiting", // value should be undefined, but is set to 'autosequence' for testing purposes
    countdown: 10,
    responses: [],
    percent_data: undefined,
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

const updateData = (state = createInitialState(), action: DataAction) => {
  // let message, timestamp;
  // if (actionsWithMessageAndTimestamp.includes(action.type)) {
  //   message = action.data.message;
  //   timestamp = action.data.timestamp;
  // }

  caelusLogger("update-data", action);

  // Ensure we can safely modify the state
  state = duplicateJson(state);

  switch (action.type) {
    case "UPDATE_SENSOR_DATA":
      for (let [type, locations] of Object.entries(action.data.sensors)) {
        for (let [location, sensor] of Object.entries(locations)) {
          // eslint-disable-next-line
          const { measured, kalman, status } = sensor;

          if (!(type in state.sensorData)) {
            state.sensorData.sensors[type] = {};
          }
          if (!(location in state.sensorData)) {
            state.sensorData.sensors[type][location] = [];
          }

          let sensorStored = state.sensorData.sensors[type][location];

          sensorStored.push({ measured, kalman });

          // Ensure that there are only dataCutoff values in the series
          if (sensorStored.length > dataCutoff) {
            sensorStored.shift();
          }
        }
      }

      state.sensorData.timestamps.push(action.data.timestamp);

      // Ensure that there are only dataCutoff values in the series
      if (state.sensorData.timestamps.length > dataCutoff) {
        state.sensorData.timestamps.shift();
      }

      return state;

    case "UPDATE_VALVE_DATA":
      for (let [type, locations] of Object.entries(action.data.valves)) {
        for (let [location, valve] of Object.entries(locations)) {
          state.valveData.valves[type][location] = valve;
        }
      }
      state.valveData.timestamp = action.data.timestamp;
      return state;

    case "UPDATE_HEARTBEAT":
      state.general.heartbeat_received = Date.now();
      state.general.heartbeat = action.data.timestamp;
      state.general.mode = action.data.mode;
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
      let header = action.data.header;
      if (header === "response") {
        header = action.data.message.header;
        delete action.data.message.header;
      }

      state.general.responses.push({
        header,
        message: action.data.message,
        timestamp: action.data.timestamp,
      });

      return state;

    case "UPDATE_MODE":
      state.general.mode = action.data.message.mode;
      return state;

    default:
      return state;
  }
};

export default updateData;
