import React from "react";
import {Switch, Route} from "react-router-dom";

import NavBar from "./components/navbar/navbar.component";
import Home from "./components/home/home.component";

const App = () => {
  return (
    <div className="container">
      <NavBar />
      <Switch>
        <Route exact="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
};
export default App;
