import { Link } from "react-router-dom";
import logo from "./img/logo.jpg";

const Header = () => {
  return (
    <div className="header-container">
      <Link to="/characters">
        <button className="head-button">PERSONNAGES</button>{" "}
      </Link>

      <Link to="/">
        <img className="logo" src={logo} alt="" />
      </Link>
      <div>
        <Link to="/comics">
          <button className="head-button">COMICS</button>{" "}
        </Link>
        <button className="head-button">MES FAVORIS</button>
      </div>
    </div>
  );
};
export default Header;
