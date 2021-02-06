import { Store } from "redux";
import io from "socket.io-client";
import config from "./config.json";
import caelusLogger from "./lib/caelusLogger";
import {
  addResponse,
  updateHeartbeat,
  UpdateHeartbeatAction,
  updateHeartbeatStatus as updateHeartbeatStatusAction,
  updateMode,
  UpdateModeAction,
  updateSensorData,
  UpdateSensorDataAction,
  updateStage,
  UpdateStageAction,
  updateValveData,
  UpdateValveDataAction,
} from "./store/actions";
import { CaelusState } from "./store/reducers";

const SOCKETIO_URL =
  "http://" +
  config.telemetry.SOCKETIO_HOST +
  ":" +
  config.telemetry.SOCKETIO_PORT;

const socket = io(SOCKETIO_URL);

// eslint-disable-next-line
const generalUpdates = {
  heartbeat: updateHeartbeat,
  stage: updateStage,
  mode: updateMode,
  response: addResponse,
};

export type HeartbeatLog = {
  header: "heartbeat";
  message: UpdateHeartbeatAction["data"];
  timestamp: number;
};

export type StageLog = {
  header: "stage";
  message: UpdateStageAction["data"];
  timestamp: number;
};

export type ModeLog = {
  header: "mode";
  message: UpdateModeAction["data"];
};

export type ResponseLog = {
  header: "response";
  message: any;
  timestamp: number;
};

export type Log = HeartbeatLog | StageLog | ModeLog | ResponseLog;

export function createSocketIoCallbacks(store: Store<CaelusState>) {
  socket.on("general", (log: Log) => {
    switch (log.header) {
      case "heartbeat":
        store.dispatch(updateHeartbeat(log.message));
        break;
      case "stage":
        store.dispatch(updateStage(log.message));
        break;
      case "mode":
        store.dispatch(updateMode(log.message));
        break;
      case "response":
        store.dispatch(addResponse(log.message));
        break;
      default:
        caelusLogger("telemetry", "Unknown general header", "warn");
    }
  });

  socket.on("sensor_data", (log: UpdateSensorDataAction["data"]) => {
    store.dispatch(updateSensorData(log));
  });

  socket.on("valve_data", (log: UpdateValveDataAction["data"]) => {
    store.dispatch(updateValveData(log));
  });
}

export function sendMessage(header: string, message: any = "") {
  const log = { header, message };
  caelusLogger("telemetry/send", log);
  socket.emit("button_press", log);
}

export function softAbort() {
  sendMessage("soft_abort");
}

export function undoSoftAbort() {
  sendMessage("undo_soft_abort");
}

export function progressStage() {
  sendMessage("progress");
}

export function actuateValve({
  valveType,
  valveLocation,
  actuationType,
  actuationPriority,
}: {
  valveType: string;
  valveLocation: string;
  actuationType: string;
  actuationPriority: string;
}) {
  caelusLogger("valves/actuation", `Actuating valve at ${valveLocation}`);

  sendMessage("solenoid_actuate", {
    valve_type: valveType,
    valve_location: valveLocation,
    actuation_type: actuationType,
    actuation_priority: actuationPriority,
  });
}

export function requestValveData({
  type,
  location,
}: {
  type: string;
  location: string;
}) {
  sendMessage("valve_request", {
    valve_type: type,
    valve_location: location,
  });
}

export function requestSensorData({
  type,
  location,
}: {
  type: string;
  location: string;
}) {
  const header = "sensor_request";
  sendMessage(header, {
    sensor_type: type,
    sensor_location: location,
  });
}

export const updateHeartbeatStatus = (store: Store<CaelusState>) => {
  let general = store.getState().data.general;

  if (general.heartbeat === undefined) {
    store.dispatch(updateHeartbeatStatusAction(1));
  } else {
    const timeSinceLastHeartbeatReceived =
      Date.now() - general.heartbeat_received;

    let status: 1 | 2 | 3;
    if (timeSinceLastHeartbeatReceived > 10000) {
      status = 1;
    } else if (timeSinceLastHeartbeatReceived > 6000) {
      status = 2;
    } else {
      status = 3;
    }

    store.dispatch(updateHeartbeatStatusAction(status));
  }
};
