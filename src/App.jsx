import React from "react";
import { Switch, Route } from "react-router-dom";

import NavBar from "./components/navbar/navbar.component";
import Home from "./components/home/home.component";
import Form from "./components/form/form.component";

const App = () => {
  return (
    <div className="container">
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/pizza">
          <Form />
        </Route>
      </Switch>
    </div>
  );
};
export default App;
