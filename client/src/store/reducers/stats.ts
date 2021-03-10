import config from "../../config.json";
import caelusLogger from "../../lib/caelusLogger";
import duplicateJson from "../../lib/duplicateJson";
import { sensors, valves } from "../../lib/locationNames";
import { HeartbeatStatus, Stage, TelemetryResponse } from "../../types";
import { DataAction } from "../actions";

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
      [location: string]: 0 | 1;
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
  heartbeat?: boolean;
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
    heartbeat: undefined,
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

const updateData = (state = createInitialState(), action: DataAction) => {
  caelusLogger("update-data", action);

  // Ensure we can safely modify the state
  state = duplicateJson(state);
  try {
    switch (action.type) {
      case "UPDATE_SENSOR_DATA":
        for (let [type, locations] of Object.entries(action.data.message)) {
          for (let [location, sensor] of Object.entries(locations)) {
            // eslint-disable-next-line
            const { measured, kalman, status } = sensor;

            if (consoleLogSensorData) {
              console.log("SENSOR DATA");
              console.log(
                type,
                location,
                state.sensorData.sensors[type][location]
              );
              console.log({ measured, kalman });
            }

            if (!(type in state.sensorData.sensors)) {
              state.sensorData.sensors[type] = {};
            }
            if (!(location in state.sensorData.sensors[type])) {
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
        for (let [type, locations] of Object.entries(action.data.message)) {
          for (let [location, valve] of Object.entries(locations)) {
            state.valveData.valves[type][location] = valve;
          }
        }
        state.valveData.timestamp = action.data.timestamp;
        return state;

      case "UPDATE_HEARTBEAT":
        state.general.heartbeat = true;
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
        let header = action.data.header;
        if (header === "response") {
          header = action.data.message.header;
          delete action.data.message.header;
        }

        state.general.responses.push({
          header,
          message: action.data,
          timestamp: action.data.timestamp,
        });

        if (state.general.responses.length > messageCutoff) {
          state.general.responses.shift();
        }

        return state;

      case "UPDATE_GENERAL_COPY":
        state.general = action.data;
        return state;

      case "UPDATE_SENSOR_COPY":
        state.sensorData = action.data;
        return state;

      case "UPDATE_VALVE_COPY":
        state.valveData = action.data;
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
