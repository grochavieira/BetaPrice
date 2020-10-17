import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Home from "./pages/Home";
import Requests from "./pages/Requests";
import About from "./pages/About";
import Categories from "./pages/Categories";
import RegisterClient from "./pages/RegisterClient";
import RegisterDev from "./pages/RegisterDev";
import Landing from "./pages/Landing";

export const Routes = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Landing} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/requests" component={Requests} />
      <Route exact path="/about" component={About} />
      <Route exact path="/categories" component={Categories} />
      <Route exact path="/register-client" component={RegisterClient} />
      <Route exact path="/register-dev" component={RegisterDev} />
    </BrowserRouter>
  );
};

export default Routes;
