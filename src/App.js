import React, { useState, useEffect } from "react";
import { enquireScreen } from "enquire-js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Breadcrumb } from "antd";

import "./App.less"; // TOFIX: Remove it & better way to import antd.less?
import Home from "./Home";
import Nav0 from "./Home/Nav0"; // TODO: move Nav0 out of Home/
import { Nav00DataSource } from "./Home/data.source"; // TODO: Move Data of Nav0 out too
import "./Home/less/antMotionStyle.less"; // TODO: Move out nav0.less, import it separately

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
      <Nav0
        id="Nav0_0"
        key="Nav0_0"
        dataSource={Nav00DataSource}
        isMobile={isMobile}
      />
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home isMobile={isMobile} />
          </Route>
          <Route path="/about">
            <Page
              title="About Aditya-L1"
              trail={[
                { name: "Mission", link: "" },
                { name: "About", link: "about" },
              ]}
            />
          </Route>
          <Route path="/instruments">
            <Page
              title="Aditya-L1 Instruments"
              trail={[
                { name: "Mission", link: "" },
                { name: "Instruments", link: "instruments" },
              ]}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

function Page({ title, trail }) {
  return (
    <div className="home-page-wrapper">
      <div className="home-page" style={{ paddingTop: "32px" }}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <a href="/">Home</a>
          </Breadcrumb.Item>
          {trail.map((item) => (
            <Breadcrumb.Item>
              {item.link === "" ? (
                item.name
              ) : (
                <a href={item.link}>{item.name}</a>
              )}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
        <h1 style={{ marginTop: "32px" }}>{title}</h1>
        <p style={{ marginBottom: "24px" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Velit
          aliquet sagittis id consectetur. At augue eget arcu dictum varius.
          Magna ac placerat vestibulum lectus mauris ultrices. Netus et
          malesuada fames ac turpis egestas maecenas pharetra. Adipiscing
          tristique risus nec feugiat in. Mauris nunc congue nisi vitae suscipit
          tellus mauris a. Pulvinar pellentesque habitant morbi tristique
          senectus et. Hac habitasse platea dictumst vestibulum rhoncus est
          pellentesque. Odio pellentesque diam volutpat commodo sed. Viverra
          suspendisse potenti nullam ac tortor vitae purus faucibus ornare. Vel
          turpis nunc eget lorem dolor. Malesuada nunc vel risus commodo viverra
          maecenas. Amet tellus cras adipiscing enim. Eu facilisis sed odio
          morbi quis commodo odio aenean sed.
        </p>
        <p>
          Vel pharetra vel turpis nunc eget lorem dolor sed. Viverra tellus in
          hac habitasse platea. Aenean vel elit scelerisque mauris. Auctor augue
          mauris augue neque gravida in fermentum et sollicitudin. Duis at
          consectetur lorem donec massa sapien faucibus et. Non enim praesent
          elementum facilisis leo vel fringilla. Habitant morbi tristique
          senectus et netus et. Nullam vehicula ipsum a arcu cursus vitae congue
          mauris. Adipiscing commodo elit at imperdiet dui accumsan sit. Nisi
          vitae suscipit tellus mauris a. Vitae nunc sed velit dignissim sodales
          ut eu. Quam viverra orci sagittis eu volutpat odio. Amet dictum sit
          amet justo. Aliquet nibh praesent tristique magna sit amet purus
          gravida quis. Tellus molestie nunc non blandit massa. Diam phasellus
          vestibulum lorem sed risus ultricies tristique nulla. Aliquam
          vestibulum morbi blandit cursus risus at ultrices mi.
        </p>
      </div>
    </div>
  );
}

export default App;
