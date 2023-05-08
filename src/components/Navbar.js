import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../components/components.css";

const Navbar = () => {
  const [view, setView] = useState(false);

  const Dropdown = () => {
    return (
      <ul>
        <li>
          <NavLink exact="true" to="/" activeclassname="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/diary" activeclassname="active">
            Diary
          </NavLink>
        </li>
      </ul>
    );
  };

  return (
    <nav>
      <div className="dropdown">
        <button
          className="navBtn"
          onClick={() => {
            setView(!view);
          }}
        >
          프로필 nickname 님!
          {view && <Dropdown />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
