import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import { Event, Timeline } from "../components/Timeline";
import config from "../config.json";
import Progress from "./../components/Progress";

const stages = config["stages"]["list"];
const stageNames = {
  waiting: "Waiting",
  pressurization: "Pressurization",
  autosequence: "Autosequence",
  postburn: "Postburn",
};

const SequencePane = () => {
  const currentStageIndex = useSelector((state) =>
    stages.indexOf(state.data.general.stage)
  );
  const percentage = useSelector((state) => state.data.general.percent_data);
  console.log("Percentage: " + percentage);

  const calculateColor = (idx) => {
    if (currentStageIndex === idx) {
      return "#ffff00"; // yellow
    } else if (currentStageIndex > idx) {
      return "#00ff00"; // green
    } else {
      return "#ff0000"; // red
    }
  };

  const calculateTitle = (idx) => {
    if (currentStageIndex === idx) {
      if (percentage === 100) {
        return "Ready for next stage";
      } else {
        return "In Progress";
      }
    } else if (currentStageIndex > idx) {
      return "Completed";
    } else {
      return "Pending";
    }
  };

  const calculatePercentage = (idx) => {
    if (currentStageIndex === idx) {
      return percentage;
    } else if (currentStageIndex > idx) {
      return 100;
    } else {
      return 0;
    }
  };

  return (
    <div className="pane">
      <Header>Sequence</Header>
      <Timeline>
        {stages.map((stage, idx) => (
          <Event
            interval={calculateTitle(idx)}
            title={stageNames[stage]}
            intervalBackground={calculateColor(idx)}
            key={idx}
          >
            <Progress percentage={calculatePercentage(idx)} />
          </Event>
        ))}
      </Timeline>
    </div>
  );
};

export default SequencePane;
