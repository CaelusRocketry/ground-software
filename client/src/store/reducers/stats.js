import config from "../../config.json";
import duplicateJson from "../../lib/duplicateJson";
import { sensors, valves } from "../../lib/locationNames";

const dataCutoff = config.UI.data_cutoff;

console.log(sensors);
console.log(valves);

const configToStore = (data, baseValue) => {
  let storeData = {};
  for (let i in data) {
    storeData[i] = {};
    for (let j in data[i]) {
      if (Array.isArray(baseValue)) {
        storeData[i][j] = baseValue.slice();
      } else {
        storeData[i][j] = baseValue;
      }
    }
  }
  return storeData;
};

const initialSensorData = configToStore(sensors, []);
initialSensorData.timestamp = [];
const initialValveData = configToStore(valves, undefined);
initialValveData.timestamp = undefined;

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

  // Ensure we can safely modify the state
  state = duplicateJson(state);

  switch (action.type) {
    case "UPDATE_SENSOR_DATA":
      for (let [type, locations] of Object.entries(message)) {
        for (let [location, sensor] of Object.entries(locations)) {
          let measured = sensor.measured.toFixed(3);
          let kalman = sensor.kalman.toFixed(3);
          let status = sensor.status;

          state.sensorData[type][location].push([kalman, status]);

          // Ensure that there are only dataCutoff values in the series
          if (state.sensorData[type][location].length > dataCutoff) {
            state.sensorData[type][location].shift();
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
        for (let [location, valve] in Object.entries(locations)) {
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
      state.general.percent_data = message.status;
      return state;

    case "UPDATE_COUNTDOWN":
      if (state.general.countdown > 0) {
        state.general.countdown -= 1;
      }
      return state;

    case "ADD_RESPONSE":
      console.log('action.data.header')
      console.log(action.data.header)
      state.general.responses = [
        ...state.general.responses,
        {
          header:
            "response" === action.data.header ? message.header : action.data.header,
          message,
          timestamp,
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
