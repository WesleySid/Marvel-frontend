import React, { useState } from "react";
import { Link } from "react-router-dom";

const SidebarMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="sidebar">
      <button className="menu-button" onClick={toggleMenu}>
        Menu
      </button>
      {isMenuOpen && (
        <div className="menu">
          <ul>
            <Link to="/characters">
              <li>Personnages</li>
            </Link>
            <Link to="/comics">
              <li>Comics</li>
            </Link>
            <li>Favoris</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SidebarMenu;
