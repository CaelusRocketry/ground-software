export const updateSensorData = (data) => ({
    type: "UPDATE_SENSOR_DATA", 
    data
});

export const updateValveData = (data) => ({
  type: "UPDATE_VALVE_DATA", 
  data
});

export const updateHeartbeat = (data) => ({
  type: "UPDATE_HEARTBEAT", 
  data
});

export const generalPressed = (data) => ({
  type: "GENERAL_PRESSED",
  data
});

export const abortPressed = (data) => ({
  type: "ABORT_PRESSED",
  data
});

export const requestPressed = (data) => ({
  type: "REQUEST_PRESSED",
  data
});

export const actuatePressed = (data) => ({
  type: "ACTUATE_PRESSED",
  data
});
