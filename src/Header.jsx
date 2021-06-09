import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

export default function Header({ dataSource, isMobile }) {
  const isCollapsedMenu = isMobile; // TODO: Make it a state that also depends on width occupied by menu
  const [isCollapsedMenuOpen, setIsCollapsedMenuOpen] = useState(undefined);

  return (
    <header className="header-wrapper">
      <div className="header">
        <Link to="/" className="header-logo">
          <img
            src={dataSource.logo}
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
          {dataSource.menu.map((menuItem) =>
            menuItem.submenu ? (
              <SubMenu title={menuItem.title} key={escapeText(menuItem.title)}>
                {menuItem.submenu.map((item) => (
                  <Menu.Item key={escapeText(item.title)}>
                    <Link to="/about">{item.title}</Link>
                  </Menu.Item>
                ))}
              </SubMenu>
            ) : (
              <Menu.Item key={escapeText(menuItem.title)}>
                {menuItem.title}
              </Menu.Item>
            )
          )}
        </Menu>
      </div>
    </header>
  );
}

const escapeText = (text) => text.toLowerCase().replace(/[^\w]+/g, "-");
