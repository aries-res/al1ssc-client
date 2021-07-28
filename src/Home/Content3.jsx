import React from "react";
import QueueAnim from "rc-queue-anim";
import TweenOne from "rc-tween-one";
import { Row, Col } from "antd";
import OverPack from "rc-scroll-anim/lib/ScrollOverPack";

class Content3 extends React.PureComponent {
  getDelay = (e, b) => (e % b) * 100 + Math.floor(e / b) * 100 + b * 100;

  render() {
    const { ...props } = this.props;
    const { dataSource, isMobile } = props;
    delete props.dataSource;
    delete props.isMobile;
    let clearFloatNum = 0;
    const blockProps = {
      md: 12,
      xs: 24,
    };
    const children = dataSource.objectivesList.map((item, i) => {
      const delay = isMobile ? i * 50 : this.getDelay(i, 24 / blockProps.md);
      const liAnim = {
        opacity: 0,
        type: "from",
        ease: "easeOutQuad",
        delay,
      };
      const childrenAnim = { ...liAnim, x: "+=10", delay: delay + 100 };
      clearFloatNum += blockProps.md;
      clearFloatNum = clearFloatNum > 24 ? 0 : clearFloatNum;
      return (
        <TweenOne
          component={Col}
          animation={liAnim}
          key={`block${i}`}
          componentProps={{ md: blockProps.md, xs: blockProps.xs }}
          className={
            !clearFloatNum ? "content3-block clear-both" : "content3-block"
          }
        >
          <TweenOne
            animation={{
              x: "-=10",
              opacity: 0,
              type: "from",
              ease: "easeOutQuad",
            }}
            key="img"
            className="content3-icon"
          >
            <img src={item.icon.url} width="100%" alt="img" />
          </TweenOne>
          <div className="content3-text">
            {/* <TweenOne
              key="h2"
              animation={childrenAnim}
              component="h2"
              className="content3-title"
            >
              block title
            </TweenOne> */}
            <TweenOne
              key="p"
              animation={{ ...childrenAnim, delay: delay + 200 }}
              component="div"
              className="content3-content"
            >
              <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
            </TweenOne>
          </div>
        </TweenOne>
      );
    });
    return (
      <div {...props} className="home-page-wrapper content3-wrapper">
        <div className="home-page content3">
          <div className="title-wrapper">
            <h1 key="title" className="content2-title">
              {dataSource.title}
            </h1>
            <div className="title-content">{dataSource.description}</div>
          </div>
          <OverPack playScale={0.3}>
            <QueueAnim key="u" type="bottom">
              <Row key="row" className="content3-block-wrapper">
                {children}
              </Row>
            </QueueAnim>
          </OverPack>
        </div>
      </div>
    );
  }
}

export default Content3;
