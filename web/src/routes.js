import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import About from "./pages/About";
import Categories from "./pages/Categories";
import RegisterClient from "./pages/RegisterClient";
import RegisterDev from "./pages/RegisterDev";

export const Routes = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/products" component={Products} />
      <Route exact path="/about" component={About} />
      <Route exact path="/categories" component={Categories} />
      <Route exact path="/register-client" component={RegisterClient} />
      <Route exact path="/register-dev" component={RegisterDev} />
    </BrowserRouter>
  );
};

export default Routes;
