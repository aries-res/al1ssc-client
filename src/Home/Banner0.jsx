import React from "react";
import { Button, Popover } from "antd";
import { DownOutlined } from "@ant-design/icons";
import QueueAnim from "rc-queue-anim";
import TweenOne from "rc-tween-one";
import { isImg } from "./utils";

const imgCaption = `Credits: Miloslav Druckmüller, Peter Aniol, Shadia Habbal, Pavel Štarha, Judd Johnson, Jana Hoderová.
This color composite eclipse image is taken on 2017 August, 21. It is a composite of 311 images calibrated with dark and flat-fields taken at Mitchell and Whiskey mountain. In the image the continuum is depicted in gray color, Fe XI (789.2 nm) is shown in red, Fe XIV (530.3 nm) in green and Fe XIII (1074.7 nm) in blue color. It should be noted that VELC of Aditya-L1 will observe the inner solar corona in all these wavelengths using imaging and spectroscopy.`;

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
            <p style={{ maxWidth: "500px", fontSize: "0.9em" }}>{imgCaption}</p>
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
          <div className="banner0-byline">
            A joint effort of
            <br />
            <img src="isro_logo.png" alt="isro_logo" />
            &nbsp;&nbsp;&nbsp;
            <img src="aries_logo.png" alt="aries_logo" className="aries" />
          </div>
          <div key="title" {...dataSource.title}>
            {typeof dataSource.title.children === "string" &&
            dataSource.title.children.match(isImg) ? (
              <img src={dataSource.title.children} width="100%" alt="img" />
            ) : (
              dataSource.title.children
            )}
          </div>
          {/* <div key="content" {...dataSource.content}>
            {dataSource.content.children}
          </div> */}
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
