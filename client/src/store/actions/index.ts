import { CaelusState } from "../reducers";

export type SensorData = {
  measured: number;
  kalman: number;
  status: string;
};

export type UpdateSensorDataAction = {
  type: "UPDATE_SENSOR_DATA";
  data: {
    timestamp: number;
    message: {
      [type: string]: {
        [location: string]: SensorData;
      };
    };
  };
};

export const updateSensorData = (
  data: UpdateSensorDataAction["data"]
): UpdateSensorDataAction => ({
  type: "UPDATE_SENSOR_DATA",
  data,
});

export type ValveData = 0 | 1;

export type UpdateValveDataAction = {
  type: "UPDATE_VALVE_DATA";
  data: {
    message: {
      [type: string]: {
        [location: string]: ValveData;
      };
    };
    timestamp: number;
  };
};

export const updateValveData = (
  data: UpdateValveDataAction["data"]
): UpdateValveDataAction => ({
  type: "UPDATE_VALVE_DATA",
  data,
});

export type UpdateHeartbeatAction = {
  type: "UPDATE_HEARTBEAT";
  data: number
};

export const updateHeartbeat = (
  data: UpdateHeartbeatAction["data"]
): UpdateHeartbeatAction => ({
  type: "UPDATE_HEARTBEAT",
  data,
});

export type UpdateHeartbeatStatusAction = {
  type: "UPDATE_HEARTBEAT_STATUS";
  data: {
    heartbeat_status: 1 | 2 | 3;
  };
};

export const updateHeartbeatStatus = (
  heartbeat_status: 1 | 2 | 3
): UpdateHeartbeatStatusAction => ({
  type: "UPDATE_HEARTBEAT_STATUS",
  data: {
    heartbeat_status,
  },
});

export type UpdateStageAction = {
  type: "UPDATE_STAGE";
  data: {
    stage: "waiting" | "pressurization" | "autosequence" | "postburn";
    status: number;
  };
};

export const updateStage = (
  data: UpdateStageAction["data"]
): UpdateStageAction => ({
  type: "UPDATE_STAGE",
  data,
});

export type UpdateCountdownAction = {
  type: "UPDATE_COUNTDOWN";
};

export const updateCountdown = (): UpdateCountdownAction => ({
  type: "UPDATE_COUNTDOWN",
});

export type AddResponseAction = {
  type: "ADD_RESPONSE";
  data: {
    header: string;
    message: {
      [key: string]: any;
    };
    timestamp: number;
  };
};

export const addResponse = (
  data: AddResponseAction["data"]
): AddResponseAction => ({
  type: "ADD_RESPONSE",
  data,
});

export type UpdateGeneralCopy = {
  type: "UPDATE_GENERAL_COPY";
  data: CaelusState["data"]["general"];
};

export type UpdateValveCopy = {
  type: "UPDATE_VALVE_COPY";
  data: CaelusState["data"]["valveData"];
};

export type UpdateSensorCopy = {
  type: "UPDATE_SENSOR_COPY";
  data: CaelusState["data"]["sensorData"];
};

export const updateGeneralCopy = (data: UpdateGeneralCopy["data"]) => ({
  type: "UPDATE_GENERAL_COPY",
  data,
});

export const updateSensorCopy = (data: UpdateSensorCopy["data"]) => ({
  type: "UPDATE_SENSOR_COPY",
  data,
});

export const updateValveCopy = (data: UpdateValveCopy["data"]) => ({
  type: "UPDATE_VALVE_COPY",
  data,
});

export type DataAction =
  | UpdateCountdownAction
  | UpdateHeartbeatAction
  | UpdateHeartbeatStatusAction
  | UpdateModeAction
  | UpdateSensorDataAction
  | UpdateStageAction
  | UpdateValveDataAction
  | UpdateGeneralCopy
  | UpdateValveCopy
  | UpdateSensorCopy
  | AddResponseAction;

export type GeneralPressedAction = {
  type: "GENERAL_PRESSED";
  data: {
    type: "progress";
    pressed: boolean;
  };
};

export const generalPressed = (
  data: GeneralPressedAction["data"]
): GeneralPressedAction => ({
  type: "GENERAL_PRESSED",
  data,
});

export type AbortPressedAction = {
  type: "ABORT_PRESSED";
  data: {
    type: "soft";
    pressed: boolean;
  };
};

export const abortPressed = (
  data: AbortPressedAction["data"]
): AbortPressedAction => ({
  type: "ABORT_PRESSED",
  data,
});

export type UndoSoftAbortPressedAction = {
  type: "UNDO_SOFT_ABORT_PRESSED";
  data: any;
};

export const undoSoftAbortPressed = (
  data: UndoSoftAbortPressedAction["data"]
): UndoSoftAbortPressedAction => ({
  type: "UNDO_SOFT_ABORT_PRESSED",
  data,
});

export type RequestPressedActionData = {
  type: "valve" | "sensor";
  objectType?: string;
  location?: string;
};

export type RequestPressedAction = {
  type: "REQUEST_PRESSED";
  data: RequestPressedActionData;
};

export const requestPressed = (
  data: RequestPressedActionData
): RequestPressedAction => ({
  type: "REQUEST_PRESSED",
  data,
});

export type ActuatePressedAction = {
  type: "ACTUATE_PRESSED";
  data: any;
};

export const actuatePressed = (data: any): ActuatePressedAction => ({
  type: "ACTUATE_PRESSED",
  data,
});

export type ButtonAction =
  | GeneralPressedAction
  | AbortPressedAction
  | ActuatePressedAction
  | RequestPressedAction
  | UndoSoftAbortPressedAction;

export type UpdateModeAction = {
  type: "UPDATE_MODE";
  data: {
    header: string;
    mode: string;
  };
};

export const updateMode = (
  data: UpdateModeAction["data"]
): UpdateModeAction => ({
  type: "UPDATE_MODE",
  data,
});
