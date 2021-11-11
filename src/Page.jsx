import React from "react";
import { Breadcrumb, Menu, Empty, List, Collapse } from "antd";
import { Link } from "react-router-dom";
import parse, { attributesToProps } from "html-react-parser";
import { useQuery } from "react-query";
import { CalendarOutlined } from "@ant-design/icons";

import "./Page.less";
import AnalysisTool from "./AnalysisTools";
import { getData, collectionsApiRequests } from "./apiUtils";
import Loading from "./components/Loading";
import Error from "./components/Error";

export default function Page({ data, urlTitleMap, isMobile }) {
  return (
    <div className="home-page-wrapper">
      <div className="home-page" style={{ paddingTop: "32px" }}>
        <PageBreadcrumbs data={data} urlTitleMap={urlTitleMap} />
        <PageContent data={data.content} isMobile={isMobile} />
      </div>
    </div>
  );
}

function PageBreadcrumbs({ data, urlTitleMap }) {
  const initialBreadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">Home</Link>
    </Breadcrumb.Item>,
  ];

  if (data.submenuParent) {
    const menu = (
      <Menu>
        {data.submenuParent.pages.map((menuItem) => (
          <Menu.Item key={menuItem.url}>
            <Link to={menuItem.url}>{menuItem.title}</Link>
          </Menu.Item>
        ))}
      </Menu>
    );
    initialBreadcrumbItems.push(
      <Breadcrumb.Item overlay={menu}>
        {data.submenuParent.title}
      </Breadcrumb.Item>
    );
  }

  const urlSnippets = data.url.split("/").filter((i) => i);
  const nextBreadcrumbItems = urlSnippets.map((_, i) => {
    const url = `/${urlSnippets.slice(0, i + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        {i === urlSnippets.length - 1 ? (
          urlTitleMap[url]
        ) : (
          <Link to={url}>{urlTitleMap[url]}</Link>
        )}
      </Breadcrumb.Item>
    );
  });

  return (
    <Breadcrumb style={{ marginBottom: "32px" }}>
      {[...initialBreadcrumbItems, ...nextBreadcrumbItems]}
    </Breadcrumb>
  );
}

function PageContent({ data, isMobile }) {
  if (data.length > 0)
    return data.map((contentItem) => {
      if (contentItem.__component === "general.rich-text") {
        const options = {
          replace: (domNode) => {
            // TODO: Change figure atribs, make card, align caption, img responsivity & scale
            if (domNode.attribs && domNode.name === "img") {
              const props = attributesToProps(domNode.attribs);
              props.width = "100%";
              return <img {...props} />;
            }
          },
        };
        return (
          <div className="rich-text">{parse(contentItem.body, options)}</div>
        );
      } else if (contentItem.__component === "general.entire-collection") {
        return <EntireCollection collectionType={contentItem.collectionType} />;
      } else if (contentItem.__component === "general.analysis-tool") {
        return (
          <AnalysisTool toolName={contentItem.toolName} isMobile={isMobile} />
        );
      } else return null; // any other component added to CMS but client doesn't yet know how to render it
    });
  else
    return (
      <Empty description="No content! This page is under construction, please check back later." />
    );
}

function EntireCollection({ collectionType }) {
  const newsPostsQuery = useQuery(
    "news-posts",
    getData(collectionsApiRequests[collectionType]),
    {
      enabled: collectionType === "news_posts",
    }
  );
  const faqsQuery = useQuery(
    "faqs",
    getData(collectionsApiRequests[collectionType]),
    {
      enabled: collectionType === "faqs",
    }
  );

  if (collectionType === "news_posts") {
    if (newsPostsQuery.isLoading) return <Loading />;
    if (newsPostsQuery.error) return <Error err={newsPostsQuery.error} />;
    return (
      <List
        itemLayout="horizontal"
        dataSource={newsPostsQuery.data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<CalendarOutlined />}
              title={item.date}
              description={<Link to={item.linkOfPost}>{item.headline}</Link>}
            />
          </List.Item>
        )}
      />
    );
  } else if (collectionType === "faqs") {
    if (faqsQuery.isLoading) return <Loading />;
    if (faqsQuery.error) return <Error err={faqsQuery.error} />;
    return (
      <Collapse accordion>
        {faqsQuery.data.map((faq) => (
          <Collapse.Panel header={faq.question} key={faq.serialNumber}>
            {parse(faq.answer)}
          </Collapse.Panel>
        ))}
      </Collapse>
    );
  } else return null;
}
