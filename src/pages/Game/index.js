import style from "./style.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { ReviewPopUp } from "../../components/ReviewPopUp";
import { data } from "autoprefixer";
import plate from "../../images/plate-cut.png"

export function Game() {
  const [triggingReview, setTrigging] = useState(false);
  const { id } = useParams();
  const [game, setGame] = useState({});
  const [screenShotView, setScreen] = useState([]);
  const [reviewShow, setReview] = useState([]);
  const [ownerReview, setOwnerReview] = useState([]);
  const [allReviews, setAllReviews] = useState({});

  let hiddenDelete = false;

  useEffect(() => {
    async function fetchGame() {
      try {
        const response = await api.get(`/game/${id}`);
        setGame(response.data.game);
        setAllReviews(response.data.reviewsPop);
        //console.log("asasasasasasasasasadedede", response.data.reviewsPop, allReviews)
      } catch (err) {
        console.log(err);
      }
    }
    fetchGame();
  }, [id]);

  // useEffect(()=> {
  //   async function fetchReviews() {
  //     try {
  //       const response = await api.get(`/review/reviews`);
  //       console.log("All reviewssdsdsdsdsdsdsdsdsd", response.data);
  //       setAllReviews(response);

  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   fetchReviews();
  // }, [])

  useEffect(() => {
    // let avatarOwner=[];
    // let array2={};
    // let nameOwner=allReviews.forEach((curr)=>{
    //   console.log(curr)
    //   return ;
    // })

    let array = Object.keys(allReviews).map(function (key) {
      return allReviews[key];
    });

    let ownerReview = array.map((cur) => {
      return cur.owner.name;
    });

    //console.log("asdsdsadsadasdsadasdasdsad",array2,ownerReview, reviewShow)
    setScreen(game.screenShots);
    setReview(game.reviews);
    setOwnerReview(ownerReview);
    console.log(ownerReview);
  }, [game]);

  // useEffect(()=> {
  //     function URI() {

  //     }
  //     fetchPlayers();
  //   }, [])

  async function handleReview() {
    //console.log(triggingReview);
    if (!triggingReview) {
      setTrigging(true);
    }
  }

  return (
    <>
      <div className={style.pageContainer}>
        <div className={style.pageInfo}>
          <h1 className={style.pageTitle}>Game Plate</h1>
          <div className={style.gameHeader}>
            <div className={style.gamePlateLogo}>
              <img className={style.gameLogo} src={game.gameLogo} alt="game Logo"/>
              <img className={style.gamePlate} src={plate} alt="game plate"/>
            </div>
            <div>
              <h2 className={style.gameTitle}>{game.title}</h2>
              {/* <p style={{fontSize: "0.7em"}}>by {game.owner.name.split(' ')[0]} {game.owner.name.split(' ')[game.owner.name.split(' ').length - 1]}</p> */}
              <div>
                <a href={game.linkDeploy} target="_blank" rel="noreferrer"><button className={style.buttonAnima} type="button">Play</button></a>
                <a href={game.linkRepo} target="_blank" rel="noreferrer"><button className={style.buttonAnima} type="button">Code</button></a>
                <button className={style.buttonAnima} type="button" onClick={handleReview}>Review</button>
                <Link to={`/edit-game/${id}`}>
                  <button className={style.buttonAnima} type="edit">Edit Game</button>
                </Link>
              </div>
            </div>
          </div>
          <div className={style.gameInfo}>
            <div className={style.gameSShots}>
              {screenShotView ? (
                screenShotView.map((current) => {
                  return (
                    <>
                      <div>
                        <img className={style.gameSShotImg} src={current} alt="Screen Shot" />
                      </div>
                    </>
                  );
                })
              ) : (
                <></>
              )}
            </div>
            <div>
              <p>{game.description}</p>
            </div>
          </div>
          <div className={style.buttonsBotton}>
              <a href={game.linkDeploy} target="_blank" rel="noreferrer"><button className={style.buttonAnima} type="button">Play</button></a>
              <a href={game.linkRepo} target="_blank" rel="noreferrer"><button className={style.buttonAnima} type="button">Code</button></a>
              <button className={style.buttonAnima} type="button" onClick={handleReview}>Review</button>
              <Link to={`/edit-game/${id}`}>
                <button className={style.buttonAnima} type="edit">Edit Game</button>
              </Link>
          </div>
          <div className={style.reviewPopUp}>
            <ReviewPopUp
              trigger={triggingReview}
              setTrigging={setTrigging}
              id={id}
            />
          </div>
          <div>
            <h2 className={style.subTitles}>Reviews</h2>
            {reviewShow ? (
              reviewShow.map((current) => {
                return (
                  <>
                    <div className={style.reviewsRows}>
                      <div>
                        <label>
                          <strong>{ownerReview[reviewShow.indexOf(current)]}{" "}</strong>
                        </label>
                      </div>
                      <div className={style.rates}>
                        <label>Graphics: ⭐{current.graphics}</label>
                        <label>Sound Effects: ⭐{current.soundEffects}</label>
                        <label>Gameplay: ⭐{current.playability}</label>
                        <label>Fun: ⭐{current.fun}</label>
                        <label>Replayability: ⭐{current.replayability}</label>
                      </div>
                      <label>{current.userEvaluation}</label>
                      <div>
                        <Link to={`/edit-review/${current._id}`}>
                          <button className={style.buttonAnima} type="edit">Edit</button>
                        </Link>
                      </div>
                    </div>
                  </>
                );
              })
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
