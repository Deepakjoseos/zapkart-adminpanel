import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Country from "./Country";
import District from "./District";
import City from "./City";
import Pincode from "./Pincode";
import State from "./State";

const Locality = ({ match }) => {
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/locality`} />
      <Route path={`${match.url}/country`} component={Country} />
      <Route path={`${match.url}/state`} component={State} />
      <Route path={`${match.url}/district`} component={District} />
      <Route path={`${match.url}/city`} component={City} />
      <Route path={`${match.url}/pincode`} component={Pincode} />
    </Switch>
  );
};

export default Locality;
