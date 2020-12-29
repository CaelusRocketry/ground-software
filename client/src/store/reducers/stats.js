import config from "../../config.json";

const sensors = config["sensors"]["list"];
const valves = config["valves"]["list"];
const dataCutoff = config["UI"]["data_cutoff"];

console.log(sensors);
console.log(valves);

const configToStore = (data, base_val) => {
  let storeData = {};
  for (let i in data) {
    storeData[i] = {};
    for (let j in data[i]) {
      if (Array.isArray(base_val)) {
        storeData[i][j] = base_val.slice();
      } else {
        storeData[i][j] = base_val;
      }
    }
  }
  return storeData;
};

const initialSensorData = configToStore(sensors, []);
initialSensorData.timestamp = [];
const initialValveData = configToStore(valves, undefined);
initialValveData.timestamp = undefined;

const initialState = {
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
};

const updateData = (state = initialState, action) => {
  let [message, timestamp] = [undefined, undefined];
  if (
    [
      "UPDATE_SENSOR_DATA",
      "UPDATE_VALVE_DATA",
      "UPDATE_HEARTBEAT",
      "UPDATE_STAGE",
      "ADD_RESPONSE",
    ].includes(action.type)
  ) {
    message = action.data.message;
    timestamp = action.data.timestamp;
  }
  switch (action.type) {
    case "UPDATE_SENSOR_DATA":
      state = JSON.parse(JSON.stringify(state));
      for (let type in message) {
        for (let loc in message[type]) {
          let measured = message[type][loc].measured.toFixed(3);
          let normalized = message[type][loc].kalman.toFixed(3);
          let status = message[type][loc].status;
          state.sensorData[type][loc].push([normalized, status]);
          if (state.sensorData[type][loc].length > dataCutoff) {
            state.sensorData[type][loc].shift();
          }
        }
      }
      state.sensorData.timestamp.push(timestamp);
      if (state.sensorData.timestamp.length > dataCutoff) {
        state.sensorData.timestamp.shift();
      }
      return state;

    case "UPDATE_VALVE_DATA":
      state = JSON.parse(JSON.stringify(state));
      for (let type in message) {
        for (let loc in message[type]) {
          let value = message[type][loc];
          state.valveData[type][loc] = value;
        }
      }
      state.valveData.timestamp = timestamp;
      return state;

    case "UPDATE_HEARTBEAT":
      state = JSON.parse(JSON.stringify(state));
      state.general.heartbeat_recieved = Date.now();
      state.general.heartbeat = timestamp;
      state.general.mode = action.data.message.mode;
      return state;

    case "UPDATE_HEARTBEAT_STATUS":
      state = JSON.parse(JSON.stringify(state));
      state.general.heartbeat_status = action.heartbeat_status;
      return state;

    case "UPDATE_STAGE":
      state = JSON.parse(JSON.stringify(state));
      state.general.stage = message.stage;
      state.general.percent_data = message.status;
      return state;

    case "UPDATE_COUNTDOWN":
      state = JSON.parse(JSON.stringify(state));
      if (state.general.countdown > 0) {
        state.general.countdown -= 1;
      }
      return state;

    case "ADD_RESPONSE":
      state = JSON.parse(JSON.stringify(state));
      let obj = Object();
      if (action.data.header === "response") {
        obj.header = message.header;
      } else {
        obj.header = action.data.header;
      }
      obj.message = message;
      obj.timestamp = timestamp;
      let temp = state.general.responses.slice();
      temp.push(obj);
      state.general.responses = temp;
      return state;

    case "UPDATE_MODE":
      state = JSON.parse(JSON.stringify(state));
      state.general.mode = action.data.message.mode;
      return state;

    default:
      state = JSON.parse(JSON.stringify(state));
      return state;
  }
};

export default updateData;
