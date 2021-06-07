import React from "react";
import { useSelector } from "react-redux";
import { Event, Timeline } from "./Timeline";
import config from "../config.json";
import Progress from "./Progress";
import { CaelusState } from "../store/reducers";
import { Link } from "react-router-dom";

const stages = config["stages"]["list"];
const stageNames = {
  Waiting: "Waiting",
  Pressurization: "Pressurization",
  Autosequence: "Autosequence",
  Postburn: "Postburn",
};

const calculateColor = (currentStageIndex: number, idx: number) => {
  if (currentStageIndex === idx) {
    return "#ffff00"; // yellow
  } else if (currentStageIndex > idx) {
    return "#00ff00"; // green
  } else {
    return "#ff0000"; // red
  }
};

const calculateTitle = (
  currentStageIndex: number,
  idx: number,
  percentage: number
) => {
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

const calculatePercentage = (
  currentStageIndex: number,
  idx: number,
  percentage: number
) => {
  if (currentStageIndex === idx) {
    return percentage;
  } else if (currentStageIndex > idx) {
    return 100;
  } else {
    return 0;
  }
};

const FooterSequence = () => {
  const currentStageIndex = useSelector((state: CaelusState) =>
    stages.indexOf(state.data.general.stage)
  );
  const percentage = useSelector(
    (state: CaelusState) => state.data.general.percent_data
  );
  console.log("Percentage: " + percentage);

  return (
    <Link to="/stage">
      <Timeline>
        <div
        style={{ display: "flex", flexDirection: "row" }}
        className="footerPane"
        >
          {stages.map((stage, idx) => (
            <Event
              interval={calculateTitle(currentStageIndex, idx, percentage)}
              title={stage}
              intervalBackground={calculateColor(currentStageIndex, idx)}
              key={idx}
            >
              <Progress
                percentage={calculatePercentage(
                  currentStageIndex,
                  idx,
                  percentage
                )}
              />
            </Event>
          ))}
        </div>
      </Timeline>
    </Link>
  );
};

export default FooterSequence;
