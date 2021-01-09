export const updateSensorData = (data) => ({
  type: "UPDATE_SENSOR_DATA",
  data,
});

export const updateValveData = (data) => ({
  type: "UPDATE_VALVE_DATA",
  data,
});

export const updateHeartbeat = (data) => ({
  type: "UPDATE_HEARTBEAT",
  data,
});

export const updateHeartbeatStatus = (heartbeat_status) => ({
  type: "UPDATE_HEARTBEAT_STATUS",
  heartbeat_status,
});

export const updateStage = (data) => ({
  type: "UPDATE_STAGE",
  data,
});

export const updateCountdown = () => ({
  type: "UPDATE_COUNTDOWN",
});

export const addResponse = (data) => ({
  type: "ADD_RESPONSE",
  data,
});

export const generalPressed = (data) => ({
  type: "GENERAL_PRESSED",
  data,
});

export const abortPressed = (data) => ({
  type: "ABORT_PRESSED",
  data,
});

export const undoSoftAbort = () => ({
  type: "UNDO_SOFT_ABORT",
});

export const requestPressed = (data) => ({
  type: "REQUEST_PRESSED",
  data,
});

export const actuatePressed = (data) => ({
  type: "ACTUATE_PRESSED",
  data,
});

export const updateMode = (data) => ({
  type: "UPDATE_MODE",
  data,
});
