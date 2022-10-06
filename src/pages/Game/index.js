import style from "./style.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {api} from "../../api/api";
import { ReviewPopUp } from "../../components/ReviewPopUp";


export function Game() {
  
  const [triggingReview, setTrigging] = useState(false);
  const { id } = useParams();
  const [game, setGame] = useState({});
  const [screenShotView, setScreen] = useState([]);
  const [reviewShow, setReview] = useState([]);
  const [users, setUsers] = useState([]);
  const [usersReviewId, setURI] = useState([]);
  let hiddenDelete=true;

  useEffect(() => {
    async function fetchGame() {
      try {
        const response = await api.get(`/game/${id}`);
        setGame(response.data);
        //console.log(game);
      } catch (err) {
        console.log(err);
      }
    }
    fetchGame();
  }, [id]);

  useEffect(()=> {
    async function fetchPlayers() {
      try {
        const response = await api.get(`/review/${id}`);
        setUsers(response.data);

        console.log("gaygayagygaaygagygayg", response.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchPlayers();
  }, [])

  useEffect(() => {
        //console.log(game)
        setScreen(game.screenShots);
        setReview(game.reviews);
        console.log(game.reviews);
        }, [game]);

// useEffect(()=> {
//     function URI() {
      
//     }
//     fetchPlayers();
//   }, [])




  async function handleReview () {
    console.log(triggingReview);
    if (!triggingReview) {setTrigging(true)} 
  }

return (<>
    <div>
      <div>
        <div>
          <h1 className={style.sSV}>Screenshots</h1>
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
            <button type="button" onClick={handleReview}>Review</button>
            <button type="button" hidden={hiddenDelete}>Delete</button>
        </div>
        <div>
            <h2>{game.description}</h2>
          </div>
        </div>
        <div className={style.review}>
        <ReviewPopUp trigger={triggingReview} setTrigging={setTrigging} id={id}/>
        </div>
        <div>
        {reviewShow ? (
              reviewShow.map((current) => {
                return (
                  <>
                    <div>
                      <div>
                        {/* <label>Owner: {users.filter((curr)=>{if(curr.reviews===current._id){return {curr}}})}</label> */}
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
  </>);
}
