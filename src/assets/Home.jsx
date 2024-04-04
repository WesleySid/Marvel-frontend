import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; //
import noImg from "./img/noIMG.jpg";
import BG from "./img/avengers-bg.jpg";

const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/");
        console.log(response.data);
        setData(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  // Fonction pour remplacer l'URL de l'image si elle est égale à "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
  const replaceImageUrl = (imageUrl) => {
    if (
      imageUrl ===
      "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
    ) {
      return noImg;
    }
    return imageUrl;
  };

  return isLoading ? (
    <div className="loading">
      <span className="waiting">Vos Héros préférés sont en chemin</span>
    </div>
  ) : (
    <>
      <main>
        <section className="accueil" style={{ backgroundImage: `url(${BG})` }}>
          <div className="profile-container">
            {!isLoading &&
              data.map((result, index) => (
                <Link to={`/character/${result._id}`} key={result._id}>
                  <div className="profile" key={index}>
                    <div className="profile-picture">
                      <img
                        src={replaceImageUrl(
                          `${result.thumbnail.path}.${result.thumbnail.extension}`
                        )}
                        alt={result.name}
                      />
                      <p className="profile-name">{result.name}</p>
                      <p className="profile-desc">{result.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
