import caelusLogger from "./caelusLogger";

export default function duplicateJson<T>(value: T): T {
  let cloned = JSON.parse(JSON.stringify(value));
  caelusLogger("duplicate-json", cloned);
  return cloned;
}
