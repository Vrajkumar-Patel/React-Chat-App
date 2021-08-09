import React from "react";
import "./App.css";
import Chats from "./components/Chats";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <Switch>
        <div className="app">
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/chats/:roomId?">
            <div className="app__left">
              <Sidebar />
            </div>
            <div className="app__right">
              <Chats />
            </div>
          </Route>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
