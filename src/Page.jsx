import React from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { pathPageNameMap } from "./data";

export default function Page({ path }) {
  const pathSnippets = path.split("/").filter((i) => i);
  const extraBreadcrumbItems = pathSnippets.map((_, i) => {
    const url = `/${pathSnippets.slice(0, i + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        {i === pathSnippets.length - 1 ? (
          pathPageNameMap[url]
        ) : (
          <Link to={url}>{pathPageNameMap[url]}</Link>
        )}
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">Home</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);
  return (
    <div className="home-page-wrapper">
      <div className="home-page" style={{ paddingTop: "32px" }}>
        <Breadcrumb>{breadcrumbItems}</Breadcrumb>
        <h1 style={{ marginTop: "32px" }}>{pathPageNameMap[path]}</h1>
        <p style={{ marginBottom: "24px" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Velit
          aliquet sagittis id consectetur. At augue eget arcu dictum varius.
          Magna ac placerat vestibulum lectus mauris ultrices. Netus et
          malesuada fames ac turpis egestas maecenas pharetra. Adipiscing
          tristique risus nec feugiat in. Mauris nunc congue nisi vitae suscipit
          tellus mauris a. Pulvinar pellentesque habitant morbi tristique
          senectus et. Hac habitasse platea dictumst vestibulum rhoncus est
          pellentesque. Odio pellentesque diam volutpat commodo sed. Viverra
          suspendisse potenti nullam ac tortor vitae purus faucibus ornare. Vel
          turpis nunc eget lorem dolor. Malesuada nunc vel risus commodo viverra
          maecenas. Amet tellus cras adipiscing enim. Eu facilisis sed odio
          morbi quis commodo odio aenean sed.
        </p>
        <p>
          Vel pharetra vel turpis nunc eget lorem dolor sed. Viverra tellus in
          hac habitasse platea. Aenean vel elit scelerisque mauris. Auctor augue
          mauris augue neque gravida in fermentum et sollicitudin. Duis at
          consectetur lorem donec massa sapien faucibus et. Non enim praesent
          elementum facilisis leo vel fringilla. Habitant morbi tristique
          senectus et netus et. Nullam vehicula ipsum a arcu cursus vitae congue
          mauris. Adipiscing commodo elit at imperdiet dui accumsan sit. Nisi
          vitae suscipit tellus mauris a. Vitae nunc sed velit dignissim sodales
          ut eu. Quam viverra orci sagittis eu volutpat odio. Amet dictum sit
          amet justo. Aliquet nibh praesent tristique magna sit amet purus
          gravida quis. Tellus molestie nunc non blandit massa. Diam phasellus
          vestibulum lorem sed risus ultricies tristique nulla. Aliquam
          vestibulum morbi blandit cursus risus at ultrices mi.
        </p>
      </div>
    </div>
  );
}
