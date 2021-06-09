import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { HeaderDataSource } from "./data";
import "./Header.less";

const { SubMenu } = Menu;

export default function Header({ isMobile }) {
  const isCollapsedMenu = isMobile; // TODO: Make it a state that also depends on width occupied by menu
  const [isCollapsedMenuOpen, setIsCollapsedMenuOpen] = useState(undefined);

  return (
    <header className="header-wrapper">
      <div className="header">
        <Link to="/" className="header-logo">
          <img
            src={HeaderDataSource.logo}
            alt="Aditya-L1 Science Support Cell Logo"
          />
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
          {HeaderDataSource.menu.map((menuItem) =>
            menuItem.children ? (
              <SubMenu title={menuItem.pageName} key={toKey(menuItem.path)}>
                {menuItem.children.map((item) => (
                  <Menu.Item key={toKey(item.path)}>
                    <Link to={menuItem.path + item.path}>{item.pageName}</Link>
                  </Menu.Item>
                ))}
              </SubMenu>
            ) : (
              <Menu.Item key={toKey(menuItem.path)}>
                <Link to={menuItem.path}>{menuItem.pageName}</Link>
              </Menu.Item>
            )
          )}
        </Menu>
      </div>
    </header>
  );
}

const toKey = (path) => path.replace("/", "");
