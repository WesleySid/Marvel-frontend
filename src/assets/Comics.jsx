import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Comics = () => {
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredComic, setHoveredComic] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchComics = async () => {
      try {
        setIsLoading(true);
        const skip = (currentPage - 1) * 100;
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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredComics = comics.filter((comic) =>
    (comic.title ?? "").toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <p>Les comics sont en chemin ...</p>
      ) : (
        <>
          <main>
            <input
              type="text"
              placeholder="Rechercher par titre..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <div className="chars-container">
              {filteredComics.map((comic) => (
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
  );
};

export default Comics;
