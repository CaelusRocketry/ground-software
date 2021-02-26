import { combineReducers } from "redux";
import buttonReducer, { ButtonState } from "./buttons";
import dataReducer, { StatsState } from "./stats";

export type CaelusState = {
  data: StatsState;
  buttonReducer: ButtonState;
};

export default combineReducers({
  data: dataReducer,
  buttonReducer: buttonReducer,
});
