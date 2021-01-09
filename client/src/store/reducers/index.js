import { combineReducers } from "redux";
import buttonReducer from "./buttons";
import dataReducer from "./stats";

export default combineReducers({
  data: dataReducer,
  buttonReducer: buttonReducer,
});
