export const updateSensorData = (data) => ({
    type: "UPDATE_SENSOR_DATA", 
    data
})


export const updateValveData = (data) => ({
  type: "UPDATE_VALVE_DATA", 
  data
})

export const updateHeartbeat = (data) => ({
  type: "UPDATE_HEARTBEAT", 
  data
})
