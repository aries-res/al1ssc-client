import React from "react";
import TweenOne from "rc-tween-one";
import OverPack from "rc-scroll-anim/lib/ScrollOverPack";
import QueueAnim from "rc-queue-anim";
import { Row, Col } from "antd";
import { getChildrenToRender } from "./utils";
import { isImg } from "./utils";

class Footer extends React.Component {
  static defaultProps = {
    className: "footer1",
  };

  getHyperlinkedLogo = (logo) => (
    <a href={logo.href} target="_blank" rel="noopener noreferrer">
      <img
        src={logo.children}
        alt={logo.children.split(/\.|\//).reverse()[1]}
      />
    </a>
  );

  // TODO: Make data independent of columns
  getLiChildren = (data) =>
    data.map((item, i) => {
      const { title, childWrapper, ...itemProps } = item;

      const titleContent =
        i === 0 ? (
          <img
            src={title.children}
            width="100%"
            alt="Aditya-L1 Science Support Cell logo"
          />
        ) : (
          title.children
        );

      let childContent;
      if (i === 0) {
        childContent = (
          <>
            <p>{childWrapper.children[0].children}</p>
            <div className="logos-grid">
              {childWrapper.children.slice(1).map(this.getHyperlinkedLogo)}
            </div>
          </>
        );
      } else if (i === 1) {
        childContent = (
          <div className="logos-grid">
            {childWrapper.children.map(this.getHyperlinkedLogo)}
          </div>
        );
      } else {
        childContent = childWrapper.children.map(getChildrenToRender);
      }

      return (
        <Col {...itemProps} title={null} content={null}>
          <h2 {...title}>{titleContent}</h2>
          <div {...childWrapper}>{childContent}</div>
        </Col>
      );
    });

  render() {
    const { ...props } = this.props;
    const { dataSource } = props;
    delete props.dataSource;
    delete props.isMobile;
    const childrenToRender = this.getLiChildren(dataSource.block.children);
    return (
      <div {...props} className="home-page-wrapper footer1-wrapper">
        <OverPack className="footer1" playScale={0.2}>
          <QueueAnim
            type="bottom"
            key="ul"
            leaveReverse
            component={Row}
            className="home-page"
            gutter={0}
          >
            {childrenToRender}
          </QueueAnim>
          {/* Copyright info */}
          <TweenOne
            animation={{ y: "+=30", opacity: 0, type: "from" }}
            key="copyright"
            className="copyright-wrapper"
          >
            <div className="home-page">
              <div className="copyright">{dataSource.copyright.children}</div>
            </div>
          </TweenOne>
        </OverPack>
      </div>
    );
  }
}

export default Footer;
