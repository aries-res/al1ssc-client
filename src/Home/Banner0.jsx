import React from "react";
import { Button, Popover } from "antd";
import { DownOutlined } from "@ant-design/icons";
import QueueAnim from "rc-queue-anim";
import TweenOne from "rc-tween-one";

class Banner extends React.PureComponent {
  render() {
    const { ...currentProps } = this.props;
    const { dataSource } = currentProps;
    delete currentProps.dataSource;
    delete currentProps.isMobile;
    return (
      <div
        {...currentProps}
        className="banner0"
        style={{ backgroundImage: `url(${dataSource.coverImage.url})` }}
      >
        <Popover
          className="img-description"
          placement="topRight"
          content={
            <p
              className="banner0-caption"
              dangerouslySetInnerHTML={{
                __html: dataSource.imageCaption,
              }}
            ></p>
          }
          trigger="click"
        >
          <Button type="link">What's in this image?</Button>
        </Popover>
        <div className="institute-logos">
          <img src="isro_logo.png" width="65px" alt="isro_logo" />
          <img src="aries_logo.png" width="80px" alt="aries_logo" />
        </div>

        <QueueAnim
          key="QueueAnim"
          type={["bottom", "top"]}
          delay={200}
          className="banner0-text-wrapper"
        >
          {/* <div className="banner0-byline">
            A joint effort of
            <br />
            <img src="isro_logo.png" alt="isro_logo" />
            &nbsp;&nbsp;&nbsp;
            <img src="aries_logo.png" alt="aries_logo" className="aries" />
          </div> */}
          <div
            className="banner0-title"
            dangerouslySetInnerHTML={{
              __html: "Aditya-L1 Science<br>Support Cell",
            }}
          ></div>
          <div key="content" className="banner0-content">
            {dataSource.subtitle}
          </div>
          <Button ghost key="button" href="#about" className="banner0-button">
            Learn More
          </Button>
          <Button ghost key="button" href="#about" className="banner0-button">
            Workshop
          </Button>
        </QueueAnim>
        <TweenOne
          animation={{
            y: "-=20",
            yoyo: true,
            repeat: -1,
            duration: 1000,
          }}
          className="banner0-icon"
          key="icon"
        >
          <DownOutlined />
        </TweenOne>
      </div>
    );
  }
}
export default Banner;
