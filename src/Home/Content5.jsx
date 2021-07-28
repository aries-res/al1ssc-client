import React from "react";
import { Row, Col } from "antd";
import { TweenOneGroup } from "rc-tween-one";
import OverPack from "rc-scroll-anim/lib/ScrollOverPack";
import { Link } from "react-router-dom";

class Content5 extends React.PureComponent {
  render() {
    const { ...props } = this.props;
    const { dataSource } = props;
    delete props.dataSource;
    delete props.isMobile;
    return (
      <div {...props} className="home-page-wrapper content5-wrapper">
        <div className="home-page content5">
          <div key="title" className="title-wrapper">
            <h1 class="title-h1">{dataSource.title}</h1>
            <div class="title-content">{dataSource.description}</div>
          </div>
          <OverPack
            className={`content-template ${props.className}`}
            playScale={0.3}
          >
            <TweenOneGroup
              component={Row}
              key="ul"
              enter={{
                y: "+=30",
                opacity: 0,
                type: "from",
                ease: "easeInOutQuad",
              }}
              leave={{ y: "+=30", opacity: 0, ease: "easeInOutQuad" }}
              className="content5-img-wrapper"
              gutter={16}
            >
              {dataSource.resourcesList.map((item, i) => (
                <Col key={`block${i}`} className="block" md={8} xs={24}>
                  <Link
                    to={item.pageLink.url}
                    className="content5-block-content"
                  >
                    <span>
                      <img src={item.image.url} height="100%" alt="img" />
                    </span>
                    <p>{item.name}</p>
                  </Link>
                </Col>
              ))}
            </TweenOneGroup>
          </OverPack>
        </div>
      </div>
    );
  }
}

export default Content5;
