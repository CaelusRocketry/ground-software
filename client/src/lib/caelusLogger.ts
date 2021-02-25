const silencedCategories = new Set([
  "duplicate-json",
  "update-data",
  "telemetry/send",
]);

export type LogCategory =
  | "duplicate-json"
  | "update-data"
  | "telemetry"
  | "telemetry/send"
  | "valves/actuation"
  | "button-press"
  | "heartbeat-status"
  | "graph"
  | "handle-change";
export type LogSeverity = "debug" | "error" | "warn" | "info";

export default function caelusLogger(
  category: LogCategory,
  message: any,
  severity: LogSeverity = "debug"
) {
  if (!silencedCategories.has(category)) {
    console.log(`[${category}] [${severity}]`, message);
  }
}
