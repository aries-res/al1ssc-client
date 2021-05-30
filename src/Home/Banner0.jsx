import React from "react";
import { Button, Popover } from "antd";
import { DownOutlined } from "@ant-design/icons";
import QueueAnim from "rc-queue-anim";
import TweenOne from "rc-tween-one";
import { isImg } from "./utils";
import marked from "marked";

class Banner extends React.PureComponent {
  render() {
    const { ...currentProps } = this.props;
    const { dataSource } = currentProps;
    delete currentProps.dataSource;
    delete currentProps.isMobile;
    return (
      <div {...currentProps} {...dataSource.wrapper}>
        <Popover
          className="img-description"
          placement="topRight"
          content={
            <p
              className={dataSource.imgCaption.className}
              dangerouslySetInnerHTML={{
                __html: marked(dataSource.imgCaption.children),
              }}
            ></p>
          }
          trigger="click"
        >
          <Button type="link">What's in this image?</Button>
        </Popover>

        <QueueAnim
          key="QueueAnim"
          type={["bottom", "top"]}
          delay={200}
          {...dataSource.textWrapper}
        >
          {/* TODO: Move logos to bottom left */}
          {/* <div className="banner0-byline">
            A joint effort of
            <br />
            <img src="isro_logo.png" alt="isro_logo" />
            &nbsp;&nbsp;&nbsp;
            <img src="aries_logo.png" alt="aries_logo" className="aries" />
          </div> */}
          <div
            className={dataSource.title.className}
            dangerouslySetInnerHTML={{
              __html: marked(dataSource.title.children),
            }}
          ></div>
          <div key="content" {...dataSource.content}>
            {dataSource.content.children}
          </div>
          <Button ghost key="button" {...dataSource.button}>
            {dataSource.button.children}
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
