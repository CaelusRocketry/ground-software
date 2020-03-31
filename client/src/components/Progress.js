import React from "react";
import { Line } from "rc-progress";

const Progress = ({ percentage }) => (
  <Line percent={percentage} strokeWidth="4" strokeColor="#D3D3D3" />
);

export default Progress;