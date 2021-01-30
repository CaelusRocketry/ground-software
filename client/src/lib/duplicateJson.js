import caelusLogger from "./caelusLogger";

export default function duplicateJson(value) {
  let cloned = JSON.parse(JSON.stringify(value));
  caelusLogger("duplicate-json", cloned);
  return cloned;
}
