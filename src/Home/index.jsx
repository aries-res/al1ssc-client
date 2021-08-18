/* eslint no-undef: 0 */
/* eslint arrow-parens: 0 */
import React from "react";
import { useQuery } from "react-query";

import Banner from "./Banner0";
import Resources from "./Content5";
import Objectives from "./Content3";
import About from "./Feature2";
import News from "./Feature7";
import Footer1 from "./Footer1";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { getData } from "../apiUtils";
import { Footer10DataSource } from "./data.source";
import "./less/antMotionStyle.less";

export default function Home({ isMobile }) {
  const { isLoading, error, data } = useQuery(
    "homepage",
    getData({ apiRoute: "/homepage" })
  );

  if (isLoading) return <Loading />;
  if (error) return <Error response={error.response} />;

  const children = [
    <Banner
      id="banner"
      key="home-banner"
      dataSource={data.banner}
      isMobile={isMobile}
    />,
    <About
      id="about"
      key="home-about"
      dataSource={data.about}
      isMobile={isMobile}
    />,
    <Objectives
      id="objectives"
      key="home-objectives"
      dataSource={data.objectives}
      isMobile={isMobile}
    />,
    <News
      id="news"
      key="home-news"
      dataSource={data.news}
      isMobile={isMobile}
    />,
    <Resources
      id="resources"
      key="home-resources"
      dataSource={data.resources}
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
