import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../components/components.css";

const Navbar = () => {
  const [view, setView] = useState(false);
  const Dropdown = () => {
    return (
      <ul>
        <li>
          <NavLink exact to="/" activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/diary" activeClassName="active">
            Diary
          </NavLink>
        </li>
      </ul>
    );
  };

  return (
    <nav>
      <div className="dropdown">
        <ul
          onClick={() => {
            setView(!view);
          }}
        >
          반가워요, nickname 님! {view ? "⌃" : "⌄"}
          {view && <Dropdown />}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
