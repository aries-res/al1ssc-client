import React from "react";
import OverPack from "rc-scroll-anim/lib/ScrollOverPack";
import QueueAnim from "rc-queue-anim";
import { Row, Col, Button } from "antd";
import { useQuery } from "react-query";

import { getData, collectionAPIRoutes } from "../apiUtils";
import Loading from "../components/Loading";
import Error from "../components/Error";

function Feature7(props) {
  const { dataSource, isMobile, ...tagProps } = props;
  const newsPostsQuery = useQuery(
    "homepage-news-posts",
    getData(
      collectionAPIRoutes["news_posts"] + `&_limit=${dataSource.numOfPosts}`
    )
  );
  if (newsPostsQuery.isLoading) return <Loading />;
  if (newsPostsQuery.error)
    return <Error response={newsPostsQuery.error.response} />;
  return (
    <div {...tagProps} className="home-page-wrapper feature7-wrapper">
      <div className="home-page feature7">
        <div className="feature7-title-wrapper">
          <h1 className="feature7-title-h1">{dataSource.title}</h1>
        </div>
        <OverPack playScale={0.3}>
          <QueueAnim
            key="queue"
            type="bottom"
            leaveReverse
            interval={50}
            component={Row}
            className="feature7-block-wrapper"
            gutter={24}
          >
            {newsPostsQuery.data.map((item, i) => (
              <Col md={8} xs={24} className="feature7-block" key={i.toString()}>
                <a href="#" className="feature7-block-group">
                  <div className="feature7-block-image">
                    <img
                      src="https://gw.alipayobjects.com/zos/basement_prod/e339fc34-b022-4cde-9607-675ca9e05231.svg"
                      alt="img"
                    />
                  </div>
                  <h1 class="feature7-block-title">{item.date}</h1>
                  <div
                    class="feature7-block-content"
                    dangerouslySetInnerHTML={{ __html: item.post }}
                  ></div>
                </a>
              </Col>
            ))}
          </QueueAnim>
        </OverPack>
        <div class="feature7-btn-wrapper">
          <Button className="feature7-btn" href={dataSource.allPostsLink.url}>
            View More
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Feature7;
