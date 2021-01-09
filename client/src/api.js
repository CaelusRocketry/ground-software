import io from "socket.io-client";
import config from "./config.json";
import {
  abortPressed,
  actuatePressed,
  addResponse,
  generalPressed,
  requestPressed,
  undoSoftAbort,
  updateHeartbeat,
  updateHeartbeatStatus as updateHeartbeatStatusAction,
  updateMode,
  updateSensorData,
  updateStage,
  updateValveData,
} from "./store/actions";

const SOCKETIO_URL =
  "http://" +
  config.telemetry.SOCKETIO_HOST +
  ":" +
  config.telemetry.SOCKETIO_PORT;

const socket = io(SOCKETIO_URL);

const generalUpdates = {
  heartbeat: updateHeartbeat,
  stage: updateStage,
  mode: updateMode,
  response: addResponse,
};

export const createSocketIoCallbacks = (store) => {
  socket.on("general", function (log) {
    const { header } = log;
    if (header in generalUpdates) {
      store.dispatch(generalUpdates[header](log));
    } else {
      console.log("Unknown general header");
    }
  });

  socket.on("sensor_data", function (log) {
    store.dispatch(updateSensorData(log));
  });

  socket.on("valve_data", function (log) {
    store.dispatch(updateValveData(log));
  });

  const sendMessage = (header, message) => {
    const log = { header, message };
    console.log("Sending: " + log);
    socket.emit("button_press", log);
  };

  const handleChange = () => {
    let buttons = store.getState().buttonReducer;
    let header = [];
    let message = {};

    if (buttons.abort.soft) {
      header = ["soft_abort"];
      message = {};
      store.dispatch(abortPressed({ type: "soft", pressed: true }));
      sendMessage(header, message);
    }

    if (buttons.abort.undosofty) {
      header = ["undo_soft_abort"];
      message = {};
      store.dispatch(undoSoftAbort({ pressed: true }));
      sendMessage(header, message);
    }

    if (buttons.request.valve[0] !== undefined) {
      header = ["valve_request", buttons.request.valve[0]];
      message = {
        valve_location: buttons.request.valve[1],
      };
      store.dispatch(
        requestPressed({
          type: "valve",
          objectType: undefined,
          location: undefined,
        })
      );
      sendMessage(header, message);
    }

    if (buttons.request.sensor[0] !== undefined) {
      header = ["sensor_request", buttons.request.sensor[0]];
      message = {
        sensor_location: buttons.request.sensor[1],
      };
      store.dispatch(
        requestPressed({
          type: "sensor",
          objectType: undefined,
          location: undefined,
        })
      );
      sendMessage(header, message);
    }

    if (buttons.general.progress) {
      header = ["progress"];
      message = {};
      store.dispatch(generalPressed({ type: "progress", pressed: false }));
      sendMessage(header, message);
    }

    for (let valve in buttons.actuation) {
      let [type, priority] = buttons.actuation[valve];
      if (type == null || priority == null) {
        continue;
      }

      header = ["solenoid_actuate", valve, type];
      message = { priority };
      console.log(type, priority);
      console.log("Dispatching null");
      store.dispatch(
        actuatePressed({ valve, type: undefined, priority: undefined })
      );
      console.log(store.getState());
      sendMessage(header, message);
    }
  };

  store.subscribe(handleChange);
};

export const updateHeartbeatStatus = (store) => {
  let general = store.getState().data.general;

  if (general.heartbeat === undefined) {
    store.dispatch(updateHeartbeatStatusAction(1));
  } else {
    const timeSinceLastHeartbeatReceived =
      Date.now() - general.heartbeat_recieved;

    if (timeSinceLastHeartbeatReceived > 10000) {
      store.dispatch(updateHeartbeatStatusAction(1));
    } else if (timeSinceLastHeartbeatReceived > 6000) {
      store.dispatch(updateHeartbeatStatusAction(2));
    } else {
      store.dispatch(updateHeartbeatStatusAction(3));
    }
  }
};
