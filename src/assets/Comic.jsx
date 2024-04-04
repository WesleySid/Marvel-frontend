import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Comic = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [comic, setComic] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(id);
        const response = await axios.get(`http://localhost:3000/comic/${id}`);
        console.log(response.data);
        setComic(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <div>
        <p>Chargement en cours...</p>
      </div>
    );
  }

  if (!comic) {
    return <p>Aucun personnage trouvé avec l'ID {id}</p>;
  }

  return (
    <>
      <div className="comic-container">
        <div className="comic-picture">
          <h1>{comic.title}</h1>
          <img
            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
            alt={comic.title}
          />
        </div>
        <div className="comic-details">
          <div className="comic-desc">
            <p className="p-desc">{comic.description}</p>
          </div>
          <button className="fav-comic">Ajouter à mes favoris</button>
        </div>
      </div>
    </>
  );
};

export default Comic;
