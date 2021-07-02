/* eslint no-undef: 0 */
/* eslint arrow-parens: 0 */
import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Result, Spin } from "antd";

// import Nav0 from "./Nav0";
import Banner0 from "./Banner0";
import Content0 from "./Content0";
import Content5 from "./Content5";
import Content3 from "./Content3";
import About from "./Feature2";
import Feature7 from "./Feature7";
import Footer1 from "./Footer1";

import {
  // Nav00DataSource,
  Banner01DataSource,
  Content00DataSource,
  Content50DataSource,
  Content30DataSource,
  Feature20DataSource,
  Feature70DataSource,
  Footer10DataSource,
} from "./data.source";
import "./less/antMotionStyle.less";
import { getData } from "../apiUtils";

export default function Home({ isMobile }) {
  const { isLoading, error, data } = useQuery("homepage", getData("/homepage"));
  if (isLoading) return <Spin size="large" />;
  if (error) {
    console.log(error);
    return <Result status="warning" title="Error in fetching data!" />;
  }
  const children = [
    <Banner0
      id="Banner0_1"
      key="Banner0_1"
      dataSource={Banner01DataSource}
      isMobile={isMobile}
    />,
    // <Content0
    //   id="Content0_0"
    //   key="Content0_0"
    //   dataSource={Content00DataSource}
    //   isMobile={isMobile}
    // />,
    <About
      id="about"
      key="home-about"
      dataSource={data.about}
      isMobile={isMobile}
    />,
    <Content3
      id="Content3_0"
      key="Content3_0"
      dataSource={Content30DataSource}
      isMobile={isMobile}
    />,
    <Feature7
      id="Feature7_0"
      key="Feature7_0"
      dataSource={Feature70DataSource}
      isMobile={isMobile}
    />,
    <Content5
      id="Content5_0"
      key="Content5_0"
      dataSource={Content50DataSource}
      isMobile={isMobile}
    />,
    <Footer1
      id="Footer1_0"
      key="Footer1_0"
      dataSource={Footer10DataSource}
      isMobile={isMobile}
    />,
  ];
  return <div className="templates-wrapper">{children}</div>;
}
