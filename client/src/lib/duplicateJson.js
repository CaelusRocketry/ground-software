export default function duplicateJson(value) {
  let cloned = JSON.parse(JSON.stringify(value));
  console.log("CLONE: " + cloned);
  return cloned;
}
