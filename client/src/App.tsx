import React from "react";

import StatisticsView from "./views/StatisticsView";
import ActionsView from "./views/ActionsView";
import CountdownView from "./views/CountdownView";

import "./App.css";
import Logo from "./images/logo.png";

import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

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

function Navbar() {
  return (
    <div
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <NavbarItem>
        <b style={{ fontSize: "1.5rem" }}>Ground Software</b>
      </NavbarItem>
      <NavbarItem>
        <Link to="/">Dashboard</Link>
      </NavbarItem>
      <NavbarItem>
        <Link to="/actions">Actions</Link>
      </NavbarItem>
      <NavbarItem>
        <Link to="/countdown">Countdown</Link>
      </NavbarItem>
    </div>
  );
}

const App = () => {
  return (
    <div className="App font-sans bg-light-1 text-dark-1">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/actions" exact>
            <ActionsView />
          </Route>
          <Route path="/countdown" exact>
            <CountdownView />
          </Route>
          <Route path="/" exact>
            <StatisticsView />
          </Route>
        </Switch>
      </BrowserRouter>
      <img src={Logo} id="logo" alt="Logo" />
    </div>
  );
};

export default App;
