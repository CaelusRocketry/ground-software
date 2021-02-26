import config from "../config.json";

export const stageNames = {
  waiting: "Waiting",
  pressurization: "Pressurization",
  autosequence: "Autosequence",
  postburn: "Postburn",
};
export const stages = config.stages.list as (keyof typeof stageNames)[];

export const valves = config.valves.list;
export const valveTypes = new Set<keyof typeof valves>();
export type ValveLocations = Record<keyof typeof valves, Set<string>>;
// @ts-ignore
export const valveLocations: ValveLocations = {};

for (let type in valves) {
  // @ts-ignore
  valveTypes.add(type);
  // @ts-ignore
  valveLocations[type] = new Set();
  // @ts-ignore
  for (let loc in valves[type]) {
    // @ts-ignore
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
export type SensorLocations = Record<keyof typeof sensors, Set<string>>;
// @ts-ignore
export const sensorLocations: SensorLocations = {};
export const sensorTypes = new Set<keyof typeof sensors>();

for (let type of Object.keys(sensors)) {
  // @ts-ignore
  sensorTypes.add(type);
  // @ts-ignore
  sensorLocations[type] = new Set();
  console.log("Added type: " + type);
  // @ts-ignore
  for (let loc in sensors[type]) {
    // @ts-ignore
    sensorLocations[type].add(loc);
    console.log("Added location: " + loc);
  }
}

export const sensorLocationNames = {
  chamber: "Chamber",
  tank: "Tank",
  injector: "Injector",
  "PT-5": "PT-5",
  "PT-P": "PT-P",
  "PT-7": "PT-7",
  "PT-8": "PT-8",
};

export const sensorTypeNames = {
  thermocouple: "Thermocouple",
  pressure: "Pressure Sensor",
  load: "Load Sensor",
};
