import React, { useState, useEffect } from "react";
import { enquireScreen } from "enquire-js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "./App.less"; // TOFIX: Remove it & better way to import antd.less?
import Home from "./Home";
import Page from "./Page";
import Header from "./Header";
import { pageRoutes, combinedRoutes } from "./data";

function App() {
  // Initial value doesn't actually matter since it will be overridden by useEffect
  const [isMobile, setIsMobile] = useState(false);

  // Adapt to mobile phone screen;
  useEffect(() => {
    enquireScreen((b) => {
      setIsMobile(!!b); //match: b is true, unmatch: b is undefined hence !!b = false
    });
  });

  return (
    <div className="AL1SSC">
      <Router basename={process.env.PUBLIC_URL}>
        <Header isMobile={isMobile} />

        <Switch>
          <Route path={pageRoutes[0].path} exact>
            <Home isMobile={isMobile} />
          </Route>
          {combinedRoutes.map((pageRoute) =>
            pageRoute.redirectsTo ? (
              <Redirect
                exact
                from={pageRoute.path}
                to={pageRoute.redirectsTo}
              />
            ) : (
              <Route path={pageRoute.path}>
                <Page path={pageRoute.path} />
              </Route>
            )
          )}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
