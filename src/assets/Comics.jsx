import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Comics = () => {
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredComic, setHoveredComic] = useState(null);

  useEffect(() => {
    const fetchComics = async () => {
      try {
        setIsLoading(true);
        const skip = (currentPage - 1) * 100; // 100 est la taille de la page
        const response = await axios.get(
          `http://localhost:3000/comics?skip=${skip}`
        );
        setComics(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchComics();
  }, [currentPage]);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleMouseEnter = (comicId) => {
    setHoveredComic(comicId);
  };

  const handleMouseLeave = () => {
    setHoveredComic(null);
  };

  return (
    <div>
      {isLoading ? (
        <p>Les héros sont en chemin ...</p>
      ) : (
        <>
          <div className="chars-container">
            {comics.map((comic) => (
              <Link to={`/comic/${comic._id}`} key={comic._id}>
                <div
                  className="char-card"
                  key={comic._id}
                  onMouseEnter={() => handleMouseEnter(comic._id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <img
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    alt={comic.title}
                  />
                  <p className="name-title">{comic.title}</p>
                  {hoveredComic === comic._id && (
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

export default Comics;
