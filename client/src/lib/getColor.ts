const getColor = (status) => {
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
      return "blue";
  }
};

export default getColor;
