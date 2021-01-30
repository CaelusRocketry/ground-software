import React, { useState } from "react";
import Plot from "react-plotly.js";
import { useSelector } from "react-redux";
import caelusLogger from "../lib/caelusLogger";
import { sensors } from "../lib/locationNames";
import stylizeName from "../lib/stylizeName";
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
  undefined: {
    xaxis: "Undefined",
    yaxis: "Undefined",
    title: "Undefined",
  },
};

export type SensorType = "thermocouple" | "pressure" | "load" | "undefined";

export type GraphProps = {
  type: SensorType;
  location: string;
};

const Graph = (props: GraphProps) => {
  const [metadata, setMetadata] = useState({
    type: props.type,
    location: props.location,
  });

  // RETRIEVE DATA
  const data = useSelector((state: CaelusState) => {
    // Graph type hasn't been selected yet
    if (metadata.type === "undefined" || metadata.location === "undefined") {
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
  const findRange = (type: SensorType, loc: string) => {
    if (type === "undefined" || loc === "undefined") {
      return [0, 0];
    } else {
      return [
        // @ts-ignore
        sensors[type][loc].boundaries.safe[0],
        // @ts-ignore
        sensors[type][loc].boundaries.warn[1],
      ];
    }
  };

  // DROPDOWN OPTIONS
  const DropdownOptions = () => {
    let arr: { loc: string; type: string }[] = [
      {
        loc: "undefined",
        type: "undefined",
      },
    ];

    for (let [type, locs] of Object.entries(sensors)) {
      for (let loc in locs) {
        arr.push({ loc, type });
      }
    }

    return (
      <>
        {arr.map(({ loc, type }) => {
          let value = `${loc}.${type}`;
          return (
            <option value={value} key={value}>
              {stylizeName(loc)}/{stylizeName(type)}
            </option>
          );
        })}
      </>
    );
  };

  const axisTitleFont = {
    family: "Courier New, monospace",
    size: 17,
    color: "#7f7f7f",
  };

  // DROPDOWN + GRAPH
  return (
    <div>
      <select
        onChange={(e) => {
          const [location, type] = e.target.value.split(".");
          setMetadata({ type: type as SensorType, location });
        }}
        value={metadata.location + "." + metadata.type}
      >
        <DropdownOptions />
      </select>
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
    </div>
  );
};

export default Graph;
