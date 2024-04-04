import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredCharacter, setHoveredCharacter] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setIsLoading(true);
        const skip = (currentPage - 1) * 100; // 100 est la taille de la page
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
    <div>
      {isLoading ? (
        <p>Les héros sont en chemin ...</p>
      ) : (
        <>
          <div className="chars-container">
            {characters.map((character) => (
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
                  <p>Name: {character.name}</p>
                  {hoveredCharacter === character._id && (
                    <p>Cliquez pour en savoir plus</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
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
  );
};

export default Characters;
