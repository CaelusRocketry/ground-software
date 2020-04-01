import { combineReducers } from "redux";

import buttonReducer from "./buttons";
import dataReducer from "./stats";
import stageReducer from "./stages"

export default combineReducers({ data: dataReducer, buttonReducer: buttonReducer, stage: stageReducer });
