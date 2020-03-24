import { combineReducers } from "redux";

import counterReducer from "./counter";
import buttonPressed from "./buttonPressed";

export default combineReducers({ counter: counterReducer, buttonPressed: buttonPressed });
