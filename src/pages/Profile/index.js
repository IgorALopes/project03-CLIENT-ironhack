import { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import axios from "axios";
import style from "./style.module.css"
import { Card } from "../../components/GameCard";

export function Profile() {

  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchCards() {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/1.0/game/games"
        );
        
        setCards([...response.data]);
      } catch (err) {
        console.log(err);
      }
    }
    fetchCards();
  }, []);


  const navigate = useNavigate();

  const { loggedInUser } = useContext(AuthContext);

  function handleLogOut() {
    localStorage.removeItem("loggedInUser");
    navigate("/");
    navigate(0)
  }

  function handleEditProfile() {
    navigate("/");
  }

  function handleCreateGame() {
    navigate("/profile/create-game");
  }

  return (
    <>
      <div className={style.userProfilePage}>
        <div className={style.userProfile}>
          <h1 className={style.profileTitle}>Taster Profile</h1>
          <div className={style.userPersonalInfo}>
            <div className={style.userAvatarName}>
              <img src={loggedInUser.user.avatar} className={style.userAvatar} alt="user avatar"/>
              <h1>{loggedInUser.user.name}</h1>
            </div>
            <p>Birth date: {loggedInUser.user.birthDate}</p>
            <p>Email: {loggedInUser.user.email}</p>
            <button className={style.buttons} onClick={handleEditProfile}>Edit</button>
          </div>
          <div className={style.gamesServed}>
            <h2 className={style.subTitles}>Games you served</h2>
            <button className={style.buttons} onClick={handleCreateGame}>Serve a new Game</button>
            <div className={style.cardsContainer}>
              {cards
                .slice(0)
                .reverse()
                .map((currentCard) => {
                  if (loggedInUser.user._id === currentCard.owner._id) {
                  return (
                    <>
                      <Link to={`/game/${currentCard._id}`}>
                        <Card
                          title={currentCard.title}
                          gameLogo={currentCard.gameLogo}
                          owner={currentCard.owner.name}
                        />
                      </Link>
                    </>
                  );
                  }
                })}
            </div>
          </div>
          <div className={style.reviewsMade}>
            <h2 className={style.subTitles}>Reviews you made</h2>
          </div>
          <button className={style.buttons} onClick={handleLogOut}>Logout</button>
        </div>
      </div>
    </>
  );
}
