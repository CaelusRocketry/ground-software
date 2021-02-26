import caelusLogger from "./caelusLogger";

const getColor = (status: any) => {
  if (status.length === 0) {
    return "black";
  }
  switch (status[status.length - 1][1]) {
    case 3:
      return "green";
    case 2:
      return "orange";
    case 1:
      return "red";
    default:
      caelusLogger("heartbeat-status", "Invalid heartbeat status", "warn");
      return "blue";
  }
};

export default getColor;
