import React from "react";

import { Timeline, Event } from "../components/Timeline";
import Header from "../components/Header";


const SequencePane = () => (
  <div className="pane">
    <Header title="Sequence" />
    <Timeline>
      <Event interval="Pending" title={"Propellant Loading"}></Event>
      <Event interval="Pending" title={"Leak Testing Phase 1"}></Event>
      <Event interval="Pending" title={"Pressurant Loading"}></Event>
      <Event interval="Pending" title={"Leak Testing Phase 2"}></Event>
      <Event interval="Pending" title={"Pre-Ignition"}></Event>
      <Event interval="Pending" title={"Disconnection"}></Event>
    </Timeline>
  </div>
);

export default SequencePane;
