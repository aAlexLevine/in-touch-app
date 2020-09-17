import React from 'react';
import { Nav, NavbarBrand, NavItem, NavLink } from 'shards-react';
import './navigationBar.css'

const NavigationBar = () => {
  return (
    <div className="navigationBar-container">
      <Nav className="navigationBar-custom">
        <NavbarBrand>In Touch</NavbarBrand>
        <NavItem>
          <NavLink active href="#">
            Active
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">Link</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">Another Link</NavLink>
        </NavItem>
        <NavItem>
          <NavLink disabled href="#">
            Disabled Link
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  );
};

export default NavigationBar;
