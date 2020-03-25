import { combineReducers } from "redux";

import buttonPressed from "./buttonPressed";
import dataReducer from "./reducer";

export default combineReducers({ data: dataReducer, buttonPressed: buttonPressed });
