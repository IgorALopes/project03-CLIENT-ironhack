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
  const [time, setTime] = useState(false);
  const [userBefore, setBefore] = useState({reviews:[], rates:{}, avatar:""});
  const [reviewsExibit, setRExibit] = useState([]);
  const [reviewsShow, setRevShow] = useState ([]);

  const myTimeout = setTimeout(refresh, 1000);
  
  useEffect(() => {
    async function fetchCards() {
      try {
        const response = await api.get("/game/games");
        setCards([...response.data]);
        console.log("gaygaygayag", cards);
        } catch (err) {
        console.log(err);
      }
    }
    fetchCards();
  }, []);

  useEffect(()=>{
    async function userBefore2(){
        try {
            const response = await api.get(`/user/profile`);
            setBefore(response.data);
            setRevShow(response.data.reviews);
            console.log(response.data);
            console.log("huhauhauhuhauauhauhahauauhauauhauauhauhau", userBefore);           
            } catch (err) {
            console.log(err);
        }
    }
    userBefore2();
},[])

useEffect(()=>{
  console.log(reviewsShow)
  let titleAndGameLogo=localizeGame();
  let indexReview=0;
  reviewsShow.map((currReview)=>{
      indexReview=reviewsShow.indexOf(currReview);
      currReview.gameLogo=titleAndGameLogo[indexReview].gameLogo;
      currReview.title=titleAndGameLogo[indexReview].title;
      console.log(currReview);
  })
  setRevShow(reviewsShow);
},[reviewsShow])

  function localizeGame() {
    let gameOfOwners=[];
    let inputerInfo={};
    reviewsShow.map((curr)=>{
        cards.map((curr2)=>{
          if(curr.game===curr2._id) {
            inputerInfo={
              title:curr2.title,
              gameLogo:curr2.gameLogo,
            }
            gameOfOwners.push(inputerInfo);
          }
        })
    })
    return gameOfOwners
  }

  function refresh() {
    if (!time) {setRevShow(reviewsShow)}
    setTime(true)
    
  }

  function handleLogOut() {
    localStorage.removeItem("loggedInUser");
    navigate("/");
    navigate(0);
  }

  function handleEditProfile() {
    navigate(`/edit-profile/${id}`);
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
                src={userBefore.avatar}
                className={style.userAvatar}
                alt="user avatar"
              />
              <h1>{loggedInUser.user.name}</h1>
            </div>
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
                
                <div>
                {reviewsShow.map((curr)=>{
                return (
                  <>
                    <div>
                      <img src={curr.gameLogo} width="40px" alt="Game Logo" />
                      <div>{curr.title}</div>
                      <div>{curr.userEvaluation}</div>
                      <div>Gráficos: {curr.rates.graphics}</div>
                      <div>Gameplay: {curr.rates.playability}</div>
                      <div>Sound Effects: {curr.rates.soundEffects}</div>
                      <div>Fun Factor: {curr.rates.fun}</div>
                      <div>Replayability: {curr.rates.replayability}</div>
                      <Link to={`/edit-review/${curr._id}`}>
                        <button type="button">Edit</button>
                      </Link>
                    </div>
                  </>
                );
              })}
                </div>
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
