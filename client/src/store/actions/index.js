
export const updateThermocoupleData = (data) => ({
  type: "UPDATE_THERMOCOUPLE_DATA",
  state: false,
  data
})

export const updatePressureData = (data) => ({
  type: "UPDATE_PRESSURE_DATA",
  state: false,
  data
})

export const updateLoadData = (data) => ({
  type: "UPDATE_LOAD_DATA", 
  state: false,
  data
})

export const updateTimestamp = (time) => ({
  type: "UPDATE_TIMESTAMP",
  time
})


// export const updateSensorData = (data) => ({
//     type: "UPDATE_SENSOR_DATA", 
//     data
// })


// export const increment = n => ({
//   type: "INCREMENT",
//   payload: n,
// });

// export const decrement = n => ({
//   type: "DECREMENT",
//   payload: n,
// });
