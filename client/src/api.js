import io from "socket.io-client";
import config from "./config.json";
import {
  abortPressed,
  actuatePressed,
  addResponse,
  generalPressed,
  requestPressed,
  undoSoftAbortPressed,
  updateHeartbeat,
  updateHeartbeatStatus as updateHeartbeatStatusAction,
  updateMode,
  updateSensorData,
  updateStage,
  updateValveData,
  updateReduxBackend,
  updateReduxWithBackend,
} from "./store/actions";

const connection = false;

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
    connection = true;
  });

  socket.on("sensor_data", function (log) {
    store.dispatch(updateSensorData(log));
    store.dispatch(updateReduxBackend(log));
    connection = true;
  });

  socket.on("valve_data", function (log) {
    store.dispatch(updateValveData(log));
    store.dispatch(updateReduxBackend(log));
    connection = true;
  });

  const sendMessage = (header, message) => {
    const log = { header, message };
    console.log("Sending: ");
    console.log(log);
    socket.emit("button_press", log);
  };

  const checkConnection = () => {
    if (socket.connected == false) {
      connection = false;
    }
  };

// THE FORMAT FOR THESE MESSAGES SHOULD MATCH THE FORMAT LISTED IN FLIGHT SOFTWARE'S TELEMETRYCONTROL

  const handleChange = () => {
    let buttons = store.getState().buttonReducer;
    let header = "";
    let message = {};

    if (buttons.abort.soft) {
      // Create / send the Packet
      header = "soft_abort";
      message = {};
      console.log("Sent message that soft abort has been pressed");
      sendMessage(header, message);
      store.dispatch(abortPressed({ type: "soft", pressed: false }));
      store.dispatch(updateReduxBackend());
      // Reset the button back to unclicked
    }

    if (buttons.abort.undosoft) {
      // Create / send the Packet
      header = "undo_soft_abort";
      message = {};
      console.log("Sent message that soft abort has been undone");
      sendMessage(header, message);
      store.dispatch(undoSoftAbortPressed({ pressed: false }));
      store.dispatch(updateReduxBackend());
    }

    if (buttons.request.valve[0] !== undefined) {
      // Create / send the Packet
      header = "valve_request";
      message = {
        valve_type: buttons.request.valve[0],
        valve_location: buttons.request.valve[1]
      };
      sendMessage(header, message);
      // Reset the button back to unclicked
      store.dispatch(
        requestPressed({
          type: "valve",
          objectType: undefined,
          location: undefined,
        })
      );
      store.dispatch(updateReduxBackend());
    }

    if (buttons.request.sensor[0] !== undefined) {
      // Create the Packet
      header = "sensor_request";
      message = {
        sensor_type: buttons.request.sensor[0],
        sensor_location: buttons.request.sensor[1]
      };
      sendMessage(header, message);
      // Reset the button back to unclicked
      store.dispatch(
        requestPressed({
          type: "sensor",
          objectType: undefined,
          location: undefined,
        })
      );
      store.dispatch(updateReduxBackend());
    }

    if (buttons.general.progress) {
      // Create / send the Packet
      header = "progress";
      message = {};
      sendMessage(header, message);
      // Reset the button back to unclicked
      store.dispatch(generalPressed({ type: "progress", pressed: false }));
      store.dispatch(updateReduxBackend());
    }

    for (let valve in buttons.actuation) {
      // Loop through all the buttons
      let [type, priority] = buttons.actuation[valve];
      if (type == null || priority == null) {
        continue;
      }

      // Create / send the Packet for the corresponding button
      header = "solenoid_actuate";
      message = { 
        valve_location: valve,
        actuation_type: type,
        priority: priority
      };
      console.log(type, priority);
      console.log("Dispatching null");
      sendMessage(header, message);
      // Reset the corresponding button back to unclicked
      store.dispatch(
        actuatePressed({ valve, type: undefined, priority: undefined })
      );
      store.dispatch(updateReduxBackend());
      console.log(store.getState());
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
  store.dispatch(updateReduxBackend());
};
