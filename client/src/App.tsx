import React from "react";

import StatisticsView from "./views/StatisticsView";
import ActionsView from "./views/ActionsView";
import CountdownView from "./views/CountdownView";
import ControlView from "./views/ControlView";

import "./App.css";
import config from "./config.json";

import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import getColor from "./lib/getColor";
import { useSelector } from "react-redux";
import { CaelusState } from "./store/reducers";
import StageView from "./views/StageView";
import StatusView from "./views/StatusView";

function NavbarItem({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "block",
        marginLeft: "1rem",
        marginRight: "1rem",
        marginTop: "0.5rem",
        marginBottom: "0.5rem",
      }}
    >
      {children}
    </div>
  );
}

const App = () => {

  const data = useSelector((state: CaelusState) => ({
    heartbeatStatus: state.data.general.heartbeat_status,
    mode: state.data.general.mode,
  }));

  return (
    <div className="App font-sans bg-light-1 text-dark-1">
      <BrowserRouter>
      <div
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <NavbarItem>
          <b style={{ fontSize: "1.5rem" }}>Ground Software</b>
        </NavbarItem>

      <select style={{fontSize: "1rem"}}>
        <option>{config.test_type.Nitrous}</option>
        <option>{config.test_type.Ethanol}</option>
        <option>{config.test_type.Full}</option>
      </select>


        <NavbarItem>
          <Link to="/statistics">Statistics</Link>
        </NavbarItem>

        <NavbarItem>
          <Link to="/actions">Actions</Link>
        </NavbarItem>
        |
        <NavbarItem>
          <Link to="/stage">Stage</Link>
        </NavbarItem>

        <NavbarItem>
          <Link to="/control">Control</Link>
        </NavbarItem>

        <NavbarItem>
          <Link to="/status">Status</Link>
        </NavbarItem>

        <NavbarItem>
          <Link to="/countdown">Countdown</Link>
        </NavbarItem>

        <NavbarItem>
          <p style={{ color: getColor(data.heartbeatStatus), }}>
              <span className="font-bold">{"Heartbeat"}</span>
          </p>
        </NavbarItem>
        
        <NavbarItem>
          <p style={{ color: getColor(data.mode) }}>
              <span className="font-bold">{"Mode: "}</span>
              <span className="font-bold">{data.mode}</span> 
          </p>
        </NavbarItem>

      </div>
        <Switch>
          <Route path="/actions" exact>
            <ActionsView /> 
          </Route>
          <Route path="/statistics" exact>
            <StatisticsView /> 
          </Route>
          <Route path="/countdown" exact>
            <CountdownView />
          </Route>
          <Route path="/control" exact>
            <ControlView />
          </Route>
          <Route path="/stage" exact>
            <StageView />
          </Route>
          <Route path="/control" exact>
            <ControlView />
          </Route>
          <Route path="/status" exact>
            <StatusView />
          </Route>
        </Switch>
      </BrowserRouter>

    </div>
  );
};

export default App;
