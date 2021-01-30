const capitalize = (string) => {
  return string[0].toUpperCase() + string.slice(1);
};

const stylizeName = (name) => {
  return name
    .split("_")
    .map((word) => capitalize(word))
    .join(" ");
};

export default stylizeName;
