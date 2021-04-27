import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { countDownStart } from "..";
import { progressStage } from "../api";

import { stageNames, stages } from "../lib/locationNames";
import { CaelusState } from "../store/reducers";
import config from "../config.json";

var disable_auth = false
if(!config.Authorized_IPs.includes(window.location.hostname) )
  disable_auth = true
else
  console.log("Authorized access to Actions.")

const round = (progress: number, places: number) =>
  Number(progress).toFixed(places);

const StageProgressPane = () => {

  const currentStage = useSelector((state: CaelusState) =>
    stages.indexOf(state.data.general.stage)
  );
  const currentProgress = useSelector(
    (state: CaelusState) => state.data.general.percent_data
  );

  const currentCountdown = useSelector(
    (state: CaelusState) => state.data.general.countdown
  );

  const onClickedStageProgress = useCallback(() => {
    // If the pi isn't 100% ready to progress to next stage, mention that here. Otherwise, progress (w/ confirmation).
    // @ts-ignore
    const nextStageName = stageNames[stages[currentStage + 1]];
    console.log("Asked for stage progression.")
    if(disable_auth) {
      window.alert("You do not have authorization to progress to the next stage.")
    }  else if ( window.confirm(`Are you sure you want to progress to ${nextStageName}?`) ) {
      if (nextStageName === "Autosequence") {
        countDownStart();
      }
      progressStage();
    }
  }, [currentStage]); 
  

  const buttonStyles = {
    big:
      "mt-2 col-md-12 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-900",
    small:
      "ml-6 mt-2 col-md-12 bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded",
    smallMarginless:
      "col-md-12 bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded",
  };

  
  return(
    <div
      style={{ width: "1000" }}
    >
      <button
        onClick={onClickedStageProgress}
        className={buttonStyles.big}
        disabled={
          (typeof currentProgress == "number" ? currentProgress : parseInt(currentProgress)) !== 100 ||
          (stages[currentStage] === "autosequence" && currentCountdown !== 0) 
          // && disable_auth
        }
      >
        <div className="py-1 px-2">
          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-gray-300 bg-gray-600">
            "{stages[currentStage]}"
            {(typeof currentProgress == "number" ? currentProgress : parseInt(currentProgress)) !== 100 ? " in progress" : " completed"}
          </span>
        </div>
        Progress To {stageNames[stages[currentStage + 1]]}
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-gray-600">
                {round((typeof currentProgress == "number" ? currentProgress : parseInt(currentProgress)), 2)}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-300">
            <div
              style={{ width: round((typeof currentProgress == "number" ? currentProgress : parseInt(currentProgress)), 0).toString() + "%" }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gray-600"
            />
          </div>
        </div>
      </button>
    </div>
  );
};


export default StageProgressPane;