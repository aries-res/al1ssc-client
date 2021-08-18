import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

import "./Header.less";
import { getData } from "./apiUtils";

const { SubMenu } = Menu;

export default function Header({ isMobile }) {
  const isCollapsedMenu = isMobile; // TODO: Make it a state that also depends on width occupied by menu
  const [isCollapsedMenuOpen, setIsCollapsedMenuOpen] = useState(undefined);

  const { isLoading, error, data } = useQuery(
    "header",
    getData({ apiRoute: "/header" })
  );
  if (isLoading) return null;
  if (error) {
    console.log(error);
    return null;
  }

  return (
    <header className="header-wrapper">
      <div className="header">
        <Link to="/" className="header-logo">
          <img src={data.logo.url} alt="Aditya-L1 Science Support Cell Logo" />
        </Link>
        {isCollapsedMenu && (
          <div
            className={`header-hamburger-btn${
              isCollapsedMenuOpen ? " collapsed-menu-open" : ""
            }`}
            onClick={() => {
              setIsCollapsedMenuOpen(!isCollapsedMenuOpen);
            }}
          >
            <em />
            <em />
            <em />
          </div>
        )}
        <Menu
          mode={isCollapsedMenu ? "inline" : "horizontal"}
          theme="dark"
          inlineIndent={32}
          className={`header-menu${isCollapsedMenu ? " collapsed-menu" : ""}${
            isCollapsedMenuOpen ? " collapsed-menu-open" : ""
          }`}
        >
          {data.menu.map((menuItem) =>
            menuItem.__component === "general.submenu" ? (
              <SubMenu title={menuItem.title} key={menuItem.id}>
                {menuItem.pages.map((item) => (
                  <Menu.Item key={toKey(item.url)}>
                    <Link to={item.url}>{item.title}</Link>
                  </Menu.Item>
                ))}
              </SubMenu>
            ) : (
              <Menu.Item key={toKey(menuItem.page.url)}>
                <Link to={menuItem.page.url}>{menuItem.page.title}</Link>
              </Menu.Item>
            )
          )}
        </Menu>
      </div>
    </header>
  );
}

const toKey = (path) => path.replace("/", "");
