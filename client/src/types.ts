export type AbortLevel = "normal" | "soft_abort" | "hard_abort";

export type ActuationType =
  | "open_vent"
  | "close_vent"
  | "pulse"
  | "stop_actuation";

/**
 * An actuation priority: 1 is the highest, 3 is the lowest.
 */
export type ActuationPriority = 1 | 2 | 3;

export type ControlTask =
  | "stage"
  | "pressure"
  | "telemetry"
  | "valve"
  | "sensor";

export type Stage = "waiting" | "pressurization" | "autosequence" | "postburn";

export type HeartbeatStatus = 1 | 2 | 3;

export type TelemetryResponse = {
  header: string;
  message: any;
  timestamp: number;
};
