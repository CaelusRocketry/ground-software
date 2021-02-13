import React, { useState } from "react";
import Plot from "react-plotly.js";
import { useSelector } from "react-redux";
import caelusLogger from "../lib/caelusLogger";
import { sensors } from "../lib/locationNames";
import stylizeName from "../lib/camelize";
import { CaelusState } from "../store/reducers";

const properties = {
  thermocouple: {
    xaxis: "Time (s)",
    yaxis: "Temperature (C)",
    title: "Temperature vs. Time",
  },
  pressure: {
    xaxis: "Time (s)",
    yaxis: "Pressure (PSI)",
    title: "Pressure vs. Time",
  },
  load: {
    xaxis: "Time (s)",
    yaxis: "Force (N)",
    title: "Load vs. Time",
  },
};

const axisTitleFont = {
  family: "Courier New, monospace",
  size: 17,
  color: "#7f7f7f",
};

export type SensorType = keyof typeof properties;

export type GraphProps = SensorLocation | {};

export type SensorLocation = {
  type: SensorType;
  location: string;
};

const Graph = (props: GraphProps) => {
  const [metadata, setMetadata] = useState<SensorLocation | {}>(props);

  // RETRIEVE DATA
  const data = useSelector((state: CaelusState) => {
    // Graph type hasn't been selected yet
    if (!("type" in metadata)) {
      return { x: [], y: [] };
    }

    let x_values = [];
    let y_values = [];

    let x = state.data.sensorData.timestamps;
    let y = state.data.sensorData.sensors[metadata.type][metadata.location];

    if (x.length !== y.length) {
      caelusLogger(
        "graph",
        `Mismatch in X and Y data for graph. X was ${x.length}, Y was ${y.length}.`,
        "error"
      );
      alert("Mismatch in X and Y data for graph");
      setMetadata({});
      return { x: [], y: [] };
    }

    for (let i = 0; i < x.length; i++) {
      x_values.push(x[i]);
      y_values.push(y[i].kalman);
    }

    return {
      x: x_values,
      y: y_values,
    };
  });

  // RETURN RANGE FOR SENSOR/VALVE READINGS
  const findRange = (type: SensorType, loc: string) => [
    // @ts-ignore
    sensors[type][loc].boundaries.safe[0],
    // @ts-ignore
    sensors[type][loc].boundaries.warn[1],
  ];

  // DROPDOWN OPTIONS
  const DropdownOptions = () => {
    let arr: SensorLocation[] = [];

    for (let [type, locations] of Object.entries(sensors)) {
      for (let location in locations) {
        arr.push({ location, type: type as SensorType });
      }
    }

    return (
      <>
        <option value="none">(No sensor selected)</option>
        {arr.map(({ location, type }) => {
          let value = `${location}.${type}`;
          return (
            <option value={value} key={value}>
              {stylizeName(location)}/{stylizeName(type)}
            </option>
          );
        })}
      </>
    );
  };

  // DROPDOWN + GRAPH
  return (
    <div>
      <select
        onChange={(e) => {
          if (e.target.value === "none") {
            setMetadata({});
          } else {
            const [location, type] = e.target.value.split(".");
            setMetadata({ type: type as SensorType, location });
          }
        }}
        value={
          "type" in metadata
            ? metadata.location + "." + metadata.type
            : "(None selected)"
        }
      >
        <DropdownOptions />
      </select>
      {"type" in metadata ? (
        <Plot
          style={{
            width: "100vh",
            height: "43vh",
          }}
          data={[
            {
              x: data.x,
              y: data.y,
              type: "scatter",
              mode: "lines+markers",
              marker: { color: "red" },
            },
          ]}
          layout={{
            title: metadata.location + "/" + metadata.type,
            titlefont: {
              family: "Courier New, monospace",
              size: 22,
            },
            xaxis: {
              title: properties[metadata.type].xaxis,
              titlefont: axisTitleFont,
              autorange: true,
            },
            yaxis: {
              title: properties[metadata.type].yaxis,
              titlefont: axisTitleFont,
              range: findRange(metadata.type, metadata.location),
              autorange: true,
            },
          }}
        />
      ) : (
        <h1>Choose a sensor to see data</h1>
      )}
    </div>
  );
};

export default Graph;
