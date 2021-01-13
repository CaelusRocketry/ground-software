import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import {
  actuationTypeNames,
  sensorLocationNames,
  sensorLocations,
  sensorTypeNames,
  sensorTypes,
  stageNames,
  stages,
  valveLocationNames,
  valveLocations,
  valveTypeNames,
  valveTypes,
} from "../lib/locationNames";
import {
  abortPressed,
  actuatePressed,
  generalPressed,
  requestPressed,
  undoSoftAbort as undoSoftAbortAction,
} from "../store/actions";

const ButtonPane = () => {
  const dispatch = useDispatch();

  // Fonts used for the different buttons
  const btnBig =
    "mt-2 col-md-12 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-900";
  const btnSmall =
    "ml-6 mt-2 col-md-12 bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded";
  const btnSmallMarginless =
    "col-md-12 bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded";

  // Used to display the current stage and current progress on the stage
  const currentStage = useSelector((state) =>
    stages.indexOf(state.data.general.stage)
  );
  const currentProgress = useSelector(
    (state) => state.data.general.percent_data
  );

  // Used to display the current countdown
  const currentCountdown = useSelector((state) => state.data.general.countdown);

  // Used to check if the rocket is currently softabortable
  const mode = useSelector((state) => state.data.general.mode);

  // Each of the different mini views that pop up when you click on the heading of the view
  const [views, setViews] = useState({
    abort: false,
    actuation: false,
    sensor: false,
    valve: false,
  });

  const [selectValues, setSelectValues] = useState({});

  const abort = (type) => {
    if (window.confirm("Are you sure you want to " + type + " abort?")) {
      dispatch(abortPressed({ type, pressed: true }));
    }
  };

  const undoSoftAbort = () => dispatch(undoSoftAbortAction({ pressed: true }));

  const actuateValve = (location, type, priority) => {
    console.log(selectValues);
    console.log([location, type, priority]);

    if ([location, type, priority].includes(undefined)) {
      alert("You haven't selected something for each dropdown.");
    } else {
      if (
        window.confirm(
          `Are you sure you want to actuate the ${type} valve at ${location} w/ priority ${priority}`
        )
      ) {
        dispatch(
          actuatePressed({
            valve: location,
            actuation_type: parseInt(type),
            priority: parseInt(priority),
          })
        );
      }
    }
  };

  const request = (type, objectType, location) => {
    if ([type, objectType, location].includes(undefined)) {
      alert("You haven't selected something for each dropdown.");
    } else {
      dispatch(requestPressed({ type, objectType, location }));
    }
  };

  const progress = () => {
    // If the pi isn't 100% ready to progress to next stage, mention that here. Otherwise, progress (w/ confirmation).
    const nextStageName = stageNames[stages[currentStage + 1]];
    if (
      window.confirm(`Are you sure you want to progress to ${nextStageName}?`)
    ) {
      dispatch(generalPressed({ type: "progress", pressed: true }));
    }
  };

  const handleSelectChange = (e, name) => {
    setSelectValues({
      ...selectValues,
      [name]: e.target.value,
    });
  }

  const Select = ({ label, name, options, optionName }) => {

    return (
      <div className="float-left">
        <b>
          <label>{label}: </label>
        </b>
        <select
          value={selectValues[name]}
          onChange={(e) => {
            handleSelectChange(e, name);
          }}
          className="ml-2 mr-4 border-2"
        >
          <option className="hidden" />
          {Array.from(options).map((option) => (
            <option value={option}>{optionName[option]}</option>
          ))}
        </select>
      </div>
    );
  };

  // If u click on a closed view, it opens. If it's already opened, it closes.
  const switchView = (name) => 
    setViews({ ...views, [name]: !views[name] });

  const round = (progress, places) => {
    if (typeof progress != "number") {
      return 0;
    } else {
      return progress.toFixed(places);
    }
  };

  return (
    <div className="pane">
      <Header>Actions</Header>

      <div>
        <button
          onClick={() => {
            switchView("abort");
          }}
          className={btnBig}
        >
          Abort
        </button>
      </div>
      <div className={views.abort ? "block" : "hidden"}>
        <button
          className={btnSmall}
          onClick={() => abort("soft")}
          disabled={mode === "Normal" ? false : true}
        >
          Soft Abort
        </button>
      </div>
      <div className={views.abort ? "show" : "hidden"}>
        <button
          className={btnSmall}
          onClick={() => undoSoftAbort()}
          disabled={mode === "Normal" ? true : false}
        >
          Undo Soft Abort
        </button>
      </div>

      <button
        onClick={() => {
          switchView("actuation");
        }}
        className={btnBig}
        disabled={mode === "Normal" ? false : true}
      >
        Valve Actuation
      </button>
      <div className={views.actuation ? "block mt-2" : "hidden"}>
        <b>
          <label>Valve: </label>
        </b>
        <Select
          label="Valve"
          name="actuationValve"
          options={valveLocations}
          optionName={valveLocationNames}
        />
        <Select
          label="Actuation Type"
          name="actuationType"
          options={[4, 3, 2, 1]}
          optionName={actuationTypeNames}
        />
        <Select
          label="Actuation Priority"
          name="actuationPriority"
          options={[1, 2, 3]}
          optionName={{ 1: 1, 2: 2, 3: 3 }}
        />
        <button
          onClick={() =>
            actuateValve(
              selectValues.actuationValve,
              selectValues.actuationType,
              selectValues.actuationPriority
            )
          }
          className={btnSmallMarginless}
        >
          Actuate Solenoid
        </button>
      </div>

      <div>
        <button
          onClick={() => {
            switchView("sensor");
          }}
          className={btnBig}
        >
          Request Sensor Data
        </button>
      </div>
      <div className={views.sensor ? "block mt-2" : "hidden"}>
        <Select
          label="Sensor Type"
          name="requestSensor"
          options={sensorTypes}
          optionName={sensorTypeNames}
        />
        {/* {} */}
        <Select
          label="Sensor Location"
          name="requestSensorLocation"
          options={sensorLocations}
          optionName={sensorLocationNames}
        />
        <button
          onClick={() =>
            request(
              "sensor",
              selectValues.requestSensor,
              selectValues.requestSensorLocation
            )
          }
          className={btnSmallMarginless}
        >
          Request Data
        </button>
      </div>

      <div>
        <button onClick={() => switchView("valve")} className={btnBig}>
          Request Valve State
        </button>
      </div>
      <div className={views.valve ? "block mt-2" : "hidden"}>
        <Select
          label="Valve Location"
          name="requestValveLocation"
          options={valveLocations}
          optionName={valveLocationNames}
        />
        <Select
          label="Valve Type"
          name="requestValve"
          options={valveTypes}
          optionName={valveTypeNames}
        />
        <button
          onClick={() =>
            request(
              "valve",
              selectValues.requestValve,
              selectValues.requestValveLocation
            )
          }
          className={btnSmallMarginless}
        >
          Request State
        </button>
      </div>
      <div>
        <button
          onClick={progress}
          className={btnBig}
          disabled={
            currentProgress !== 100 ||
            (stages[currentStage] === "autosequence" && currentCountdown !== 0)
          }
        >
          <div className="py-1 px-2">
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-gray-300 bg-gray-600">
              "{stages[currentStage]}"
              {currentProgress !== 100 ? " in progress" : " completed"}
            </span>
          </div>
          Progress To {stageNames[stages[currentStage + 1]]}
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-gray-600">
                  {round(currentProgress, 2)}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-300">
              <div
                style={{ width: round(currentProgress, 0).toString() + "%" }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gray-600"
              />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ButtonPane;
