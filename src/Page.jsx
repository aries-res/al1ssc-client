import React from "react";
import { Breadcrumb, Menu, Empty } from "antd";
import { Link } from "react-router-dom";

export default function Page({ data, urlTitleMap, resources }) {
  return (
    <div className="home-page-wrapper">
      <div className="home-page" style={{ paddingTop: "32px" }}>
        <PageBreadcrumbs data={data} urlTitleMap={urlTitleMap} />
        <PageContent data={data.content} />
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

function PageContent({ data }) {
  if (data.length > 0)
    return data.map((contentItem) => {
      if (contentItem.__component === "general.rich-text") {
        return <div dangerouslySetInnerHTML={{ __html: contentItem.body }} />;
      } else if (contentItem.__component === "general.entire-collection") {
        return (
          <EntireCollection
            apiRoute={contentItem.collectionType.replace("_", "-")}
          />
        );
      } else if (contentItem.__component === "general.app") {
        return <AnalysisApp slug={contentItem.app.slug} />;
      } else return null; // any other component added to CMS but client doesn't yet know how to render it
    });
  else
    return (
      <Empty description="No content! This page is under construction, please check back later." />
    );
}

function EntireCollection({ apiRoute }) {
  return null;
}

function AnalysisApp({ slug }) {
  return null;
}
