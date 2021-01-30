import { Store } from "redux";
import io from "socket.io-client";
import config from "./config.json";
import caelusLogger from "./lib/caelusLogger";
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
  UpdateSensorDataAction,
  updateStage,
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

const generalUpdates = {
  heartbeat: updateHeartbeat,
  stage: updateStage,
  mode: updateMode,
  response: addResponse,
};

export type Log = {
  header: "heartbeat" | "stage" | "mode" | "response";
  message: unknown;
};

export const createSocketIoCallbacks = (store: Store<CaelusState>) => {
  socket.on("general", (log: Log) => {
    const { header } = log;
    if (header in generalUpdates) {
      store.dispatch(generalUpdates[header](log));
    } else {
      caelusLogger("sockets", "Unknown general header", "warn");
    }
  });

  socket.on("sensor_data", (log: UpdateSensorDataAction["data"]) => {
    store.dispatch(updateSensorData(log));
  });

  socket.on("valve_data", (log: UpdateValveDataAction["data"]) => {
    store.dispatch(updateValveData(log));
  });

  const sendMessage = (header: string, message: any = {}) => {
    const log = { header, message };
    caelusLogger("send-message", log);
    socket.emit("button_press", log);
  };

  // THE FORMAT FOR THESE MESSAGES SHOULD MATCH THE FORMAT LISTED IN FLIGHT SOFTWARE'S TELEMETRYCONTROL

  const handleChange = () => {
    let buttons = store.getState().buttonReducer;

    if (buttons.abort.soft) {
      // Create / send the Packet
      store.dispatch(abortPressed({ type: "soft", pressed: false }));
      // Reset the button back to unclicked
      sendMessage("soft_abort", {});
    }

    if (buttons.abort.undosoft) {
      // Create / send the Packet
      sendMessage("undo_soft_abort", {});
      // Reset the button back to unclicked
      store.dispatch(undoSoftAbortPressed({ pressed: false }));
    }

    if (buttons.request.valve.type != null) {
      // Create / send the Packet
      const header = "valve_request";
      const message = {
        valve_type: buttons.request.valve.type,
        valve_location: buttons.request.valve.location,
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

    if (buttons.request.sensor.location !== undefined) {
      // Create the Packet
      const header = "sensor_request";
      const message = {
        sensor_type: buttons.request.sensor.type,
        sensor_location: buttons.request.sensor.location,
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
      sendMessage("progress");
      // Reset the button back to unclicked
      store.dispatch(generalPressed({ type: "progress", pressed: false }));
    }

    for (let valveName in buttons.actuation) {
      // Loop through all the buttons
      let { type, priority } = buttons.actuation[valveName];
      if (type == null || priority == null) {
        continue;
      }

      // Create / send the Packet for the corresponding button
      const header = "solenoid_actuate";
      const message = {
        valve_location: valveName,
        actuation_type: type,
        priority: priority,
      };

      caelusLogger("valve-actuation", `Actuating valve @${valveName}`);

      sendMessage(header, message);
      // Reset the corresponding button back to unclicked
      store.dispatch(actuatePressed({ valve: valveName }));
    }
  };

  store.subscribe(handleChange);
};

export const updateHeartbeatStatus = (store: Store<CaelusState>) => {
  let general = store.getState().data.general;

  if (general.heartbeat === undefined) {
    store.dispatch(updateHeartbeatStatusAction(1));
  } else {
    const timeSinceLastHeartbeatReceived =
      Date.now() - general.heartbeat_received;

    if (timeSinceLastHeartbeatReceived > 10000) {
      store.dispatch(updateHeartbeatStatusAction(1));
    } else if (timeSinceLastHeartbeatReceived > 6000) {
      store.dispatch(updateHeartbeatStatusAction(2));
    } else {
      store.dispatch(updateHeartbeatStatusAction(3));
    }
  }
};
