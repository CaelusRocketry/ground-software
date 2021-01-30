import config from "../../config.json";
import caelusLogger from "../../lib/caelusLogger";
import duplicateJson from "../../lib/duplicateJson";
import { sensors, valves } from "../../lib/locationNames";

const dataCutoff = config.UI.data_cutoff;

const createValveStore = (valveConfig) => {
  let data = {};
  for (let type in valveConfig) {
    let typeData = {};
    for (let location in valveConfig[type]) {
      typeData[location] = undefined;
    }
    data[type] = typeData;
  }
  return data;
};

const createSensorStore = (sensorConfig) => {
  let data = {};
  for (let type in sensorConfig) {
    let typeData = {};
    for (let location in sensorConfig[type]) {
      typeData[location] = { x: [], y: [] };
    }
    data[type] = typeData;
  }
  return data;
};

const initialSensorData = {
  ...createSensorStore(sensors),
  timestamp: [],
};

const initialValveData = {
  ...createValveStore(valves),
  timestamp: undefined,
};

const createInitialState = () => ({
  sensorData: initialSensorData,
  valveData: initialValveData,
  general: {
    heartbeat: undefined,
    heartbeat_recieved: undefined,
    heartbeat_status: undefined,
    stage: "waiting", // value should be undefined, but is set to 'autosequence' for testing purposes
    countdown: 10,
    responses: [],
    percent_data: undefined,
    mode: "Normal",
  },
});

const actionsWithMessageAndTimestamp = [
  "UPDATE_SENSOR_DATA",
  "UPDATE_VALVE_DATA",
  "UPDATE_HEARTBEAT",
  "UPDATE_STAGE",
  "ADD_RESPONSE",
];

const updateData = (state = createInitialState(), action) => {
  let message, timestamp;
  if (actionsWithMessageAndTimestamp.includes(action.type)) {
    message = action.data.message;
    timestamp = action.data.timestamp;
  }

  caelusLogger("update-data", action);

  // Ensure we can safely modify the state
  state = duplicateJson(state);

  switch (action.type) {
    case "UPDATE_SENSOR_DATA":
      for (let [type, locations] of Object.entries(message)) {
        for (let [location, sensor] of Object.entries(locations)) {
          // eslint-disable-next-line
          let measured = sensor.measured.toFixed(3);
          let kalman = sensor.kalman.toFixed(3);
          let status = sensor.status;

          if (!(type in state.sensorData)) {
            state.sensorData[type] = {};
          }
          if (!(location in state.sensorData)) {
            state.sensorData[type][location] = { x: [], y: [], entries: 0 };
          }

          state.sensorData[type][location].x.push(timestamp);
          state.sensorData[type][location].y.push([kalman, status]);
          state.sensorData[type][location].entries++;

          // Ensure that there are only dataCutoff values in the series
          if (state.sensorData[type][location].entries > dataCutoff) {
            state.sensorData[type][location].x.shift();
            state.sensorData[type][location].y.shift();
            state.sensorData[type][location].entries--;
          }
        }
      }

      state.sensorData.timestamp.push(timestamp);

      // Ensure that there are only dataCutoff values in the series
      if (state.sensorData.timestamp.length > dataCutoff) {
        state.sensorData.timestamp.shift();
      }

      return state;

    case "UPDATE_VALVE_DATA":
      for (let [type, locations] of Object.entries(message)) {
        for (let [location, valve] of Object.entries(locations)) {
          state.valveData[type][location] = valve;
        }
      }
      state.valveData.timestamp = timestamp;
      return state;

    case "UPDATE_HEARTBEAT":
      state.general.heartbeat_recieved = Date.now();
      state.general.heartbeat = timestamp;
      state.general.mode = action.data.message.mode;
      return state;

    case "UPDATE_HEARTBEAT_STATUS":
      state.general.heartbeat_status = action.heartbeat_status;
      return state;

    case "UPDATE_STAGE":
      state.general.stage = message.stage;
      state.general.percent_data = parseInt(message.status);
      return state;

    case "UPDATE_COUNTDOWN":
      if (state.general.countdown > 0) {
        state.general.countdown -= 1;
      }
      return state;

    case "ADD_RESPONSE":
      let header = action.data.header;
      if (header === "response") {
        header = message.header;
        delete message.header;
      }
      state.general.responses = [
        ...state.general.responses,
        {
          header: header,
          message: message,
          timestamp: timestamp,
        },
      ];
      return state;

    case "UPDATE_MODE":
      state.general.mode = action.data.message.mode;
      return state;

    default:
      return state;
  }
};

export default updateData;
