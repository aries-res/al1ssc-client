import React, { useState, useEffect } from "react";
import { enquireScreen } from "enquire-js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import { Result, Spin } from "antd";

import "./App.less"; // TOFIX: Remove it & better way to import antd.less?
import Home from "./Home";
import Page from "./Page";
import Header from "./Header";
import { pageRoutes, combinedRoutes } from "./data";

function App({ resources }) {
  // Initial value doesn't actually matter since it will be overridden by useEffect
  const [isMobile, setIsMobile] = useState(false);

  // Adapt to mobile phone screen;
  useEffect(() => {
    enquireScreen((b) => {
      setIsMobile(!!b); //match: b is true, unmatch: b is undefined hence !!b = false
    });
  });

  // Get all the pages to create Routes in App's Switch - we need this data
  // in the very beginning so that user can directly visit a particular page
  // (e.g. /xyz) other than the homepage (i.e. /)
  const pagesQuery = useQuery("generic-pages", async () => {
    const { data } = await axios.get(resources.cmsBaseUrl + "/generic-pages");
    return data;
  });

  if (pagesQuery.isLoading) return <Spin size="large" />;
  if (pagesQuery.error) {
    return <Result status="warning" title="Error in fetching data!" />;
  }

  const urlTitleMap = pagesQuery.data.reduce((map, { title, url }) => {
    map[url] = title;
    return map;
  }, {});

  return (
    <div className="AL1SSC">
      <Router>
        <Header isMobile={isMobile} resources={resources} />

        <Switch>
          <Route path="/" exact>
            <Home isMobile={isMobile} resources={resources} />
          </Route>

          {pagesQuery.data.map((pageData) => (
            <Route path={pageData.url}>
              <Page
                data={pageData}
                urlTitleMap={urlTitleMap}
                resources={resources}
              />
            </Route>
          ))}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
