import { useContext, useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import axios from "axios";

import style from "./style.module.css";
import { Card } from "../../components/GameCard";
import { api } from "../../api/api";

import { ReviewsShow } from "../../components/ReviewsShow";

export function Profile() {
  const { loggedInUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [cards, setCards] = useState([]);
  const [user1, setUser1] = useState({});
  const [userBefore, setBefore] = useState({});
  const [reviewsExibit, setRExibit] = useState([]);

  useEffect(() => {
    async function fetchCards() {
      try {
        const response = await api.get("/game/games");

        setCards([...response.data]);
        console.log(cards);
      } catch (err) {
        console.log(err);
      }
    }
    fetchCards();
  }, []);

  function handleLogOut() {
    localStorage.removeItem("loggedInUser");
    navigate("/");
    navigate(0);
  }

  function handleEditProfile() {
    navigate("/");
  }

  function handleCreateGame() {
    navigate("/profile/create-game");
  }

  return (
    <>
      <div className={style.pageContainer}>
        <div className={style.pageInfo}>
          <h1 className={style.pageTitle}>Taster Profile</h1>
          <div className={style.userPersonalInfo}> 
            <div className={style.userAvatarName}>
              <img
                src={user1.avatar}
                className={style.userAvatar}
                alt="user avatar"
              />
              <h1>{loggedInUser.user.name}</h1>
            </div>
            <p>Birth date: {loggedInUser.user.birthDate}</p>
            <p>Email: {loggedInUser.user.email}</p>
            <button className={style.buttons} onClick={handleEditProfile}>
              Edit
            </button>
          </div>
          <div className={style.gamesServed}>
            <h2 className={style.subTitles}>Games you served</h2>
            <button className={style.buttons} onClick={handleCreateGame}>
              Serve a new Game
            </button>
            <div className={style.cardsContainer}>
              {cards
                .slice(0)
                .reverse()
                .map((currentCard) => {
                  if (loggedInUser.user._id === currentCard.owner._id) {

                    return (
                      <>
                        <Link to={`/${currentCard._id}`}>
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
            <div className={style.cardsContainer}>
              <ReviewsShow />
            </div>
          </div>
          <button className={style.buttons} onClick={handleLogOut}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
