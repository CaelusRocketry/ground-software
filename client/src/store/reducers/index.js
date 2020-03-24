import { combineReducers } from "redux";

// import counterReducer from "./counter";
import sensorDataReducer from "./sensor";

export default combineReducers({ sensorData: sensorDataReducer });

