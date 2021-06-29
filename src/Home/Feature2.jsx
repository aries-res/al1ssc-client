import React from "react";
import QueueAnim from "rc-queue-anim";
import TweenOne from "rc-tween-one";
import { Row, Col, Carousel, Card } from "antd";
import OverPack from "rc-scroll-anim/lib/ScrollOverPack";

function Content2(props) {
  const { ...tagProps } = props;
  const { dataSource, isMobile, resources } = tagProps;
  delete tagProps.dataSource;
  delete tagProps.isMobile;
  delete tagProps.resources;
  const animType = {
    queue: isMobile ? "bottom" : "left",
    one: isMobile
      ? {
          scaleY: "+=0.3",
          opacity: 0,
          type: "from",
          ease: "easeOutQuad",
        }
      : {
          x: "+=30",
          opacity: 0,
          type: "from",
          ease: "easeOutQuad",
        },
  };
  const img = (
    <TweenOne
      key="img"
      animation={animType.one}
      resetStyle
      className="content2-img"
      component={Col}
      componentProps={{
        md: 12,
        xs: 24,
      }}
    >
      <Card bordered className="card">
        <Carousel autoplay className="content2-img-inner">
          {dataSource.carousel.map((child) => (
            <div className="captioned-img">
              <img
                src={resources.cmsBaseUrl + child.image.formats.small.url}
                width="100%"
                alt="img"
              />
              <p
                className="caption"
                dangerouslySetInnerHTML={{ __html: child.caption }}
              ></p>
            </div>
          ))}
        </Carousel>
      </Card>
    </TweenOne>
  );
  return (
    <div {...tagProps} className="home-page-wrapper content2-wrapper">
      <OverPack className="home-page content2" playScale={0.3} component={Row}>
        {/* {isMobile && img} */}
        <QueueAnim
          type={animType.queue}
          key="text"
          leaveReverse
          ease={["easeOutCubic", "easeInCubic"]}
          className="content2-text"
          component={Col}
          componentProps={{
            md: 12,
            xs: 24,
          }}
        >
          <h2 key="h1" className="content2-title">
            {dataSource.title}
          </h2>
          <section
            className="content2-content"
            dangerouslySetInnerHTML={{ __html: dataSource.description }}
          ></section>
        </QueueAnim>
        {/* {!isMobile && img} */}
        {img}
      </OverPack>
    </div>
  );
}

export default Content2;
