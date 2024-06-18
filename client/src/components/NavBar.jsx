import React, { useContext } from "react";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { TbLocation } from "react-icons/tb";
import { AuthContext } from "../context/authContext";

function NavBar() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout();
    navigate("/");
  };

  return (
    <nav className="text-white flex items-center justify-between px-1 mb-5">
      <Link to="/" className="group flex items-center">
        <TbLocation className="text-6xl mt-1 mr-1.5 group-hover:text-fuchsia-500 transition-all duration-300" />
        <h1 className="text-4xl font-semibold cursor-pointer bg-gradient-to-r from-blue-400 to-fuchsia-600  bg-white bg-clip-text bg-no-repeat bg-[length:0%] group-hover:bg-[length:100%] group-hover:text-transparent transition-all duration-300">
          PlacePin
        </h1>
      </Link>
      <div className="mt-2 flex items-center space-x-5 text-sm">
        <Link to="new">
          <Button classes="flex items-center">
            <FaPlus className="mt-0.5 mr-1.5 h-4" />
            New Place
          </Button>
        </Link>
        <Link to="/myplaces">
          <Button>My Places</Button>
        </Link>
        <Button
          color="red"
          onClick={handleLogout}
          classes="font-medium text-lg"
        >
          Log Out
        </Button>
        <Link to="/auth">
          <Button>Log In</Button>
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
