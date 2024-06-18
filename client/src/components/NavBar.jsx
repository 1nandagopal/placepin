import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <Link to="/">
        <h1>PlacePin</h1>
      </Link>
      <div>
        <Link to="new">
          <Button>New Place</Button>
        </Link>
        <Link to="/myplaces">
          <Button>My Places</Button>
        </Link>
        <Button>Log Out</Button>
        <Link to="/auth">
          <Button>Log In</Button>
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
