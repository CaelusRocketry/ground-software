import caelusLogger from "./caelusLogger";
import stats from "../store/reducers/stats";
import config from "../config.json";

const getColor = (status: any) => {
  if (status.length === 0) {
    return "black";
  }
  switch (status[status.length - 1][1]) {
    case 3:
      return "green";
    case 2:
      return "orange";
    case 1:
      return "red";
    default:
      caelusLogger("heartbeat-status", "Invalid heartbeat status", "warn");
      return "blue";
  }
};

const sensorColor = (sensor, stage) => {
  var measure = sensor.measured;
  var stages = config.sensors.list.pressure.sensor.boundaries.stage;

  if (measure >= stages.safe[0] && measure <= stages.safe[1]) return "green";
  else if (measure >= stages.warn[0] && measure <= stages.warn[1]) return "orange";
  else if (measure >= stages.critical[0] && measure <= stages.critical[1]) return "red";

  //go into state and find the sensor
  //based on stage, check if value is in safe, warn, or critical
  
};

export default getColor;
export default sensorColor;
