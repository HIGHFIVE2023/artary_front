import React from "react";
import { NavLink } from "react-router-dom";

const Tab = ({ to, label }) => {
  return (
    <NavLink className="nav-link" activeClassName="active" to={to}>
      {label}
    </NavLink>
  );
};

export default Tab;
