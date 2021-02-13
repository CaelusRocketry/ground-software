import React, { useState, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import {
  actuateValve,
  progressStage,
  requestSensorData,
  requestValveData,
  softAbort,
  undoSoftAbort,
} from "../api";
import Header from "../components/Header";
import caelusLogger from "../lib/caelusLogger";
import {
  actuationTypeNames,
  sensorLocationNames,
  SensorLocations,
  sensorLocations,
  sensorTypeNames,
  sensorTypes,
  stageNames,
  stages,
  valveLocationNames,
  ValveLocations,
  valveLocations,
  valveTypeNames,
  valveTypes,
} from "../lib/locationNames";
import { CaelusState } from "../store/reducers";
import ButtonPaneSelector from "./ButtonPaneSelector";

const round = (progress: number, places: number) => Number(progress).toFixed(places);

// Fonts used for the different buttons
const buttonStyles = {
  big:
    "mt-2 col-md-12 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-900",
  small:
    "ml-6 mt-2 col-md-12 bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded",
  smallMarginless:
    "col-md-12 bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded",
};

function onClickedSoftAbort(type: "soft") {
  if (window.confirm("Are you sure you want to " + type + " abort?")) {
    caelusLogger("button-press", "Confirmed abort");
    softAbort();
  }
}

function onClickedActuateValve(
  valveLocation?: string,
  valveType?: string,
  actuationType?: string,
  actuationPriority?: string
) {
  caelusLogger("button-press", {
    button: "actuate_valves",
    info: { valveLocation, valveType, actuationPriority },
  });

  if (
    valveLocation == null ||
    valveType == null ||
    actuationType == null ||
    actuationPriority == null
  ) {
    alert("You haven't selected something for each dropdown.");
  } else {
    if (
      window.confirm(
        `Are you sure you want to actuate the ${valveType} valve at ${valveLocation} w/ priority ${actuationPriority}`
      )
    ) {
      actuateValve({
        valveType,
        valveLocation,
        actuationType,
        actuationPriority,
      });
    }
  }
}

function onClickedUndoSoftAbort() {
  // TODO: If the current mode isn't Soft Abort, don't allow this (gray out the button, and if they somehow click on it then alert them that its a disallowed action)
  if (window.confirm("Are you sure you want to undo soft abort?")) {
    caelusLogger("button-press", "Confirmed undo abort");
    undoSoftAbort();
  }
}

function onClickedRequestValveData(type?: string, location?: string) {
  if (type == null || location == null) {
    alert("You haven't selected something for each dropdown.");
  } else {
    requestValveData({ type, location });
  }
}

function onClickedRequestSensorData(type?: string, location?: string) {
  if (type == null || location == null) {
    alert("You haven't selected something for each dropdown.");
  } else {
    requestSensorData({ type, location });
  }
}

const ButtonPane = () => {
  // Used to display the current stage and current progress on the stage
  const currentStage = useSelector((state: CaelusState) =>
    stages.indexOf(state.data.general.stage)
  );
  const currentProgress = useSelector(
    (state: CaelusState) => state.data.general.percent_data
  );

  // Used to display the current countdown
  const currentCountdown = useSelector(
    (state: CaelusState) => state.data.general.countdown
  );

  // Used to check if the rocket is currently softabortable
  const mode = useSelector((state: CaelusState) => state.data.general.mode);

  // Each of the different mini views that pop up when you click on the heading of the view
  const [views, setViews] = useState({
    abort: false,
    actuation: false,
    sensor: false,
    valve: false,
  });

  const onClickedStageProgress = useCallback(() => {
    // If the pi isn't 100% ready to progress to next stage, mention that here. Otherwise, progress (w/ confirmation).
    // @ts-ignore
    const nextStageName = stageNames[stages[currentStage + 1]];
    if (
      window.confirm(`Are you sure you want to progress to ${nextStageName}?`)
    ) {
      progressStage();
    }
  }, [currentStage]);

  // If u click on a closed view, it opens. If it's already opened, it closes.
  const switchView = (name: keyof typeof views) =>
    setViews({ ...views, [name]: !views[name] });

  const actuationTypeRef = useRef<HTMLSelectElement>(null);
  const actuationPriorityRef = useRef<HTMLSelectElement>(null);
  const actuateValveTypeRef = useRef<HTMLSelectElement>(null);
  const actuateValveLocationRef = useRef<HTMLSelectElement>(null);
  const [requestSensorType, setRequestSensorType] = useState<
    keyof SensorLocations
  >("pressure");
  const requestSensorLocationRef = useRef<HTMLSelectElement>(null);
  const [requestValveType, setRequestValveType] = useState<
    keyof ValveLocations
  >("solenoid");
  const requestValveLocationRef = useRef<HTMLSelectElement>(null);

  return (
    <div className="pane">
      <Header>Actions</Header>

      <div>
        <button
          onClick={() => {
            switchView("abort");
          }}
          className={buttonStyles.big}
        >
          Abort
        </button>
      </div>
      <div className={views.abort ? "block" : "hidden"}>
        <button
          className={buttonStyles.small}
          onClick={() => onClickedSoftAbort("soft")}
          disabled={mode === "Normal" ? false : true}
        >
          Soft Abort
        </button>
      </div>
      <div className={views.abort ? "show" : "hidden"}>
        <button
          className={buttonStyles.small}
          onClick={() => onClickedUndoSoftAbort()}
          disabled={mode === "Normal" ? true : false}
        >
          Undo Soft Abort
        </button>
      </div>

      <button
        onClick={() => {
          switchView("actuation");
        }}
        className={buttonStyles.big}
        disabled={mode === "Normal" ? false : true}
      >
        Valve Actuation
      </button>
      <div className={views.actuation ? "block mt-2" : "hidden"}>
        <ButtonPaneSelector
          label="Valve"
          ref={actuateValveLocationRef}
          options={valveLocations.solenoid}
          optionNames={valveLocationNames}
        />
        <ButtonPaneSelector
          label="Actuation Type"
          ref={actuationTypeRef}
          options={[4, 3, 2, 1]}
          optionNames={actuationTypeNames}
        />
        <ButtonPaneSelector
          label="Actuation Priority"
          ref={actuationPriorityRef}
          options={[1, 2, 3]}
          optionNames={{ 1: "1", 2: "2", 3: "3" }}
        />
        <button
          onClick={() =>
            onClickedActuateValve(
              actuateValveLocationRef.current?.value,
              actuateValveTypeRef.current?.value,
              actuationTypeRef.current?.value,
              actuationPriorityRef.current?.value
            )
          }
          className={buttonStyles.smallMarginless}
        >
          Actuate Solenoid
        </button>
      </div>

      <div>
        <button
          onClick={() => {
            switchView("sensor");
          }}
          className={buttonStyles.big}
        >
          Request Sensor Data
        </button>
      </div>
      <div className={views.sensor ? "block mt-2" : "hidden"}>
        <ButtonPaneSelector
          label="Sensor Type"
          onChange={(ev: any) => setRequestSensorType(ev.target.value)}
          value={requestSensorType}
          options={sensorTypes}
          optionNames={sensorTypeNames}
        />
        <ButtonPaneSelector
          label="Sensor Location"
          ref={requestSensorLocationRef}
          options={sensorLocations[requestSensorType]}
          optionNames={sensorLocationNames}
        />
        <button
          onClick={() =>
            onClickedRequestSensorData(
              requestSensorType,
              requestSensorLocationRef.current?.value
            )
          }
          className={buttonStyles.smallMarginless}
        >
          Request Data
        </button>
      </div>

      <div>
        <button
          onClick={() => switchView("valve")}
          className={buttonStyles.big}
        >
          Request Valve State
        </button>
      </div>
      <div className={views.valve ? "block mt-2" : "hidden"}>
        <ButtonPaneSelector
          label="Valve Type"
          onChange={(ev: any) => setRequestValveType(ev.target.value)}
          options={valveTypes}
          optionNames={valveTypeNames}
        />
        <ButtonPaneSelector
          label="Valve Location"
          ref={requestValveLocationRef}
          options={valveLocations[requestValveType]}
          optionNames={valveLocationNames}
        />
        <button
          onClick={() =>
            onClickedRequestValveData(
              requestValveType,
              requestValveLocationRef.current?.value
            )
          }
          className={buttonStyles.smallMarginless}
        >
          Request State
        </button>
      </div>
      <div>
        <button
          onClick={onClickedStageProgress}
          className={buttonStyles.big}
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
