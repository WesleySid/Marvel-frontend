import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Character = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [char, setChar] = useState(null);
  const [comic, setComic] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(id);
        const response = await axios.get(
          `http://localhost:3000/character/${id}`
        );
        console.log(response.data);
        setChar(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(id);
        const response = await axios.get(`http://localhost:3000/comics/${id}`);
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

  if (!char) {
    return <p>Aucun personnage trouvé avec l'ID {id}</p>;
  }

  return (
    <>
      <div className="char-container">
        <h1>{char.name}</h1>
        <img
          src={`${char.thumbnail.path}.${char.thumbnail.extension}`}
          alt={char.name}
        />
        <div className="char-details">
          <div className="char-desc">
            <p className="p-desc">{char.description}</p>
          </div>
          <button className="fav-comic">Ajouter à mes favoris</button>

          <div className="char-comics">
            {comic.comics &&
              comic.comics.map((comic, index) => (
                <div className="comic-list" key={comic._id}>
                  <img
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    alt={comic.title}
                  />
                  <p>{comic.title}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Character;
