import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Logo from "./images/Logo.png";

class NavigationBar extends Component {
  render() {
    return (
      <div className="NavigationBar">
        <div className="NavigationBar-toolbar">
          <div className="NavigationBar-toolbarItem">
            <NavLink to="/" className="NavigationBar-logo">
              <img src={Logo} alt="logo" />
            </NavLink>
          </div>
          <div className="NavigationBar-toolbarItem">
            <label className="NavigationBar-menuIcon">
              <span>{""}</span>
              <span>{""}</span>
              <span>{""}</span>
            </label>
            <div className="NavigationBar-menuClose">X</div>
          </div>
        </div>
        <input
          className="NavigationBar-checkbox"
          id="NavigationBar-checkbox"
          type="checkbox"
        />
        <ul className="NavigationBar-menu">
          <li className="menu-item">
            <NavLink to="/dota" activeClassName="menuItem--active">
              DOTA
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink to="/csgo" activeClassName="menuItem--active">
              CSGO
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink to="/donate" activeClassName="menuItem--active">
              Donate
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink to="/admin" activeClassName="menuItem--active">
              Admin
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

export default NavigationBar;
