import React from "react";
import { useEffect } from "react";

import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const MainMenu = () => {
  const location = useLocation();

  useEffect(() => {
    return () => {};
  }, [location]);

  return (
    <div className=" container div-main-menu">
      <div className="div-main-menu-subdivs">
        <Link to="/game">Play locally</Link>
      </div>
      <div className="div-main-menu-subdivs">
        <Link to="/online-menu">Play online</Link>
      </div>
      {/*
      <div className="div-main-menu-subdivs">
        <Link to="/settings">Settings</Link>
      </div>
      */}
    </div>
  );
};

export default MainMenu;
