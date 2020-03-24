import { combineReducers } from "redux";

import buttonPressed from "./buttonPressed";
import sensorDataReducer from "./sensor";

export default combineReducers({ sensorData: sensorDataReducer, buttonPressed: buttonPressed });
