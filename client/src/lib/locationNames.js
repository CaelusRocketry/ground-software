import config from "../config.json";

export const stages = config.stages.list;

export const stageNames = {
  waiting: "Waiting",
  pressurization: "Pressurization",
  autosequence: "Autosequence",
  postburn: "Postburn",
};

export const valves = config.valves.list;

export const valveTypes = new Set();
export const valveLocations = new Set();

for (var type in valves) {
  valveTypes.add(type);
  for (var loc in valves[type]) {
    valveLocations.add(loc);
  }
}

export const valveTypeNames = {
  ball: "Ball",
  solenoid: "Solenoid",
};

export const valveLocationNames = {
  main_propellant_valve: "Main Propellant Valve",
  pressure_relief: "Pressure Relief Valve",
  pressurization: "Pressurization Valve",
};

export const actuationTypeNames = {
  4: "Pulse",
  3: "Open Vent",
  2: "Close Vent",
  1: "Stop actuation",
};

export const sensors = config.sensors.list;

export const sensorLocations = new Set();
export const sensorTypes = new Set();

for (let type in sensors) {
  sensorTypes.add(type);
  for (let loc in sensors[type]) {
    sensorLocations.add(loc);
  }
}

export const sensorLocationNames = {
  chamber: "Chamber",
  tank: "Tank",
  injector: "Injector",
};

export const sensorTypeNames = {
  thermocouple: "Thermocouple",
  pressure: "Pressure Sensor",
  load: "Load Sensor",
};
