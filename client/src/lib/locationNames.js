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
export const valveLocations = {undefined: []};

for (var type in valves) {
  valveTypes.add(type);
  valveLocations[type] = new Set();
  for (var loc in valves[type]) {
    valveLocations[type].add(loc);
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

export const sensorLocations = {undefined: []};
export const sensorTypes = new Set();

for (let type in sensors) {
  sensorTypes.add(type);
  sensorLocations[type] = new Set();
  for (let loc in sensors[type]) {
    sensorLocations[type].add(loc);
  }
}

export const sensorLocationNames = {
  chamber: "Chamber",
  tank: "Tank",
  injector: "Injector",
  "PT-1": "PT-1",
  "PT-2": "PT-2",
  "PT-3": "PT-3",
  "PT-4": "PT-4"
};

export const sensorTypeNames = {
  thermocouple: "Thermocouple",
  pressure: "Pressure Sensor",
  load: "Load Sensor",
};
