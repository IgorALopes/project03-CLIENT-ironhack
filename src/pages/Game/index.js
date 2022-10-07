import style from "./style.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { ReviewPopUp } from "../../components/ReviewPopUp";
import { data } from "autoprefixer";
import Carousel from 'react-bootstrap/Carousel';

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
      <div>
        <h1 className={style.sSV}>Screenshots</h1>
        <div>
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="holder.js/800x400?text=First slide&bg=373940"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="holder.js/800x400?text=Second slide&bg=282c34"
                alt="Second slide"
              />

              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="holder.js/800x400?text=Third slide&bg=20232a"
                alt="Third slide"
              />

              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
        <div className={style.shots}>
          {screenShotView ? (
            screenShotView.map((current) => {
              return (
                <>
                  <div>
                    <p></p>
                    <img src={current} width="80px" alt="img"></img>
                  </div>
                </>
              );
            })
          ) : (
            <></>
          )}
        </div>
        <div>
          <img src={game.gameLogo} width="40px" alt="img"></img>
          <h1>{game.title}</h1>
          <button type="button">Play</button>
          <button type="button" onClick={handleReview}>
            Review
          </button>
          <button type="button" hidden={hiddenDelete}>
            Delete
          </button>
        </div>
        <div>
          <h2>{game.description}</h2>
        </div>
      </div>
      <div className={style.review}>
        <ReviewPopUp
          trigger={triggingReview}
          setTrigging={setTrigging}
          id={id}
        />
      </div>
      <div>
        {reviewShow ? (
          reviewShow.map((current) => {
            return (
              <>
                <div>
                  <div>
                    <label>
                      Owner: {ownerReview[reviewShow.indexOf(current)]}{" "}
                    </label>
                  </div>
                  <div>
                    <label>Graphics: {current.rates.graphics}</label>
                    <label>Sound Effects: {current.rates.soundEffects}</label>
                    <label>Gameplay: {current.rates.playability}</label>
                    <label>Fun: {current.rates.fun}</label>
                    <label>Replayability: {current.rates.replayability}</label>
                  </div>
                  <label>{current.userEvaluation}</label>
                </div>
                <div>
                  <button type="button">🍪</button>
                  <Link to={`/edit-review/${current._id}`}>
                    <button type="edit">🤢 Edit</button>
                  </Link>
                </div>
              </>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
