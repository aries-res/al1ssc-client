import React, { useState, useEffect } from "react";
import { enquireScreen } from "enquire-js";
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
      <Home isMobile={isMobile}></Home>
    </div>
  );
}

export default App;
