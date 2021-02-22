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
    console.log("Sending: ");
    console.log(log);
    socket.emit("button_press", log);
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
      store.dispatch(abortPressed({ type: "soft", pressed: false }));
      // Reset the button back to unclicked
      sendMessage(header, message);
    }

    if (buttons.abort.undosoft) {
      // Create / send the Packet
      header = "undo_soft_abort";
      message = {};
      sendMessage(header, message);
      // Reset the button back to unclicked
      store.dispatch(undoSoftAbortPressed({ pressed: false }));
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
    }

    if (buttons.general.progress) {
      // Create / send the Packet
      header = "progress";
      message = {};
      sendMessage(header, message);
      // Reset the button back to unclicked
      store.dispatch(generalPressed({ type: "progress", pressed: false }));
    }
    
    console.log('In button.actuations!')
    for (let valve in buttons.actuation) {
      // Loop through all the buttons
      console.log('Valve: ' + valve)
   
      let [type, priority] = buttons.actuation[valve];
      if (type != undefined && priority != undefined)
      {
        console.log('BUTTON WORKED')
        console.log(type)
        console.log(priority)
      }
      if (type == null || priority == null) {
        continue;
      }

      // Create / send the Packet for the corresponding button
      header = "solenoid_actuate";
      message = { 
        valve_location: String(valve),
        actuation_type: String(type),
        priority: String(priority)
      };
      console.log(type, priority);
      console.log("Dispatching null");
      sendMessage(header, message);
      // Reset the corresponding button back to unclicked
      store.dispatch(
        actuatePressed({ valve, type: undefined, priority: undefined })
      );
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
};
