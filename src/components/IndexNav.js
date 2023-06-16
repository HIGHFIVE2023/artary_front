import React from "react";
import { NavLink } from "react-router-dom";

function IndexNav() {
  return (
    <ul>
      <div className="indexContainer01">
        <li className="Index01">
          <NavLink exact to="/diary" activeClassName="selected">
            <img src="../img/pencil.png" height="35px" width="35px" />
          </NavLink>
        </li>
      </div>
      <div className="indexContainer02">
        <li className="Index02">
          <NavLink to="/calenpage" activeClassName="selected">
            <img src="../img/calendar.png" height="35px" width="35px" />
          </NavLink>
        </li>
      </div>
    </ul>
  );
}

export default IndexNav;
