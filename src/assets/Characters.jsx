import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BG from "./img/spiderman7.jpg";

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredCharacter, setHoveredCharacter] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setIsLoading(true);
        const skip = (currentPage - 1) * 100; // 100 c'est la taille de la page
        const response = await axios.get(
          `http://localhost:3000/characters?skip=${skip}`
        );
        setCharacters(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchCharacters();
  }, [currentPage]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCharacters = characters.filter(
    (character) =>
      (character.name ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (character.title ?? "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleMouseEnter = (characterId) => {
    setHoveredCharacter(characterId);
  };

  const handleMouseLeave = () => {
    setHoveredCharacter(null);
  };

  return (
    <section className="accueil" style={{ backgroundImage: `url(${BG})` }}>
      <div>
        {isLoading ? (
          <p>Les héros sont en chemin ...</p>
        ) : (
          <>
            <main>
              <input
                type="text"
                placeholder="Rechercher par nom ..."
                value={searchTerm}
                onChange={handleSearch}
              />
              <div className="chars-container">
                {filteredCharacters.map((character) => (
                  <Link to={`/character/${character._id}`} key={character._id}>
                    <div
                      className="char-card"
                      key={character._id}
                      onMouseEnter={() => handleMouseEnter(character._id)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <img
                        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                        alt={character.name}
                      />
                      <p className="name-title">{character.name}</p>
                      {hoveredCharacter === character._id && (
                        <p>Cliquez pour en savoir plus</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </main>
            <div className="page-button">
              <button
                className="pages"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                Page précédente
              </button>
              <button className="pages" onClick={handleNextPage}>
                Page suivante
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Characters;
