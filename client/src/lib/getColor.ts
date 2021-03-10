import caelusLogger from "./caelusLogger";

const getColor = (status: any) => {
  if(status == undefined){
    return "black";
  }
  switch (status) {
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
