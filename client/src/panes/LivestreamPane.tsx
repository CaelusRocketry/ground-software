import React from "react";

import Header from "../components/Header";
import "../index.css";
import { useSelector } from "react-redux";

import { VALVE_MAP, PADDING } from "../lib/pid";
import { CaelusState } from "../store/reducers";
import config from "../config.json";
import Livestreambase from "../images/livestream/LivestreamBaseNitrous.png";

const LivestreamPane = () => (
  <img
  src={Livestreambase}
  id={"livestreambase"}
  alt={"livestreambase"}
  style={{ width: "100%" }}
/>
);

export default LivestreamPane;
