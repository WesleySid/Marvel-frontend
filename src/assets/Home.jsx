import React from "react";
import comics from "./img/comics.jpg";
import char from "./img/char.jpg";
import { Link } from "react-router-dom";

const Home = () => {
  const handleMouseEnter = (event) => {
    event.target.style.filter = "saturate(150%)"; // Augmenter la saturation de 50% au survol
  };

  const handleMouseLeave = (event) => {
    event.target.style.filter = "none"; // Supprimer le filtre d'image au survol
  };

  return (
    <>
      <section className="main-page">
        <Link to="/characters">
          <div className="home-div">
            <img
              src={char}
              alt=""
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          </div>
        </Link>

        <Link to="/comics">
          <div className="home-div">
            <img
              src={comics}
              alt=""
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          </div>
        </Link>
      </section>
    </>
  );
};

export default Home;
